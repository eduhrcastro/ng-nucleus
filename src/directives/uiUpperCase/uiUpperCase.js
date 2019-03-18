(() => {
  angular.module('ngNucleus').directive('uiUpperCase', [
    () => {
      return {
        require: 'ngModel',
        scope: {
          ngModel: '=ngModel'
        },
        link: (scope, iElement, iAttrs, ngModelCtrl) => {
          scope.$watch('ngModel', value => {
            if (value) { scope.ngModel = value.toString().toUpperCase() }
          })
        }
      }
    }])
})()
