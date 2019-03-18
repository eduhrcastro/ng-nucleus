if (angular == null) {
  throw new Error('Angularjs cannot be found by ng-nucleus!')
}
if (!angular.isFunction(moment) || angular.isUndefined(moment)) {
  throw new Error('Moment cannot be found by ng-nucleus!')
}
if (!angular.isObject(validator) || angular.isUndefined(validator)) {
  throw new Error('Validator.js cannot be found by ng-nucleus!')
}
if (!angular.isObject(BrV) || angular.isUndefined(BrV)) {
  throw new Error('Br-validations.js cannot be found by ng-nucleus!')
}

export default angular.module('ngNucleus', [])
