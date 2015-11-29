'use strict';

const path = require('path');

const gulp = require('gulp');
const ts = require('gulp-typescript');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
// gulp-sourcemaps


gulp.task('default', ['build', 'gen-ts-refs']);

gulp.task('build', ['compile-ts-babel']);

gulp.task('compile-ts-babel', () => {
    // create a project first, for incremental compilation
    const tsProject = ts.createProject(path.join(__dirname, 'tsconfig.json'));
    const babelConfig = require('./babelrc');

    return gulp.src('lib/**/*.ts', { base: './' })  // base served as rootDir in tsconfig.json
        .pipe(ts(tsProject))
        .pipe(babel(babelConfig))
        .pipe(rename({ dirname: 'release', extname: '.js' }))
        .pipe(gulp.dest('.'));
});

gulp.task('watch', ['ts-babel'], () => {
    gulp.watch('lib/*.ts', ['ts-babel']);
});

gulp.task('gen-ts-refs', () => {
    //
});

gulp.task('tslint', () => {
    //
});

// this is an opt-in task.
// since eslint only validates flow, and any syntax similarity between flow & typescript is pure coincidence.
// so there might be some unnecessary error reports.
gulp.task('eslint', () => {
    //
});
