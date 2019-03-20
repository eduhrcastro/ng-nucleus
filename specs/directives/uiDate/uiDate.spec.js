(() => {
  describe('uiDate', () => {
    let scope, form

    beforeEach(module('ngNucleus'))

    beforeEach(inject(($compile, $rootScope) => {
      scope = $rootScope

      let element = angular.element(
        '<form name="form">' +
        '<input type="text" name="value" ng-model="value" parse="false" ui-date-mask="DD/MM/YYYY" ui-date />' +
        '</form>'
      )

      $compile(element)(scope)
      form = scope.form
    }))

    it('11-05-1992 should be a valid date because characteres is replaced by /', () => {
      form.value.$setViewValue('11-05-1992')
      scope.$digest()
      expect(scope.value).toEqual('11/05/1992')
      expect(form.value.$valid).toBe(true)
    })

    it('11#05@1992 should be a valid date because characteres is replaced by /', () => {
      form.value.$setViewValue('11#05@1992')
      scope.$digest()
      expect(scope.value).toEqual('11/05/1992')
      expect(form.value.$valid).toBe(true)
    })

    it('11/05/1992 should be a valid date', () => {
      form.value.$setViewValue('11/05/1992')
      scope.$digest()
      expect(scope.value).toEqual('11/05/1992')
      expect(form.value.$valid).toBe(true)
    })

    it('31/02/2019 should be a valid date', () => {
      form.value.$setViewValue('31/02/2019')
      scope.$digest()
      expect(scope.value).toEqual('Invalid date')
      expect(form.value.$valid).toBe(false)
    })

    it('10/15/2019 should be a valid date', () => {
      form.value.$setViewValue('10/15/2019')
      scope.$digest()
      expect(scope.value).toEqual('Invalid date')
      expect(form.value.$valid).toBe(false)
    })

    it('1553103277 should be a invalid date', () => {
      form.value.$setViewValue(1553103277)
      scope.$digest()
      expect(scope.value).toEqual('Invalid date')
      expect(form.value.$valid).toBe(false)
    })

    it('2019-03-20T17:34:37+0000 should be a invalid date', () => {
      form.value.$setViewValue('2019-03-20T17:34:37+0000')
      scope.$digest()
      expect(scope.value).toEqual('Invalid date')
      expect(form.value.$valid).toBe(false)
    })

    it('abc should be a invalid date', () => {
      form.value.$setViewValue('abc')
      scope.$digest()
      expect(scope.value).toEqual('Invalid date')
      expect(form.value.$valid).toBe(false)
    })
  })
})()
