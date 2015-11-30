'use strict';

const path = require('path');

const gulp = require('gulp');
const ts = require('gulp-typescript');
const babel = require('gulp-babel');
const tslint = require('gulp-tslint');
const del = require('del');
// gulp-sourcemaps

const tsConfig = require('./tsConfig.json');
const tsFilesGlob = tsConfig.filesGlob || tsConfig.files || 'lib/**/*.ts';

gulp.task('default', ['build']);

gulp.task('watch', ['build'], () =>
    gulp.watch('lib/*.ts', ['build'])
);

gulp.task('build', ['compile-ts-babel']);

gulp.task('compile-ts-babel', ['clean'], () => {
    // create a project first, for incremental compilation
    const tsProject = ts.createProject(path.join(__dirname, 'tsconfig.json'));
    const babelConfig = require('./package.json').babel;

    return gulp.src(tsFilesGlob, { base: './lib' })  // base served as rootDir in tsconfig.json
        .pipe(ts(tsProject))
        .pipe(babel(babelConfig))
        .pipe(gulp.dest(tsConfig.compilerOptions.outDir));
});

gulp.task('clean', () =>
    del(tsConfig.compilerOptions.outDir)
);

gulp.task('tslint', () =>
    gulp.src(tsFilesGlob)
        .pipe(tslint())
        .pipe(tslint.report('verbose'))
);
