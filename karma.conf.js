// Karma configuration
// Generated on Wed May 30 2018 17:30:22 GMT-0300 (-03)
module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'jasmine-matchers', 'es6-shim'],

    plugins: [
      'karma-babel-preprocessor',
      'karma-jasmine-matchers',
      'karma-jasmine',
      'karma-phantomjs-launcher',
      'karma-mocha-reporter',
      'karma-coverage',
      'karma-coveralls',
      'karma-es6-shim'
    ],

    // list of files / patterns to load in the browser
    files: [
      'node_modules/@babel/polyfill/dist/polyfill.js',
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/angular/angular.js',
      'node_modules/angular-locale-pt-br/angular-locale_pt-br.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/moment/min/moment-with-locales.min.js',
      'node_modules/angular-moment/angular-moment.min.js',
      'node_modules/br-validations/releases/br-validations.min.js',
      'node_modules/validator/validator.min.js',
      'node_modules/string-mask/src/string-mask.js',
      'dist/ng-nucleus.min.js',
      'specs/**/*.spec.js'
    ],

    // list of files / patterns to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'specs/**/*.spec.js': 'babel',
      'dist/ng-nucleus.min.js': ['coverage']
    },

    babelPreprocessor: {
      options: {
        presets: ['@babel/preset-env'],
        sourceMap: 'inline'
      },
      filename: function (file) {
        return file.originalPath.replace(/\.spec\.js$/, '.es5.js')
      },
      sourceFileName: function (file) {
        return file.originalPath
      }
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha', 'coverage', 'coveralls'],

    coverageReporter: {
      reporters: [
        { type: 'lcov' },
        { type: 'text-summary' }
      ],
      dir: 'coverage/'
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
