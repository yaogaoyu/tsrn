var $gulp = require('gulp'),
    $lint = require('gulp-tslint'),
    $tsc = require('gulp-typescript'),
    $smap = require('gulp-sourcemaps'),
    $insert = require('gulp-insert'),
    $replace = require('gulp-replace'),
    $uglify = require('gulp-uglify'),
    $del = require('del'),
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
    _: 'var/build',
    js: 'app.js'
};

/**
 * 清除编译目录下的所有文件。
 */
$gulp.task('clear', function () {
    $del(dst._ + '/*');
});

/**
 * typescript代码检查。
 */
$gulp.task('ts:lint', function() {
    return $gulp.src(src.ts)
        .pipe($lint())
        .pipe($lint.report('prose'));
});

/**
 * typescript代码编译。
 */
$gulp.task('ts:compile', function () {
    var ts = $gulp.src(src.js)
        .pipe($tsc($tsc.createProject('tsconfig.json', {
            outFile: dst.js,
            typescript: require('typescript')
        })));
    return ts.js
        // .pipe($insert.prepend("import ReactNative from 'react-native';\n"))              // ES6
        // .pipe($insert.prepend("import * as React from 'react';\n"))                      // ES6
        // .pipe($insert.append('export default Application;'))                             // ES6
        // .pipe($replace(new RegExp(replace.export.regex), replace.export.replacement))    // ES6
        .pipe($insert.prepend("var ReactNative = require('react-native');\n"))              // ES3
        .pipe($insert.prepend("var React = require('react');\n"))                           // ES3
        .pipe($insert.append("module.exports = {'Application': Application};"))             // ES3
        .pipe($replace(new RegExp(replace.import.regex, "g"), replace.import.replacement))
        .pipe($replace(/\$\{VERSION\}/, pkg.version))
        .pipe($gulp.dest(dst._));
});

/**
 * 打包 - 调试模式。
 */
$gulp.task('ts:debug', ['ts:lint', 'ts:compile']);

/**
 * 打包 - 生产模式。
 * uglify尚不支持ES6代码进行压缩。
 */
$gulp.task('ts', ['ts:lint', 'ts:compile'], function (cb) {
    return $gulp.src("var/build/app.js")
        .pipe($smap.init({
            loadMaps: true
        }))
        .pipe($uglify())
        .pipe($smap.write('.'))
        .pipe($gulp.dest(dst._));
    // $pump([
    //     $gulp.src('var/build/app.js'),
    //     $uglify(),
    //     $gulp.dest(dst._)
    // ], cb);

});

/**
 * 开发调试模式，可监控代码改动自动进行调试模式打包。
 */
$gulp.task('watch', function() {
    $gulp.watch(src.ts, ['ts:debug']);
});
