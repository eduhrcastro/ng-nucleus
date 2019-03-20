(() => {
  angular.module('ngNucleus').directive('uiScientificNotation', [
    'Validations',
    (
      Validations
    ) => {
      return {
        require: 'ngModel',
        link: (scope, iElement, iAttrs, ngModelCtrl) => {
          const clearValue = rawValue => {
            return rawValue.toString().replace(/[^0-9.-]/g, '')
          }

          const validations = value => {
            if (angular.isDefined(iAttrs.min) && parseFloat(value) < parseFloat(iAttrs.min)) {
              return false
            } else if (angular.isDefined(iAttrs.max) && parseFloat(value) > parseFloat(iAttrs.max)) {
              return false
            }
            return angular.isDefined(value) && value !== '' && Validations.isNumber(value)
          }

          const format = value => {
            if (ngModelCtrl.$isEmpty(value)) { return value }
            return Number(value).toString()
          }

          ngModelCtrl.$parsers.push(value => {
            ngModelCtrl.$setValidity('notation', true)

            if (ngModelCtrl.$isEmpty(value)) {
              ngModelCtrl.$setValidity('notation', false)
              return value
            }

            let cleanValue = clearValue(value)
            let formattedValue = format(cleanValue)

            if (!validations(cleanValue)) { ngModelCtrl.$setValidity('notation', false) }

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
