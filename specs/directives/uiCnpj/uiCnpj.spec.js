(() => {
  describe('uiCnpj', () => {
    let scope, form

    beforeEach(module('ngNucleus'))

    beforeEach(inject(($compile, $rootScope) => {
      scope = $rootScope

      let element = angular.element(
        '<form name="form">' +
        '<input type="text" name="value" ng-model="value" ui-cnpj />' +
        '</form>'
      )

      $compile(element)(scope)
      form = scope.form
    }))

    it('00.000.000/0000-00 should be a ivalid cnpj', () => {
      form.value.$setViewValue('00.000.000/0000-00')
      scope.$digest()
      expect(scope.value).toEqual('00.000.000/0000-00')
      expect(form.value.$valid).toBe(false)
    })

    it('00000000000000 should be a ivalid cnpj', () => {
      form.value.$setViewValue('00000000000000')
      scope.$digest()
      expect(scope.value).toEqual('00.000.000/0000-00')
      expect(form.value.$valid).toBe(false)
    })

    it('26.794.202/0001-46 should be a valid cnpj', () => {
      form.value.$setViewValue('26.794.202/0001-46')
      scope.$digest()
      expect(scope.value).toEqual('26.794.202/0001-46')
      expect(form.value.$valid).toBe(true)
    })

    it('26794202000146 should be a valid cnpj', () => {
      form.value.$setViewValue('26794202000146')
      scope.$digest()
      expect(scope.value).toEqual('26.794.202/0001-46')
      expect(form.value.$valid).toBe(true)
    })

    it('abcd should be a valid cnpj', () => {
      form.value.$setViewValue('abcd')
      scope.$digest()
      expect(scope.value).toEqual('')
      expect(form.value.$valid).toBe(false)
    })

    it('26.79$4.20%2/0#001-46d should be a valid cnpj because characteres is replaced', () => {
      form.value.$setViewValue('26.79$4.20%2/0#001-46d')
      scope.$digest()
      expect(scope.value).toEqual('26.794.202/0001-46')
      expect(form.value.$valid).toBe(true)
    })
  })
})()
