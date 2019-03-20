(() => {
  angular.module('ngNucleus').directive('uiUpperCase', [
    () => {
      return {
        require: 'ngModel',
        link: (scope, iElement, iAttrs, ngModelCtrl) => {
          ngModelCtrl.$parsers.push(value => {
            return value.toString().toUpperCase()
          })
        }
      }
    }])
})()
