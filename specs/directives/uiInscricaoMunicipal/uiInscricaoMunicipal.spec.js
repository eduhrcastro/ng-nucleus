(() => {
  describe('uiInscricaoMunicipal', () => {
    let scope, form

    beforeEach(module('ngNucleus'))

    beforeEach(inject(($compile, $rootScope) => {
      scope = $rootScope

      let element = angular.element(
        '<form name="form">' +
        '<input type="text" name="value" ng-model="value" ui-inscricao-municipal />' +
        '</form>'
      )

      $compile(element)(scope)
      form = scope.form
    }))

    it('00000000000 should be a invalid municipal registration number', () => {
      form.value.$setViewValue('00000000000')
      scope.$digest()
      expect(scope.value).toEqual('0')
      expect(form.value.$valid).toBe(false)
    })

    it('111111111111111 should be a invalid municipal registration number', () => {
      form.value.$setViewValue('111111111111111')
      scope.$digest()
      expect(scope.value).toEqual('111111111111111')
      expect(form.value.$valid).toBe(false)
    })

    it('222222222222222 should be a invalid municipal registration number', () => {
      form.value.$setViewValue('222222222222222')
      scope.$digest()
      expect(scope.value).toEqual('222222222222222')
      expect(form.value.$valid).toBe(false)
    })

    it('333333333333333 should be a invalid municipal registration number', () => {
      form.value.$setViewValue('333333333333333')
      scope.$digest()
      expect(scope.value).toEqual('333333333333333')
      expect(form.value.$valid).toBe(false)
    })

    it('444444444444444 should be a invalid municipal registration number', () => {
      form.value.$setViewValue('444444444444444')
      scope.$digest()
      expect(scope.value).toEqual('444444444444444')
      expect(form.value.$valid).toBe(false)
    })

    it('555555555555555 should be a invalid municipal registration number', () => {
      form.value.$setViewValue('555555555555555')
      scope.$digest()
      expect(scope.value).toEqual('555555555555555')
      expect(form.value.$valid).toBe(false)
    })

    it('666666666666666 should be a invalid municipal registration number', () => {
      form.value.$setViewValue('666666666666666')
      scope.$digest()
      expect(scope.value).toEqual('666666666666666')
      expect(form.value.$valid).toBe(false)
    })

    it('777777777777777 should be a invalid municipal registration number', () => {
      form.value.$setViewValue('777777777777777')
      scope.$digest()
      expect(scope.value).toEqual('777777777777777')
      expect(form.value.$valid).toBe(false)
    })

    it('888888888888888 should be a invalid municipal registration number', () => {
      form.value.$setViewValue(888888888888888)
      scope.$digest()
      expect(scope.value).toEqual('888888888888888')
      expect(form.value.$valid).toBe(false)
    })

    it('999999999999999 should be a invalid municipal registration number', () => {
      form.value.$setViewValue('999999999999999')
      scope.$digest()
      expect(scope.value).toEqual('999999999999999')
      expect(form.value.$valid).toBe(false)
    })

    it('9878971231231239989898908123899 should be a valid slice(0, 15) municipal registration number', () => {
      form.value.$setViewValue(9878971231231239989898908123899)
      scope.$digest()
      expect(scope.value).toEqual('987897123123124')
      expect(form.value.$valid).toBe(true)
    })

    it('3 should be a invalid municipal registration number', () => {
      form.value.$setViewValue(3)
      scope.$digest()
      expect(scope.value).toEqual('3')
      expect(form.value.$valid).toBe(true)
    })
  })
})()
