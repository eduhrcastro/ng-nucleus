(() => {
  angular.module('ngNucleus').directive('uiCnpj', [
    '$window',
    'Validations',
    (
      $window,
      Validations
    ) => {
      return {
        require: 'ngModel',
        link: (scope, iElement, iAttrs, ngModelCtrl) => {
          const clearValue = rawValue => {
            return rawValue.replace(/[^\d]/g, '').slice(0, 14)
          }

          const format = cleanValue => {
            return ($window.StringMask.apply(cleanValue, '00.000.000/0000-00') || '').trim()
          }

          const validations = value => {
            return angular.isDefined(value) && Validations.isCnpj(value)
          }

          ngModelCtrl.$parsers.push(function parser (value) {
            ngModelCtrl.$setValidity('cnpj', true)
            if (ngModelCtrl.$isEmpty(value)) {
              ngModelCtrl.$setValidity('cnpj', false)
              return value
            }

            let cleanValue = clearValue(value)
            let formattedValue = format(cleanValue)
            if (!validations(cleanValue)) { ngModelCtrl.$setValidity('cnpj', false) }
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
