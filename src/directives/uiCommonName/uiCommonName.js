(() => {
  angular.module('ngNucleus').directive('uiCommonName', [
    () => {
      return {
        require: 'ngModel',
        link: (scope, iElement, iAttrs, ngModelCtrl) => {
          ngModelCtrl.$parsers.push(value => {
            return value.toString().replace(/(?:^|\s)\S/g, (a) => { return a.toUpperCase() })
          })
        }
      }
    }])
})()
