(() => {
  angular.module('ngNucleus').directive('uiNumberIntegerOnly', [() => {
    return {
      require: 'ngModel',
      link: (scope, iElement, iAttrs, ngModelCtrl) => {
        ngModelCtrl.$parsers.push(value => {
          ngModelCtrl.$setValidity('min', true)
          ngModelCtrl.$setValidity('max', true)
          ngModelCtrl.$setValidity('integer', true)
          let input = value.toString().replace(/[^0-9.-]/g, '')
          if (!Number.isInteger(Number(input))) {
            ngModelCtrl.$setValidity('integer', false)
          } else {
            input = input.replace('.', '')
          }
          if (angular.isDefined(iAttrs.numberMin) && parseInt(input) < parseInt(iAttrs.numberMin)) {
            ngModelCtrl.$setValidity('min', false)
          } else if (angular.isDefined(iAttrs.numberMax) && parseInt(input) > parseInt(iAttrs.numberMax)) {
            ngModelCtrl.$setValidity('max', false)
          }
          if (input !== value.toString()) {
            ngModelCtrl.$setViewValue(input)
            ngModelCtrl.$render()
          }
          return Math.trunc(Number(input))
        })
      }
    }
  }])
})()
