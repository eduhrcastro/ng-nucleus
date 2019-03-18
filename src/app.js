if (!angular.isFunction(moment)) {
  throw new Error('Moment cannot be found by ng-nucleus!')
}
if (!angular.isFunction(validator)) {
  throw new Error('Validator.js cannot be found by ng-nucleus!')
}
if (!angular.isFunction(BrV)) {
  throw new Error('Br-validations.js cannot be found by ng-nucleus!')
}

export default angular.module('ngNucleus', [])
