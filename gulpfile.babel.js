'use strict'

import gulp from 'gulp'
import babel from 'gulp-babel'

import yarn from 'gulp-yarn'

import rename from 'gulp-rename'
import concat from 'gulp-concat'
import minify from 'gulp-babel-minify'
import clean from 'gulp-clean'
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
      presets: ['@babel/preset-env']
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
    .pipe(umd({
      dependencies: file => {
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
      namespace: file => {
        return projectName
      },
      exports: file => {
        return 'exports.default'
      },
      template: patterns.commonjsStrict.path
    }))
    .pipe(gulp.dest('dist'))
})

gulp.task('eslint', () => {
  return gulp.src(['src/**/*.js', 'gulpfile.babel.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})

gulp.task('sassLint', () => {
  return gulp.src(['src/**/*.scss'])
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
})

gulp.task('htmlhint', () => {
  return gulp.src(['src/**/*.html'])
    .pipe(htmlhint())
})

gulp.task('test', done => {
  karmaServer.start({
    configFile: path.join(__dirname, '/karma.conf.js'),
    singleRun: true
  }, () => { done() })
})

gulp.task('watch', () => {
  gulp.watch(['gulpfile.babel.js', 'src/**/*.js'],
    gulp.series(
      'yarn',
      'concat',
      'umd',
      'minify'
    )
  )
})

gulp.task('build', gulp.series(
  'yarn',
  'concat',
  'umd',
  'minify',
  'clean',
  'sassLint',
  'htmlhint',
  'eslint',
  'test'
))

gulp.task('default', gulp.series('watch'))
