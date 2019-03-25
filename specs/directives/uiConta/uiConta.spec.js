(() => {
  describe('uiConta', () => {
    let scope, form

    beforeEach(module('ngNucleus'))

    beforeEach(inject(($compile, $rootScope) => {
      scope = $rootScope

      let element = angular.element(
        '<form name="form">' +
        '<input type="text" name="value" ng-model="value" ui-conta />' +
        '</form>'
      )

      $compile(element)(scope)
      form = scope.form
    }))

    it('00000000000000 should be a invalid bank account number', () => {
      form.value.$setViewValue('00000000000000')
      scope.$digest()
      expect(scope.value).toEqual('0000000000000-0')
      expect(form.value.$valid).toBe(false)
    })
    it('0000000000000-0 should be a invalid bank account number', () => {
      form.value.$setViewValue('0000000000000-0')
      scope.$digest()
      expect(scope.value).toEqual('0000000000000-0')
      expect(form.value.$valid).toBe(false)
    })

    it('11111111111111 should be a invalid bank account number', () => {
      form.value.$setViewValue('11111111111111')
      scope.$digest()
      expect(scope.value).toEqual('1111111111111-1')
      expect(form.value.$valid).toBe(false)
    })
    it('1111111111111-1 should be a invalid bank account number', () => {
      form.value.$setViewValue('1111111111111-1')
      scope.$digest()
      expect(scope.value).toEqual('1111111111111-1')
      expect(form.value.$valid).toBe(false)
    })

    it('22222222222222 should be a invalid bank account number', () => {
      form.value.$setViewValue('22222222222222')
      scope.$digest()
      expect(scope.value).toEqual('2222222222222-2')
      expect(form.value.$valid).toBe(false)
    })
    it('2222222222222-2 should be a invalid bank account number', () => {
      form.value.$setViewValue('2222222222222-2')
      scope.$digest()
      expect(scope.value).toEqual('2222222222222-2')
      expect(form.value.$valid).toBe(false)
    })

    it('33333333333333 should be a invalid bank account number', () => {
      form.value.$setViewValue('33333333333333')
      scope.$digest()
      expect(scope.value).toEqual('3333333333333-3')
      expect(form.value.$valid).toBe(false)
    })
    it('3333333333333-3 should be a invalid bank account number', () => {
      form.value.$setViewValue('3333333333333-3')
      scope.$digest()
      expect(scope.value).toEqual('3333333333333-3')
      expect(form.value.$valid).toBe(false)
    })

    it('44444444444444 should be a invalid bank account number', () => {
      form.value.$setViewValue('44444444444444')
      scope.$digest()
      expect(scope.value).toEqual('4444444444444-4')
      expect(form.value.$valid).toBe(false)
    })
    it('4444444444444-4 should be a invalid bank account number', () => {
      form.value.$setViewValue('4444444444444-4')
      scope.$digest()
      expect(scope.value).toEqual('4444444444444-4')
      expect(form.value.$valid).toBe(false)
    })

    it('55555555555555 should be a invalid bank account number', () => {
      form.value.$setViewValue('55555555555555')
      scope.$digest()
      expect(scope.value).toEqual('5555555555555-5')
      expect(form.value.$valid).toBe(false)
    })
    it('5555555555555-5 should be a invalid bank account number', () => {
      form.value.$setViewValue('5555555555555-5')
      scope.$digest()
      expect(scope.value).toEqual('5555555555555-5')
      expect(form.value.$valid).toBe(false)
    })

    it('66666666666666 should be a invalid bank account number', () => {
      form.value.$setViewValue('66666666666666')
      scope.$digest()
      expect(scope.value).toEqual('6666666666666-6')
      expect(form.value.$valid).toBe(false)
    })
    it('6666666666666-6 should be a invalid bank account number', () => {
      form.value.$setViewValue('6666666666666-6')
      scope.$digest()
      expect(scope.value).toEqual('6666666666666-6')
      expect(form.value.$valid).toBe(false)
    })

    it('77777777777777 should be a invalid bank account number', () => {
      form.value.$setViewValue('77777777777777')
      scope.$digest()
      expect(scope.value).toEqual('7777777777777-7')
      expect(form.value.$valid).toBe(false)
    })
    it('7777777777777-7 should be a invalid bank account number', () => {
      form.value.$setViewValue('7777777777777-7')
      scope.$digest()
      expect(scope.value).toEqual('7777777777777-7')
      expect(form.value.$valid).toBe(false)
    })

    it('88888888888888 should be a invalid bank account number', () => {
      form.value.$setViewValue('88888888888888')
      scope.$digest()
      expect(scope.value).toEqual('8888888888888-8')
      expect(form.value.$valid).toBe(false)
    })
    it('8888888888888-8 should be a invalid bank account number', () => {
      form.value.$setViewValue('8888888888888-8')
      scope.$digest()
      expect(scope.value).toEqual('8888888888888-8')
      expect(form.value.$valid).toBe(false)
    })

    it('99999999999999 should be a invalid bank account number', () => {
      form.value.$setViewValue('99999999999999')
      scope.$digest()
      expect(scope.value).toEqual('9999999999999-9')
      expect(form.value.$valid).toBe(false)
    })
    it('9999999999999-9 should be a invalid bank account number', () => {
      form.value.$setViewValue('9999999999999-9')
      scope.$digest()
      expect(scope.value).toEqual('9999999999999-9')
      expect(form.value.$valid).toBe(false)
    })

    it('1174451-0 should be a valid bank account number', () => {
      form.value.$setViewValue('1174451-0')
      scope.$digest()
      expect(scope.value).toEqual('1174451-0')
      expect(form.value.$valid).toBe(true)
    })

    it('6134576592-4 should be a valid bank account number', () => {
      form.value.$setViewValue('6134576592-4')
      scope.$digest()
      expect(scope.value).toEqual('6134576592-4')
      expect(form.value.$valid).toBe(true)
    })

    it('0321410-9 should be a valid bank account number', () => {
      form.value.$setViewValue('0321410-9')
      scope.$digest()
      expect(scope.value).toEqual('0321410-9')
      expect(form.value.$valid).toBe(true)
    })

    it('53839-6 should be a valid bank account number', () => {
      form.value.$setViewValue('53839-6')
      scope.$digest()
      expect(scope.value).toEqual('53839-6')
      expect(form.value.$valid).toBe(true)
    })
  })
})()
