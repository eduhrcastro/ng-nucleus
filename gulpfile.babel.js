'use strict'

import gulp from 'gulp'
import babel from 'gulp-babel'
import runSequence from 'gulp-run-sequence'
import rename from 'gulp-rename'

import yarn from 'gulp-yarn'
import minify from 'gulp-babel-minify'
import clean from 'gulp-clean'
import concat from 'gulp-concat'
import umd from 'gulp-umd'

import eslint from 'gulp-eslint'
import sassLint from 'gulp-sass-lint'
import htmlhint from 'gulp-htmlhint'

import patterns from 'umd-templates'
import karma from 'karma'

import path from 'path'

const karmaServer = karma.Server
const projectName = 'ngNucleus'
const projectNameFile = 'ng-nucleus'

gulp.task('yarn', () => {
  return gulp.src(['./package.json'])
    .pipe(yarn())
})

gulp.task('concat', () => {
  return gulp.src(['src/**/*.js'])
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat({
      newLine: ';',
      path: projectNameFile + '.js'
    }))
    .pipe(gulp.dest('tmp'))
})

gulp.task('minify', () => {
  return gulp.src('dist/' + projectNameFile + '.js')
    .pipe(minify({
      mangle: false
    }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist'))
})

gulp.task('clean', () => {
  return gulp.src(['tmp'], { read: false })
    .pipe(clean({ force: true }))
})

gulp.task('umd', () => {
  return gulp.src('tmp/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(umd({
      dependencies: (file) => {
        return [
          {
            name: 'angular',
            amd: 'angular',
            cjs: 'angular',
            global: 'angular',
            param: 'angular'
          },
          {
            name: 'moment',
            amd: 'moment',
            cjs: 'angular-moment',
            global: 'moment',
            param: 'moment'
          },
          {
            name: 'validator',
            amd: 'validator',
            cjs: 'validator',
            global: 'validator',
            param: 'validator'
          },
          {
            name: 'BrV',
            amd: 'BrV',
            cjs: 'br-validations',
            global: 'BrV',
            param: 'BrV'
          }
        ]
      },
      namespace: (file) => {
        return projectName
      },
      exports: (file) => {
        return 'exports.default'
      },
      template: patterns.commonjsStrictGlobal.path
    }))
    .pipe(gulp.dest('dist'))
})

gulp.task('watch', () => {
  gulp.watch('gulpfile.babel.js', () => {
    runSequence('yarn', 'concat', 'umd', 'minify')
  })
  gulp.watch(['src/**/*.js'], () => {
    runSequence('yarn', 'concat', 'umd', 'minify')
  })
})

gulp.task('test', (done) => {
  karmaServer.start({
    configFile: path.join(__dirname, '/karma.conf.js'),
    singleRun: true
  }, () => { done() })
})

gulp.task('eslint', (done) => {
  return gulp.src(['src/**/*.js', 'gulpfile.babel.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})

gulp.task('sassLint', (done) => {
  return gulp.src(['src/**/*.scss'])
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
})

gulp.task('htmlhint', (done) => {
  return gulp.src(['src/**/*.html'])
    .pipe(htmlhint())
})

gulp.task('build', () => {
  runSequence('yarn', 'concat', 'umd', 'minify', 'clean', 'sassLint', 'htmlhint', 'eslint')
})

gulp.task('default', () => {
  runSequence('yarn', 'concat', 'umd', 'minify', 'watch')
})
