(() => {
  describe('Validations', () => {
    let Validations

    beforeEach(angular.mock.module('ngNucleus'))

    beforeEach(inject((_Validations_) => {
      Validations = _Validations_
    }))

    it('should exist', () => {
      expect(Validations).toBeDefined()
    })

    describe('isTitulo', () => {
      it('should exist', () => {
        expect(Validations.isTitulo).toBeDefined()
      })

      it('should return false to voters title equals 3', () => {
        expect(Validations.isTitulo(3)).toBe(false)
      })

      it('should return false to voters title equals asdqweasd', () => {
        expect(Validations.isTitulo('asdqweasd')).toBe(false)
      })

      it('should return true to voters title equals 547164680787', () => {
        expect(Validations.isTitulo(547164680787)).toBe(true)
      })

      it('should return false to voters title equals 11321015019122', () => {
        expect(Validations.isTitulo(11321015019122)).toBe(false)
      })
    })
  })
})()
