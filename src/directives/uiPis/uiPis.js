(() => {
  angular.module('ngNucleus').directive('uiPis', [
    'Validations',
    '$window',
    (
      Validations,
      $window
    ) => {
      return {
        require: 'ngModel',
        link: (scope, iElement, iAttrs, ngModelCtrl) => {
          const clearValue = rawValue => {
            return rawValue.toString().replace(/[^0-9]/g, '').slice(0, 11)
          }

          const format = cleanValue => {
            let formattedValue = $window.StringMask.apply(cleanValue, '000.0000.000-0')
            return formattedValue.trim()
          }

          const validations = value => {
            return Validations.isPis(value)
          }

          ngModelCtrl.$parsers.push(value => {
            ngModelCtrl.$setValidity('pis', true)
            if (ngModelCtrl.$isEmpty(value)) {
              ngModelCtrl.$setValidity('pis', false)
              return value
            }
            let cleanValue = clearValue(value.toString())
            let formattedValue = format(cleanValue)
            if (!validations(cleanValue)) { ngModelCtrl.$setValidity('pis', false) }
            if (ngModelCtrl.$viewValue !== formattedValue) {
              ngModelCtrl.$setViewValue(formattedValue)
              ngModelCtrl.$render()
            }
            if (angular.isUndefined(ngModelCtrl.$viewValue)) { return cleanValue }

            return formattedValue
          })
        }
      }
    }])
})()
