(() => {
  angular.module('ngNucleus').directive('uiNumberOnlyMask', [() => {
    return {
      require: 'ngModel',
      link: (scope, iElement, iAttrs, ngModelCtrl) => {
        ngModelCtrl.$parsers.push(value => {
          ngModelCtrl.$setValidity('min', true)
          ngModelCtrl.$setValidity('max', true)
          let input = value.toString().replace(/[^0-9]/g, '')
          if (angular.isDefined(iAttrs.numberMin) && parseInt(input) < parseInt(iAttrs.numberMin)) {
            ngModelCtrl.$setValidity('min', false)
          } else if (angular.isDefined(iAttrs.numberMax) && parseInt(input) > parseInt(iAttrs.numberMax)) {
            ngModelCtrl.$setValidity('max', false)
          }
          if (input !== value.toString()) {
            ngModelCtrl.$setViewValue(input)
            ngModelCtrl.$render()
          }
          return Number(input)
        })
      }
    }
  }])
})()
