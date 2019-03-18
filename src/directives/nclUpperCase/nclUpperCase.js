(() => {
  angular.module('boilerplate').directive('nclUpperCase', [() => {
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
