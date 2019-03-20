(() => {
  describe('uiFinance', () => {
    let scope, form

    beforeEach(module('ngNucleus'))

    beforeEach(inject(($compile, $rootScope) => {
      scope = $rootScope

      let element = angular.element(
        '<form name="form">' +
        '<input type="text" name="value" ng-model="value" currency="R$" decimals="2" ui-finance />' +
        '</form>'
      )

      $compile(element)(scope)
      form = scope.form
    }))

    it('3 should be a valid number', () => {
      form.value.$setViewValue(3)
      scope.$digest()
      expect(scope.value).toEqual('R$ 3')
      expect(form.value.$valid).toBe(true)
    })

    it('3.0 should be a valid number', () => {
      form.value.$setViewValue(3.0)
      scope.$digest()
      expect(scope.value).toEqual('R$ 3')
      expect(form.value.$valid).toBe(true)
    })

    it('3,2 should be a valid number', () => {
      form.value.$setViewValue('3,2')
      scope.$digest()
      expect(scope.value).toEqual('R$ 3,2')
      expect(form.value.$valid).toBe(true)
    })

    it('3,00 should be a valid number', () => {
      form.value.$setViewValue('3,00')
      scope.$digest()
      expect(scope.value).toEqual('R$ 3')
      expect(form.value.$valid).toBe(true)
    })

    it('R$ 2,59 should be a valid number', () => {
      form.value.$setViewValue('R$ 2,59')
      scope.$digest()
      expect(scope.value).toEqual('R$ 2,59')
      expect(form.value.$valid).toBe(true)
    })

    it('R$ 2.59 should be a valid number', () => {
      form.value.$setViewValue('R$ 2.59')
      scope.$digest()
      expect(scope.value).toEqual('R$ 2,59')
      expect(form.value.$valid).toBe(true)
    })

    it('-3 should be a valid number because - is removed', () => {
      form.value.$setViewValue(-3)
      scope.$digest()
      expect(scope.value).toEqual('R$ 3')
      expect(form.value.$valid).toBe(true)
    })

    it('7.5555888 should be a valid number', () => {
      form.value.$setViewValue(7.5555888)
      scope.$digest()
      expect(scope.value).toEqual('R$ 7,55')
      expect(form.value.$valid).toBe(true)
    })

    it('abc should be a invalid number', () => {
      form.value.$setViewValue('abc')
      scope.$digest()
      expect(scope.value).toEqual('')
      expect(form.value.$valid).toBe(false)
    })

    it('"0007,5555" should be a valid number', () => {
      form.value.$setViewValue('0007,5555')
      scope.$digest()
      expect(scope.value).toEqual('R$ 7,55')
      expect(form.value.$valid).toBe(true)
    })

    it('--9 should be a valid number because others characteres is replaced', () => {
      form.value.$setViewValue('--9')
      scope.$digest()
      expect(scope.value).toEqual('R$ 9')
      expect(form.value.$valid).toBe(true)
    })
  })
})()
