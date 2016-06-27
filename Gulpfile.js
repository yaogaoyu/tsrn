var $gulp = require('gulp'),
    $lint = require('gulp-tslint'),
    $tsc = require('gulp-typescript'),
    $del = require('del');

var src = {
    ts: 'lib/**/*.{ts,tsx}'
};

var dst = {
    _: 'var/build'

};

$gulp.task('clear', function () {
    $del(dst._ + '/*');
});

$gulp.task('ts:lint', function() {
    return $gulp.src(src.ts)
        .pipe($lint())
        .pipe($lint.report('prose'));
});

var tsProject = $tsc.createProject('tsconfig.json', {
    outDir: dst._,
    rootDir: "lib"
});
$gulp.task('ts:compile', ['ts:lint'], function() {
    return $gulp.src(src.ts)
        .pipe($tsc(tsProject))
        .pipe($gulp.dest(dst._));
});

// Auto compile
$gulp.task('watch', function() {
    $gulp.watch(src.ts, ['ts:compile']);
});


// $gulp.task('js:compile', function () {
//     var ts = $gulp.src('lib/index.ios.tsx')
//         .pipe($tsc($tsc.createProject('tsconfig.json', {
//             outFile: 'index.ios.js',
//             typescript: require('typescript')
//         })));
//     return ts.js
//         .pipe($gulp.dest($dst._));
// });
