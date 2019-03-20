(() => {
  describe('uiNumberOnlyMask', () => {
    let scope, form

    beforeEach(module('ngNucleus'))

    beforeEach(inject(($compile, $rootScope) => {
      scope = $rootScope

      let element = angular.element(
        '<form name="form">' +
        '<input type="text" name="value" ng-model="value" number-min="3" number-max="10" ui-number-only-mask />' +
        '</form>'
      )

      $compile(element)(scope)
      form = scope.form
    }))

    it('3 should be a valid number', () => {
      form.value.$setViewValue(3)
      scope.$digest()
      expect(scope.value).toEqual(3)
      expect(form.value.$valid).toBe(true)
    })

    it('2 should be a invalid number because a min value is 3', () => {
      form.value.$setViewValue(2)
      scope.$digest()
      expect(scope.value).toEqual(2)
      expect(form.value.$valid).toBe(false)
    })

    it('11 should be a invalid number because a max value is 10', () => {
      form.value.$setViewValue(11)
      scope.$digest()
      expect(scope.value).toEqual(11)
      expect(form.value.$valid).toBe(false)
    })

    it('10 should be a valid number', () => {
      form.value.$setViewValue(10)
      scope.$digest()
      expect(scope.value).toEqual(10)
      expect(form.value.$valid).toBe(true)
    })

    it('abc should be a empty (0) number', () => {
      form.value.$setViewValue('abc')
      scope.$digest()
      expect(scope.value).toEqual(0)
      expect(form.value.$valid).toBe(true)
    })

    it('"7" should be a valid number', () => {
      form.value.$setViewValue('7')
      scope.$digest()
      expect(scope.value).toEqual(7)
      expect(form.value.$valid).toBe(true)
    })
  })
})()
