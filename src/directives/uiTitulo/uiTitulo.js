(() => {
  angular.module('ngNucleus').directive('uiTitulo', [
    'Validations',
    (
      Validations
    ) => {
      return {
        require: 'ngModel',
        scope: {
          ngModel: '=ngModel'
        },
        link: (scope, iElement, iAttrs, ngModelCtrl) => {
          const clearValue = rawValue => {
            return rawValue.toString().replace(/[^0-9]/g, '').slice(0, 12)
          }

          const format = cleanValue => {
            return cleanValue.trim().replace(/[^0-9]$/, '')
          }

          const validations = value => {
            return Validations.isTitulo(value)
          }

          ngModelCtrl.$formatters.push(function formatter (value) {
            if (ngModelCtrl.$isEmpty(value)) {
              return value
            }
            let cleanValue = clearValue(value.toString())
            return format(cleanValue)
          })

          ngModelCtrl.$parsers.push(function parser (value) {
            ngModelCtrl.$setValidity('titulo', true)
            if (ngModelCtrl.$isEmpty(value)) { return value }
            let cleanValue = clearValue(value.toString())
            let formattedValue = format(cleanValue)
            if (!validations(cleanValue)) { ngModelCtrl.$setValidity('titulo', false) }
            if (ngModelCtrl.$viewValue !== formattedValue) {
              ngModelCtrl.$setViewValue(formattedValue)
              ngModelCtrl.$render()
            }
            if (angular.isUndefined(ngModelCtrl.getModelValue)) {
              return cleanValue
            }
            let actualModelType = typeof ngModelCtrl.$modelValue
            return ngModelCtrl.getModelValue(formattedValue, actualModelType)
          })
        }
      }
    }])
})()
