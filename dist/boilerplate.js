(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['exports', 'angular'], factory);
    } else if (typeof exports === 'object') {
        factory(exports, require('angular'));
    } else {
        factory((root.boilerplate = {}), root.angular);
    }
}(this, function (exports, angular) {
'use strict';

angular.module('boilerplate', []).directive('nclUpperCase', [function () {
  return {
    require: 'ngModel',
    scope: {
      ngModel: '=ngModel'
    },
    link: function link(scope, iElement, iAttrs, ngModelCtrl) {
      scope.$watch('ngModel', function (value) {
        if (value) {
          scope.ngModel = value.toString().toUpperCase();
        }
      });
    }
  };
}]);

exports.boilerplate = exports.default;
}));
