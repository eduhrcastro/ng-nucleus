(() => {
  angular.module('ngNucleus').directive('uiDate', [
    '$locale',
    'Validations',
    (
      $locale,
      Validations
    ) => {
      return {
        require: 'ngModel',
        link: (scope, iElement, iAttrs, ngModelCtrl) => {
          const dateFormatMapByLocale = {
            'pt-br': 'DD/MM/YYYY',
            'es-ar': 'DD/MM/YYYY',
            'es-mx': 'DD/MM/YYYY',
            'es': 'DD/MM/YYYY',
            'en-us': 'MM/DD/YYYY',
            'en': 'MM/DD/YYYY',
            'fr-fr': 'DD/MM/YYYY',
            'fr': 'DD/MM/YYYY',
            'ru': 'DD.MM.YYYY'
          }

          let dateFormat = dateFormatMapByLocale[$locale.id] || 'YYYY-MM-DD'

          iAttrs.parse = iAttrs.parse || 'true'

          dateFormat = iAttrs.uiDateMask || dateFormat

          const clearValue = rawValue => {
            if (angular.isObject(rawValue) || Validations.isISODateString(rawValue)) {
              return moment(rawValue).format(dateFormat)
            }
            rawValue = rawValue.toString().replace(/[^0-9]/g, '').trim()
            return moment(rawValue, dateFormat.replace('/', '')).format(dateFormat)
          }

          const validations = value => {
            return !ngModelCtrl.$isEmpty(value) && Validations.isDate(value, dateFormat)
          }

          ngModelCtrl.$parsers.push(value => {
            ngModelCtrl.$setValidity('date', true)

            if (ngModelCtrl.$isEmpty(value)) {
              ngModelCtrl.$setValidity('date', false)
              return value
            }

            let formattedValue = clearValue(value)
            if (!validations(formattedValue)) {
              ngModelCtrl.$setValidity('date', false)
            }

            if (ngModelCtrl.$viewValue !== formattedValue) {
              ngModelCtrl.$setViewValue(formattedValue)
              ngModelCtrl.$render()
            }

            if (angular.isUndefined(ngModelCtrl.$viewValue)) { return formattedValue }

            return iAttrs.parse === 'false' ? formattedValue : moment(formattedValue).format(dateFormat)
          })
        }
      }
    }])
})()
