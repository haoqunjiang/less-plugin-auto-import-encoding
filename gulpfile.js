'use strict';

const path = require('path');

const gulp = require('gulp');
const ts = require('gulp-typescript');
const babel = require('gulp-babel');
const del = require('del');
// gulp-sourcemaps

const tsOutputPath = './release';

gulp.task('default', ['build']);

gulp.task('watch', ['ts-babel'], () => {
    gulp.watch('lib/*.ts', ['build']);
});

gulp.task('build', ['clean', 'compile-ts-babel', 'gen-ts-refs']);


gulp.task('clean', (cb) => {
    del(tsOutputPath, cb);
});

gulp.task('compile-ts-babel', () => {
    // create a project first, for incremental compilation
    const tsProject = ts.createProject(path.join(__dirname, 'tsconfig.json'));
    const babelConfig = require('./package.json').babel;

    return gulp.src('lib/**/*.ts', { base: './lib' })  // base served as rootDir in tsconfig.json
        .pipe(ts(tsProject))
        .pipe(babel(babelConfig))
        .pipe(gulp.dest(tsOutputPath));
});

gulp.task('gen-ts-refs', () => {
    return;
});

gulp.task('tslint', () => {
    return;
});

// this is an opt-in task.
// since eslint only validates flow, and any syntax similarity between flow & typescript is pure coincidence.
// so there might be some unnecessary error reports.
gulp.task('eslint', () => {
    return;
});
