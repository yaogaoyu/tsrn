var $gulp = require('gulp'),
    $lint = require('gulp-tslint'),
    $tsc = require('gulp-typescript'),
    $smap = require('gulp-sourcemaps'),
    $insert = require('gulp-insert'),
    $replace = require('gulp-replace'),
    $uglify = require('gulp-uglify'),
    $del = require('del'),
    $source = require('vinyl-source-stream'),
    $buffer = require('vinyl-buffer'),
    pkg = require('./package.json');

var src = {
    ts: 'lib/**/*.{ts,tsx}',
    js: 'lib/Application.tsx'
};

var replace = {
    export: {
        regex: "class Application",
        replacement: "export class Application"
    },
    import: {
        regex: ".*__React(?:Native)?.*\n",
        replacement: ""
    }
};

var dst = {
    _: 'var/build'
};
dst.js = dst._ + "/" + pkg.main + ".js";

$gulp.task('clear', function () {
    $del(dst._ + '/*');
});

$gulp.task('ts:lint', function() {
    return $gulp.src(src.ts)
        .pipe($lint())
        .pipe($lint.report('prose'));
});

// var tsProject = $tsc.createProject('tsconfig.json', {
//     outDir: dst._,
//     rootDir: "lib"
// });
// $gulp.task('ts:compile', ['ts:lint'], function() {
//     return $gulp.src(src.ts)
//         .pipe($tsc(tsProject))
//         .pipe($gulp.dest(dst._));
// });

$gulp.task('ts:compile', function () {
    var ts = $gulp.src(src.js)
        .pipe($smap.init())
        .pipe($tsc($tsc.createProject('tsconfig.json', {
            outFile: pkg.main + '.js',
            typescript: require('typescript')
        })));
    return ts.js
        .pipe($insert.prepend("import ReactNative from 'react-native';\n"))
        .pipe($insert.prepend("import * as React from 'react';\n"))
        .pipe($insert.append('export default Application;'))
        .pipe($replace(new RegExp(replace.export.regex), replace.export.replacement))
        .pipe($replace(new RegExp(replace.import.regex, "g"), replace.import.replacement))
        .pipe($replace(/\$\{VERSION\}/, pkg.version))
        .pipe($smap.write('.'))
        .pipe($gulp.dest(dst._));
});

$gulp.task('ts:debug', ['ts:lint', 'ts:compile']);

// $gulp.task('ts', ['ts:lint', 'ts:compile'], function () {
//     return $gulp.src("var/build/app.js")
//         .pipe($source("app.min.js"))
//         .pipe($buffer())
//         .pipe($smap.init({
//             loadMaps: true
//         }))
//         .pipe($uglify())
//         .pipe($smap.write('.'))
//         .pipe($gulp.dest(dst._));
// });

// Auto compile
$gulp.task('watch', function() {
    $gulp.watch(src.ts, ['ts:compile']);
});
