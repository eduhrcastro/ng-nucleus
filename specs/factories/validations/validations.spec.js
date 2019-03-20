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

    describe('isPis', () => {
      it('should exist', () => {
        expect(Validations.isPis).toBeDefined()
      })

      it('should return false to pis equals 000.0000.000-0', () => {
        expect(Validations.isPis('000.0000.000-0')).toBe(false)
      })

      it('should return false to pis equals 00000000000', () => {
        expect(Validations.isPis('00000000000')).toBe(false)
      })

      it('should return false to pis equals 3', () => {
        expect(Validations.isPis('3')).toBe(false)
      })

      it('should return true to pis equals 120.3781.086-7', () => {
        expect(Validations.isPis('120.3781.086-7')).toBe(true)
      })

      it('should return true to pis equals 12037810867', () => {
        expect(Validations.isPis(12037810867)).toBe(true)
      })
    })
  })
})()
