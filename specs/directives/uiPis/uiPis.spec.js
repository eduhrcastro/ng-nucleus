(() => {
  describe('uiPis', () => {
    let scope, form

    beforeEach(module('ngNucleus'))

    beforeEach(inject(($compile, $rootScope) => {
      scope = $rootScope

      let element = angular.element(
        '<form name="form">' +
        '<input type="text" name="value" ng-model="value" ui-pis />' +
        '</form>'
      )

      $compile(element)(scope)
      form = scope.form
    }))

    it('000.0000.000-0 should be a invalid pis number', () => {
      form.value.$setViewValue('000.0000.000-0')
      scope.$digest()
      expect(scope.value).toEqual('000.0000.000-0')
      expect(form.value.$valid).toBe(false)
    })

    it('00000000000 should be a invalid pis number', () => {
      form.value.$setViewValue('00000000000')
      scope.$digest()
      expect(scope.value).toEqual('000.0000.000-0')
      expect(form.value.$valid).toBe(false)
    })

    it('3 should be a invalid pis number', () => {
      form.value.$setViewValue(3)
      scope.$digest()
      expect(scope.value).toEqual('3')
      expect(form.value.$valid).toBe(false)
    })

    it('120.3781.086-7 should be a valid pis number', () => {
      form.value.$setViewValue('120.3781.086-7')
      scope.$digest()
      expect(scope.value).toEqual('120.3781.086-7')
      expect(form.value.$valid).toBe(true)
    })

    it('12037810867 should be a valid pis number', () => {
      form.value.$setViewValue(12037810867)
      scope.$digest()
      expect(scope.value).toEqual('120.3781.086-7')
      expect(form.value.$valid).toBe(true)
    })
  })
})()
