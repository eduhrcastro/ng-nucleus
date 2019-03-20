(() => {
  describe('uiTitulo', () => {
    let scope, form

    beforeEach(module('ngNucleus'))

    beforeEach(inject(($compile, $rootScope) => {
      scope = $rootScope

      let element = angular.element(
        '<form name="form">' +
        '<input type="text" name="title" ng-model="value" ui-titulo />' +
        '</form>'
      )

      $compile(element)(scope)
      form = scope.form
    }))

    it('3 should be a invalid voters title', () => {
      form.title.$setViewValue('3')
      scope.$digest()
      expect(scope.value).toEqual('3')
      expect(form.title.$valid).toBe(false)
    })

    it('asdqweasd should be a empty and invalid voters title', () => {
      form.title.$setViewValue('asdqweasd')
      scope.$digest()
      expect(scope.value).toEqual('')
      expect(form.title.$valid).toBe(false)
    })

    it('547164680787 should be a valid voters title', () => {
      form.title.$setViewValue('547164680787')
      scope.$digest()
      expect(scope.value).toEqual('547164680787')
      expect(form.title.$valid).toBe(true)
    })

    it('11321015019122 should be max length 12, equals to 113210150191 and a valid voters title', () => {
      form.title.$setViewValue('11321015019122')
      scope.$digest()
      expect(scope.value).toEqual('113210150191')
      expect(scope.value.length).toEqual(12)
      expect(scope.value.length).not.toEqual(14)
      expect(form.title.$valid).toBe(true)
    })
  })
})()
