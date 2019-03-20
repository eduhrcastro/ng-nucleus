(() => {
  describe('uiUpperCase', () => {
    let scope, form

    beforeEach(module('ngNucleus'))

    beforeEach(inject(($compile, $rootScope) => {
      scope = $rootScope

      let element = angular.element(
        '<form name="form">' +
        '<input type="text" name="value" ng-model="value" ui-upper-case />' +
        '</form>'
      )

      $compile(element)(scope)
      form = scope.form
    }))

    it('abc should be equals to ABC', () => {
      form.value.$setViewValue('abc')
      scope.$digest()
      expect(scope.value).toEqual('ABC')
    })

    it('ABC should be equals to ABC', () => {
      form.value.$setViewValue('ABC')
      scope.$digest()
      expect(scope.value).toEqual('ABC')
    })

    it('92 should be equals to "92"', () => {
      form.value.$setViewValue(92)
      scope.$digest()
      expect(scope.value).toEqual('92')
    })

    it('!@ should be equals to !@', () => {
      form.value.$setViewValue('!@')
      scope.$digest()
      expect(scope.value).toEqual('!@')
    })
  })
})()
