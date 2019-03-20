(() => {
  angular.module('ngNucleus').directive('uiTitulo', [
    'Validations',
    (
      Validations
    ) => {
      return {
        require: 'ngModel',
        link: (scope, iElement, iAttrs, ngModelCtrl) => {
          const clearValue = rawValue => {
            return rawValue.toString().replace(/[^0-9]/g, '').slice(0, 12)
          }

          const format = cleanValue => {
            return cleanValue.trim()
          }

          const validations = value => {
            return Validations.isTitulo(value)
          }

          ngModelCtrl.$parsers.push(value => {
            ngModelCtrl.$setValidity('titulo', true)
            if (ngModelCtrl.$isEmpty(value)) {
              ngModelCtrl.$setValidity('titulo', false)
              return value
            }
            let cleanValue = clearValue(value.toString())
            let formattedValue = format(cleanValue)
            if (!validations(cleanValue)) { ngModelCtrl.$setValidity('titulo', false) }
            if (ngModelCtrl.$viewValue !== formattedValue) {
              ngModelCtrl.$setViewValue(formattedValue)
              ngModelCtrl.$render()
            }
            if (angular.isUndefined(ngModelCtrl.$viewValue)) {
              return cleanValue
            }
            return formattedValue
          })
        }
      }
    }])
})()
