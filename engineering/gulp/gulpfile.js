var gulp = require('gulp'),
    less = require('gulp-less'),                   //less 转 css
    csso = require('gulp-csso'),                   //css压缩
    concat = require('gulp-concat'),               //合并文件
    uglify = require('gulp-uglify'),               //js 压缩
    jshint = require('gulp-jshint'),               //js 检查
    clean = require('gulp-clean'),                 //清除文件
    imagemin = require('gulp-imagemin'),           //图片压缩
    rev = require('gulp-rev'),                     //添加版本号
    revReplace = require('gulp-rev-replace'),      //版本号替换
    useref = require('gulp-useref'),               //解析html资源定位
    gulpif = require('gulp-if'),                   //if语句
    connect = require('gulp-connect');             //创建web服务器

/**
 * 获取到src下所有以.jpg或.png结尾的图片，将其压缩后输出到dist目录下。 
 */    

gulp.task('dist:img', () => {
    gulp.src(['./src/**/*.jpg', './src/**/*.png'])
    .pipe(imagemin())
    .pipe(gulp.dest('dist/'))
})
/**
 * 先清除已存在的css，然后将src下以.less结尾的文件
 * 通过less()转为css文件，
 * 再通过csso()以及concat()实现对css的压缩合并。  
 */    
gulp.task('dist:css', () => {
    gulp.src('dist/css/*.css').pipe(clean());
    return gulp.src('./src/less/*.less')
    .pipe(less())
    .pipe(csso())
    .pipe(concat('public.css'))
    .pipe(gulp.dest('dist/css/'));
});
/**
 * js压缩合并的过程大同小异，
 * 增加了一个jshint()代码审查的过程，
 * 它会将不符合规范的错误代码输出到控制台。
 */
gulp.task('dist:js', () => {
    gulp.src('dist/js/*.js').pipe(clean());
    return gulp.src('./src/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(uglify())
    .pipe(concat('public.js'))
    .pipe(gulp.dest('dist/js/'))
});

/**
 * 在开发过程中，因为html不能直接引入.less文件，因此还需要生成开发环境的.css。
 */
gulp.task('src:css', () => {
    gulp.src('src/css/*.css').pipe(clean());
    return gulp.src('./src/less/*.less')
    .pipe(less())
    .pipe(gulp.dest('src/css/'));
});

/**
 * 为了防止浏览器对文件进行缓存，需要对文件添加版本号，保证每次获取到的都是最新的代码。
 */

gulp.task('revision', ['dist:css', 'dist:js'], () => {
    return gulp.src(["dist/css/*.css", "dist/js/*.js"])
    .pipe(rev())
    .pipe(gulpif('*.css', gulp.dest('dist/css'), gulp.dest('dist/js')))
    .pipe(rev.manifest())
    .pipe(gulp.dest('dist'))
})

gulp.task('build', ['dist:img'], () => {
    var manifest = gulp.src('dist/rev-manifest.json');
    return gulp.src('src/index.html')
    .pipe(revReplace({
        manifest: manifest
    }))
    .pipe(useref())
    .pipe(gulp.dest('dist/'))
})

// 使用connet.server()来创建一个本地服务器，
// 利用gulp.watch()来对src下的文件进行监测，
// 如果发生变化，则执行编译less为css和刷新页面的任务。

gulp.task('connect', () => {
    connect.server({
        root: 'src',
        livereload: true,
        port: 8888
    })
})

gulp.task('reload', () => {
    gulp.src('src/*.html')
    .pipe(connect.reload())
})

gulp.task('watch', () => {
    gulp.watch('src/**/*', ['src:css', 'reload'])
})
