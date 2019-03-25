(() => {
  angular.module('ngNucleus').directive('uiCpf', [
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
            return rawValue.toString().replace(/[^\d]/g, '').slice(0, 11)
          }

          const format = cleanValue => {
            return ($window.StringMask.apply(cleanValue, '000.000.000-00') || '').trim()
          }

          const validations = value => {
            return angular.isDefined(value) && Validations.isCpf(value)
          }

          ngModelCtrl.$parsers.push(value => {
            ngModelCtrl.$setValidity('cpf', true)
            if (ngModelCtrl.$isEmpty(value)) {
              ngModelCtrl.$setValidity('cpf', false)
              return value
            }

            let cleanValue = clearValue(value)
            let formattedValue = format(cleanValue)
            if (!validations(cleanValue)) { ngModelCtrl.$setValidity('cpf', false) }
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
