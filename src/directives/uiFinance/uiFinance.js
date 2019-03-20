(() => {
  angular.module('ngNucleus').directive('uiFinance', [
    '$locale',
    'Validations',
    (
      $locale,
      Validations
    ) => {
      return {
        require: 'ngModel',
        link: (scope, iElement, iAttrs, ngModelCtrl) => {
          const decimalDelimiter = $locale.NUMBER_FORMATS.DECIMAL_SEP
          const thousandsDelimiter = $locale.NUMBER_FORMATS.GROUP_SEP
          const currencySym = $locale.NUMBER_FORMATS.CURRENCY_SYM + ' '

          const clearValue = rawValue => {
            rawValue = rawValue.toString().replace(/[^0-9.,]/g, '')

            let integer = rawValue.substr(0, rawValue.indexOf(decimalDelimiter))
            integer = integer.toString().replace(/[^0-9]/g, '')

            const floating = rawValue.substr(rawValue.indexOf(decimalDelimiter) - rawValue.length)
            const cleanValue = integer + floating

            let number = cleanValue.toString().replace(decimalDelimiter, thousandsDelimiter)
            if (ngModelCtrl.$isEmpty(number)) { return number }
            return Number(number).toString()
          }

          const format = cleanValue => {
            if (ngModelCtrl.$isEmpty(cleanValue)) { return cleanValue }
            if (cleanValue.split(thousandsDelimiter).length - 1 === 1) { cleanValue = cleanValue.toString().replace(thousandsDelimiter, decimalDelimiter) }

            let integer = cleanValue.substr(0, cleanValue.indexOf(decimalDelimiter))
            integer = integer.toString().replace(/\B(?=(\d{3})+(?!\d))/g, thousandsDelimiter)

            let floating = cleanValue.substr(cleanValue.indexOf(decimalDelimiter) - cleanValue.length)
            if (angular.isDefined(iAttrs.decimals) && parseInt(iAttrs.decimals) > 0) { floating = floating.substr(0, parseInt(iAttrs.decimals) + 1) }

            if (angular.isDefined(iAttrs.currency) && (iAttrs.currency === true || iAttrs.currency)) { return currencySym + integer + floating }

            return integer + floating
          }

          const validations = value => {
            return angular.isDefined(value) && value !== '' && Validations.isNumber(value)
          }

          ngModelCtrl.$parsers.push(value => {
            ngModelCtrl.$setValidity('finance', true)
            if (ngModelCtrl.$isEmpty(value)) {
              ngModelCtrl.$setValidity('finance', false)
              return value
            }
            let cleanValue = clearValue(value)
            let formattedValue = format(cleanValue)
            if (!validations(cleanValue)) { ngModelCtrl.$setValidity('finance', false) }
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
