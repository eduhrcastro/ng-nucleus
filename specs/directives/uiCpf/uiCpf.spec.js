(() => {
  describe('uiCpf', () => {
    let scope, form

    beforeEach(module('ngNucleus'))

    beforeEach(inject(($compile, $rootScope) => {
      scope = $rootScope

      let element = angular.element(
        '<form name="form">' +
        '<input type="text" name="value" ng-model="value" ui-cpf />' +
        '</form>'
      )

      $compile(element)(scope)
      form = scope.form
    }))

    it('000.000.000-00 should be a ivalid cpf', () => {
      form.value.$setViewValue('000.000.000-00')
      scope.$digest()
      expect(scope.value).toEqual('000.000.000-00')
      expect(form.value.$valid).toBe(false)
    })

    it('00000000000 should be a ivalid cpf', () => {
      form.value.$setViewValue('00000000000')
      scope.$digest()
      expect(scope.value).toEqual('000.000.000-00')
      expect(form.value.$valid).toBe(false)
    })

    it('630.880.530-00 should be a valid cpf', () => {
      form.value.$setViewValue('630.880.530-00')
      scope.$digest()
      expect(scope.value).toEqual('630.880.530-00')
      expect(form.value.$valid).toBe(true)
    })

    it('63088053000 should be a valid cpf', () => {
      form.value.$setViewValue('63088053000')
      scope.$digest()
      expect(scope.value).toEqual('630.880.530-00')
      expect(form.value.$valid).toBe(true)
    })

    it('abcd should be a valid cpf', () => {
      form.value.$setViewValue('abcd')
      scope.$digest()
      expect(scope.value).toEqual('')
      expect(form.value.$valid).toBe(false)
    })

    it('630#880!53000b should be a valid cpf because characteres is replaced', () => {
      form.value.$setViewValue('630#880!53000b')
      scope.$digest()
      expect(scope.value).toEqual('630.880.530-00')
      expect(form.value.$valid).toBe(true)
    })
  })
})()
