(() => {
  describe('uiNumberIntegerOnly', () => {
    let scope, form

    beforeEach(module('ngNucleus'))

    beforeEach(inject(($compile, $rootScope) => {
      scope = $rootScope

      let element = angular.element(
        '<form name="form">' +
        '<input type="text" name="value" ng-model="value" ui-code-number />' +
        '</form>'
      )

      $compile(element)(scope)
      form = scope.form
    }))

    it('3 should be a invalid code number', () => {
      form.value.$setViewValue(3)
      scope.$digest()
      expect(scope.value).toEqual('3')
      expect(form.value.$valid).toBe(false)
    })

    it('-4 should be a invalid code number', () => {
      form.value.$setViewValue(-4)
      scope.$digest()
      expect(scope.value).toEqual('4')
      expect(form.value.$valid).toBe(false)
    })

    it('--4 should be a invalid code number', () => {
      form.value.$setViewValue('--4')
      scope.$digest()
      expect(scope.value).toEqual('4')
      expect(form.value.$valid).toBe(false)
    })

    it('abc should be a empty (0) code number', () => {
      form.value.$setViewValue('abc')
      scope.$digest()
      expect(scope.value).toEqual('')
      expect(form.value.$valid).toBe(false)
    })

    it('"7" should be a invalid code number', () => {
      form.value.$setViewValue('7')
      scope.$digest()
      expect(scope.value).toEqual('7')
      expect(form.value.$valid).toBe(false)
    })

    it('7.88 should be a invalid code number', () => {
      form.value.$setViewValue(7.88)
      scope.$digest()
      expect(scope.value).toEqual('788')
      expect(form.value.$valid).toBe(false)
    })

    it('.88 should be a invalid code number', () => {
      form.value.$setViewValue('.88')
      scope.$digest()
      expect(scope.value).toEqual('88')
      expect(form.value.$valid).toBe(false)
    })

    it('00.88 should be a valid code number because characteres is replaced', () => {
      form.value.$setViewValue('00.88')
      scope.$digest()
      expect(scope.value).toEqual('0088')
      expect(form.value.$valid).toBe(true)
    })

    it('3.0 should be a invalid code number', () => {
      form.value.$setViewValue(3.0)
      scope.$digest()
      expect(scope.value).toEqual('3')
      expect(form.value.$valid).toBe(false)
    })

    it('3.0.8.9 should be a valid code number because characteres is replaced', () => {
      form.value.$setViewValue('3.0.8.9')
      scope.$digest()
      expect(scope.value).toEqual('3089')
      expect(form.value.$valid).toBe(true)
    })
  })
})()
