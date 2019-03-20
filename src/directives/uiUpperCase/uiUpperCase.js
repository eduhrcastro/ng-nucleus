(() => {
  angular.module('ngNucleus').directive('uiUpperCase', [
    () => {
      return {
        require: 'ngModel',
        link: (scope, iElement, iAttrs, ngModelCtrl) => {
          ngModelCtrl.$parsers.push(function parser (value) {
            return value.toString().toUpperCase()
          })
        }
      }
    }])
})()
