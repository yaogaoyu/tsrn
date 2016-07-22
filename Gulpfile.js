var $gulp = require('gulp'),
    $lint = require('gulp-tslint'),
    $tsc = require('gulp-typescript'),
    $smap = require('gulp-sourcemaps'),
    $insert = require('gulp-insert'),
    $replace = require('gulp-replace'),
    $uglify = require('gulp-uglify'),
    $del = require('del'),
    $shell = require('gulp-shell'),
    pkg = require('./package.json');

var src = {
    ts: 'lib/**/*.{ts,tsx}',
    js: 'lib/Application.tsx',
    img: ['share/image/*.{png,jpg}'],
    ios: {
        appDelegate: 'ios/' + pkg.name + '/AppDelegate.m',
    },
    android: {
        build: 'android/app/build.gradle',
    }

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

var _ = 'var/build';
var dst = {
    _: _,
    ios: 'ios/bundle',
    android: ['android/app/src/main/assets', 'android/app/src/main/res/drawable-*'],
    js: 'app.js',
    img: 'image'
};

var resetIos = function(){
    var onlineReg = /^\/\/(  jsCodeLocation = \[NSURL URLWithString:@.+;)$/m;
    var offlineReg = /^  (jsCodeLocation = \[\[NSBundle mainBundle.+;)$/m;
    var resourceURL = /(URLForResource:@)"app"/;
    // replace AppDelegate.m内的
    return $gulp.src(src.ios.appDelegate)
        .pipe($shell(['cp ' + src.ios.appDelegate + ' ' + src.ios.appDelegate + '.ori']))
        .pipe($replace(onlineReg, '$1'))
        .pipe($replace(offlineReg, '//  $1'))
        .pipe($replace(resourceURL, '$1"main"'))
        .pipe($gulp.dest('ios/' + pkg.name));
};

/**
 * 清除编译目录下的所有文件。
 */
$gulp.task('clear', function () {
    $del(dst._ + '/*');
    $del(dst.ios);
    $del(dst.android);
    $del(dst.img);
    resetIos();
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
 * 打包JS代码 - 生产模式。
 * uglify尚不支持ES6代码进行压缩。
 */
$gulp.task('bundle:js', ['ts:lint', 'ts:compile'], function (cb) {
    return $gulp.src("var/build/app.js")
        .pipe($smap.init({
            loadMaps: true
        }))
        .pipe($uglify())
        .pipe($smap.write('.'))
        .pipe($gulp.dest(dst._));
});

/**
 * 将image资源放入预打包环境 - 生产模式
 */
$gulp.task('bundle:img', function () {
    return $gulp.src(src.img)
        .pipe($gulp.dest(dst.img));
});

/**
 * 预构建APP所需资源
 */
$gulp.task('bundle', ['bundle:js']);

/**
 * 预构建调试模式下APP所需资源
 */
$gulp.task('bundle:debug', ['ts:debug', 'bundle:img']);

/**
 * 建立图片资源软链接供React-native创建APP内资源目录
 */
var iosImgLinkCmd = 'ln -s share/image ' + dst.img;
/**
 * IOS建立APP资源目录指令
 */
var iosMkdirCmd = 'mkdir -p ios/bundle';
/**
 * IOS打包APP所需资源指令
 */
var iosBundleCmd = 'react-native bundle --entry-file index.ios.js --bundle-output ios/bundle/app.jsbundle --platform ios --assets-dest ios/bundle --dev false';
/**
 * IOS打包 - 生产模式
 */
$gulp.task('bundle:ios', ['bundle'], $shell.task([iosImgLinkCmd, iosMkdirCmd, iosBundleCmd]));

/**
 * Android建立APP资源目录指令
 */
var androidMkdirCmd = 'mkdir android/app/src/main/assets';
/**
 * Android打包APP所需资源指令
 */
var androidBundleCmd = 'react-native bundle --entry-file index.android.js --bundle-output android/app/src/main/assets/index.android.bundle --platform android --assets-dest android/app/src/main/res --dev false';
/**
 * Android打包 - 生产模式
 */
$gulp.task('bundle:android', ['bundle'], $shell.task([androidMkdirCmd, androidBundleCmd]));

/**
 * 打包成IOS APP。
 */
$gulp.task('package:ios', ['bundle:ios'], function() {
    var onlineReg = /^(  jsCodeLocation = \[NSURL URLWithString:@.+;)$/m;
    var offlineReg = /^\/\/\s+(jsCodeLocation = \[\[NSBundle mainBundle.+;)$/m;
    var resourceURL = /(URLForResource:@)"main"/;
    // replace AppDelegate.m内的
    return $gulp.src(src.ios.appDelegate)
        .pipe($shell(['cp ' + src.ios.appDelegate + ' ' + src.ios.appDelegate + '.ori']))
        .pipe($replace(onlineReg, '//$1'))
        .pipe($replace(offlineReg, '  $1'))
        .pipe($replace(resourceURL, '$1"app"'))
        .pipe($gulp.dest('ios/' + pkg.name));
});

/**
 * 打包成IOS APP。
 */
$gulp.task('package:android', ['bundle:android'], function() {
    var proguardReg = /^(def enableProguardInReleaseBuilds = ).*$/m;
    return $gulp.src(src.android.build)
        .pipe($replace(proguardReg, '$1true'))
        .pipe($gulp.dest('android/app'));
});

/**
 * 开发调试模式，可监控代码改动自动进行调试模式打包。
 */
$gulp.task('watch:ios', function() {
    $gulp.watch([src.ts, src.js], ['bundle:debug']);
    $gulp.watch(src.img, ['bundle:debug']);
});