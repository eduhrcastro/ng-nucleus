(() => {
  angular.module('ngNucleus').directive('uiInscricaoMunicipal', [
    'Validations',
    (
      Validations
    ) => {
      return {
        require: 'ngModel',
        link: (scope, iElement, iAttrs, ngModelCtrl) => {
          const clearValue = rawValue => {
            return Number(rawValue.toString().replace(/[^0-9]/g, '').slice(0, 15)).toString()
          }

          const format = cleanValue => {
            return cleanValue.trim()
          }

          const validations = value => {
            return Validations.isInscricaoMunicipal(value)
          }

          ngModelCtrl.$parsers.push(value => {
            ngModelCtrl.$setValidity('inscricaoMunicipal', true)
            if (ngModelCtrl.$isEmpty(value)) {
              ngModelCtrl.$setValidity('inscricaoMunicipal', false)
              return value
            }
            let cleanValue = clearValue(value)
            let formattedValue = format(cleanValue)
            if (!validations(cleanValue)) { ngModelCtrl.$setValidity('inscricaoMunicipal', false) }
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
