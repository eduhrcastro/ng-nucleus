(() => {
  angular.module('ngNucleus').directive('uiConta', [
    '$window',
    (
      $window
    ) => {
      return {
        require: 'ngModel',
        link: (scope, iElement, iAttrs, ngModelCtrl) => {
          const invalidAccount = [
            '00000000000000',
            '11111111111111',
            '22222222222222',
            '33333333333333',
            '44444444444444',
            '55555555555555',
            '66666666666666',
            '77777777777777',
            '88888888888888',
            '99999999999999'
          ]

          const currentMask = length => {
            let mask = ''
            for (let i = 0; i < length; i++) {
              if (i + 1 === length - 1) { mask += '0-' } else { mask += '0' }
            }
            return mask
          }

          const clearValue = rawValue => {
            return rawValue.toString().replace(/[^0-9]/g, '').slice(0, 14)
          }

          const format = cleanValue => {
            let formattedValue = $window.StringMask.apply(cleanValue, currentMask(cleanValue.length))
            return formattedValue.trim()
          }

          const validations = value => {
            return value && !invalidAccount.includes(value)
          }

          ngModelCtrl.$parsers.push(function parser (value) {
            ngModelCtrl.$setValidity('conta', true)
            if (ngModelCtrl.$isEmpty(value)) {
              ngModelCtrl.$setValidity('conta', false)
              return value
            }

            let cleanValue = clearValue(value)
            let formattedValue = format(cleanValue)
            if (!validations(cleanValue)) { ngModelCtrl.$setValidity('conta', false) }
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
