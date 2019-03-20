(() => {
  angular.module('ngNucleus').directive('uiStringOnlyMask', [
    () => {
      return {
        require: 'ngModel',
        link: (scope, iElement, iAttrs, ngModelCtrl) => {
          ngModelCtrl.$parsers.push(value => {
            let input = value.toString().replace(/[^a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-+$]/g, '')
            if (input !== value) {
              ngModelCtrl.$setViewValue(input)
              ngModelCtrl.$render()
            }
            return String(input)
          })
        }
      }
    }])
})()
