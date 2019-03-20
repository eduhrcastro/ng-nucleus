(() => {
  describe('uiStringOnlyMask', () => {
    let scope, form

    beforeEach(module('ngNucleus'))

    beforeEach(inject(($compile, $rootScope) => {
      scope = $rootScope

      let element = angular.element(
        '<form name="form">' +
        '<input type="text" name="value" ng-model="value" ui-string-only-mask />' +
        '</form>'
      )

      $compile(element)(scope)
      form = scope.form
    }))

    it('abc should be equals to abc', () => {
      form.value.$setViewValue('abc')
      scope.$digest()
      expect(scope.value).toEqual('abc')
    })

    it('ABC should be equals to ABC', () => {
      form.value.$setViewValue('ABC')
      scope.$digest()
      expect(scope.value).toEqual('ABC')
    })

    it('AéÇôÍ should be equals to AéÇôÍ', () => {
      form.value.$setViewValue('AéÇôÍ')
      scope.$digest()
      expect(scope.value).toEqual('AéÇôÍ')
    })

    it('92 should be a empty string', () => {
      form.value.$setViewValue(92)
      scope.$digest()
      expect(scope.value).toEqual('')
    })

    it('!@ should be a empty string', () => {
      form.value.$setViewValue('!@')
      scope.$digest()
      expect(scope.value).toEqual('')
    })
  })
})()
