(() => {
  angular.module('ngNucleus').directive('uiCodeNumber', [
    () => {
      return {
        require: 'ngModel',
        link: (scope, iElement, iAttrs, ngModelCtrl) => {
          ngModelCtrl.$parsers.push(value => {
            ngModelCtrl.$setValidity('code', true)
            let input = value.toString().replace(/[^0-9]/g, '').slice(0, 4)
            if (input.length !== 4 || isNaN(input)) { ngModelCtrl.$setValidity('code', false) }
            if (input !== value.toString()) {
              ngModelCtrl.$setViewValue(input)
              ngModelCtrl.$render()
            }
            return input.toString()
          })
        }
      }
    }])
})()
