(() => {
  describe('uiCommonName', () => {
    let scope, form

    beforeEach(module('ngNucleus'))

    beforeEach(inject(($compile, $rootScope) => {
      scope = $rootScope

      let element = angular.element(
        '<form name="form">' +
        '<input type="text" name="value" ng-model="value" ui-common-name />' +
        '</form>'
      )

      $compile(element)(scope)
      form = scope.form
    }))

    it('abc should be equals to Abc', () => {
      form.value.$setViewValue('abc')
      scope.$digest()
      expect(scope.value).toEqual('Abc')
    })

    it('ABC should be equals to Abc', () => {
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

    it('ABC DEF GHI JLM should be equals to ABC DEF GHI JLM', () => {
      form.value.$setViewValue('ABC DEF GHI JLM')
      scope.$digest()
      expect(scope.value).toEqual('ABC DEF GHI JLM')
    })

    it('abc def ghi jlm should be equals to Abc Def Ghi Jlm', () => {
      form.value.$setViewValue('abc def ghi jlm')
      scope.$digest()
      expect(scope.value).toEqual('Abc Def Ghi Jlm')
    })
  })
})()
