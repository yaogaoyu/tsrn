var gulp = require('gulp');
var $tsc = require('gulp-typescript');

var tsProject = $tsc.createProject('tsconfig.json', {
    outDir: "var/build",
    rootDir: "lib"
});
var appDir = 'var/build';
var tsFiles = 'lib/**/*.{ts,tsx}';

gulp.task('js:compile', function () {
    var ts = gulp.src('lib/index.ios.tsx')
        .pipe($tsc($tsc.createProject('tsconfig.json', {
            outFile: 'index.ios.js',
            typescript: require('typescript')
        })));
    return ts.js
        .pipe(gulp.dest(appDir));
});

gulp.task('ts:compile', function() {
  return gulp.src(tsFiles)
    .pipe($tsc(tsProject))
    .pipe(gulp.dest(appDir));
});

// Auto compile
gulp.task('watch', function() {
    $gulp.watch(tsFiles, ['ts:compile']);
});