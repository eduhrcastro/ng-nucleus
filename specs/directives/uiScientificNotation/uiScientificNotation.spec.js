(() => {
  describe('uiScientificNotation', () => {
    let scope, form

    beforeEach(module('ngNucleus'))

    beforeEach(inject(($compile, $rootScope) => {
      scope = $rootScope

      let element = angular.element(
        '<form name="form">' +
        '<input type="text" name="value" ng-model="value" min="3" max="10" ui-scientific-notation />' +
        '</form>'
      )

      $compile(element)(scope)
      form = scope.form
    }))

    it('3 should be a valid number', () => {
      form.value.$setViewValue(3)
      scope.$digest()
      expect(scope.value).toEqual('3')
      expect(form.value.$valid).toBe(true)
    })

    it('3.0 should be a valid number', () => {
      form.value.$setViewValue(3.0)
      scope.$digest()
      expect(scope.value).toEqual('3')
      expect(form.value.$valid).toBe(true)
    })

    it('3.2 should be a valid number', () => {
      form.value.$setViewValue(3.2)
      scope.$digest()
      expect(scope.value).toEqual('3.2')
      expect(form.value.$valid).toBe(true)
    })

    it('3.20000 should be a valid number', () => {
      form.value.$setViewValue(3.20000)
      scope.$digest()
      expect(scope.value).toEqual('3.2')
      expect(form.value.$valid).toBe(true)
    })

    it('2 should be a invalid number because a min value is 3', () => {
      form.value.$setViewValue(2)
      scope.$digest()
      expect(scope.value).toEqual('2')
      expect(form.value.$valid).toBe(false)
    })

    it('11 should be a invalid number because a max value is 10', () => {
      form.value.$setViewValue(11)
      scope.$digest()
      expect(scope.value).toEqual('11')
      expect(form.value.$valid).toBe(false)
    })

    it('10 should be a valid number', () => {
      form.value.$setViewValue(10)
      scope.$digest()
      expect(scope.value).toEqual('10')
      expect(form.value.$valid).toBe(true)
    })

    it('abc should be a invalid number', () => {
      form.value.$setViewValue('abc')
      scope.$digest()
      expect(scope.value).toEqual('')
      expect(form.value.$valid).toBe(false)
    })

    it('"7" should be a valid number', () => {
      form.value.$setViewValue('7')
      scope.$digest()
      expect(scope.value).toEqual('7')
      expect(form.value.$valid).toBe(true)
    })

    it('7.5555888 should be a valid number', () => {
      form.value.$setViewValue(7.5555888)
      scope.$digest()
      expect(scope.value).toEqual('7.5555888')
      expect(form.value.$valid).toBe(true)
    })

    it('"0007.5555" should be a valid number', () => {
      form.value.$setViewValue('0007.5555')
      scope.$digest()
      expect(scope.value).toEqual('7.5555')
      expect(form.value.$valid).toBe(true)
    })

    it('0.5 should be a invalid number because a min value is 3', () => {
      form.value.$setViewValue(0.5)
      scope.$digest()
      expect(scope.value).toEqual('0.5')
      expect(form.value.$valid).toBe(false)
    })

    it('-9 should be a invalid number because a min value is 3', () => {
      form.value.$setViewValue(-9)
      scope.$digest()
      expect(scope.value).toEqual('-9')
      expect(form.value.$valid).toBe(false)
    })

    it('--9 should be a invalid number', () => {
      form.value.$setViewValue('--9')
      scope.$digest()
      expect(scope.value).toEqual('NaN')
      expect(form.value.$valid).toBe(false)
    })

    it('0.5.8 should be a invalid number', () => {
      form.value.$setViewValue('0.5.8')
      scope.$digest()
      expect(scope.value).toEqual('NaN')
      expect(form.value.$valid).toBe(false)
    })
  })
})()
