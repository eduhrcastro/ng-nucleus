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

    describe('isInscricaoMunicipal', () => {
      it('should exist', () => {
        expect(Validations.isInscricaoMunicipal).toBeDefined()
      })

      it('should return false to municipal registration equals 000000000000000', () => {
        expect(Validations.isInscricaoMunicipal('000000000000000')).toBe(false)
      })

      it('should return false to municipal registration equals 111111111111111', () => {
        expect(Validations.isInscricaoMunicipal('111111111111111')).toBe(false)
      })

      it('should return false to municipal registration equals 222222222222222', () => {
        expect(Validations.isInscricaoMunicipal(222222222222222)).toBe(false)
      })

      it('should return false to municipal registration equals 333333333333333', () => {
        expect(Validations.isInscricaoMunicipal('333333333333333')).toBe(false)
      })

      it('should return false to municipal registration equals 444444444444444', () => {
        expect(Validations.isInscricaoMunicipal('444444444444444')).toBe(false)
      })

      it('should return false to municipal registration equals 555555555555555', () => {
        expect(Validations.isInscricaoMunicipal(555555555555555)).toBe(false)
      })

      it('should return false to municipal registration equals 666666666666666', () => {
        expect(Validations.isInscricaoMunicipal('666666666666666')).toBe(false)
      })

      it('should return false to municipal registration equals 777777777777777', () => {
        expect(Validations.isInscricaoMunicipal('777777777777777')).toBe(false)
      })

      it('should return false to municipal registration equals 888888888888888', () => {
        expect(Validations.isInscricaoMunicipal(888888888888888)).toBe(false)
      })

      it('should return false to municipal registration equals 999999999999999', () => {
        expect(Validations.isInscricaoMunicipal('999999999999999')).toBe(false)
      })

      it('should return false to municipal registration equals 9878971231231239989898908123899', () => {
        expect(Validations.isInscricaoMunicipal(9878971231231239989898908123899)).toBe(false)
      })

      it('should return false to municipal registration equals ""', () => {
        expect(Validations.isInscricaoMunicipal('')).toBe(false)
      })

      it('should return false to municipal registration equals abc', () => {
        expect(Validations.isInscricaoMunicipal('abc')).toBe(false)
      })

      it('should return false to municipal registration equals 234231232434', () => {
        expect(Validations.isInscricaoMunicipal(234231232434)).toBe(true)
      })

      it('should return false to municipal registration equals 3', () => {
        expect(Validations.isInscricaoMunicipal('3')).toBe(true)
      })
    })

    describe('isNumber', () => {
      it('should exist', () => {
        expect(Validations.isNumber).toBeDefined()
      })

      it('should return true to number 4', () => {
        expect(Validations.isNumber(4)).toBe(true)
      })

      it('should return true to number "4"', () => {
        expect(Validations.isNumber('4')).toBe(true)
      })

      it('should return true to number -6', () => {
        expect(Validations.isNumber(-6)).toBe(true)
      })

      it('should return true to number -6', () => {
        expect(Validations.isNumber('-6')).toBe(true)
      })

      it('should return true to number -6.5', () => {
        expect(Validations.isNumber('-6.5')).toBe(true)
      })

      it('should return true to number -6.5', () => {
        expect(Validations.isNumber(-6.5)).toBe(true)
      })

      it('should return true to number 5.6', () => {
        expect(Validations.isNumber(5.6)).toBe(true)
      })

      it('should return false to number 3.29%', () => {
        expect(Validations.isNumber('3.29%')).toBe(false)
      })

      it('should return false to number abc#4', () => {
        expect(Validations.isNumber('abc#4')).toBe(false)
      })

      it('should return false to number 6.3.2', () => {
        expect(Validations.isNumber('6.3.2')).toBe(false)
      })
    })

    describe('isISODateString', () => {
      it('should exist', () => {
        expect(Validations.isISODateString).toBeDefined()
      })

      it('should return true to iso date 2019-03-20T17:31:16.237Z', () => {
        expect(Validations.isISODateString('2019-03-20T17:31:16.237Z')).toBe(true)
      })

      it('should return true to iso date 2019-03-20', () => {
        expect(Validations.isISODateString('2019-03-20')).toBe(false)
      })

      it('should return true to iso date 1553103277', () => {
        expect(Validations.isISODateString('1553103277')).toBe(false)
      })

      it('should return true to iso date 2019-03-20T17:34:37+0000', () => {
        expect(Validations.isISODateString('2019-03-20T17:34:37+0000')).toBe(false)
      })

      it('should return true to iso date Wed, 20 Mar 19 17:34:37 +0000', () => {
        expect(Validations.isISODateString('Wed, 20 Mar 19 17:34:37 +0000')).toBe(false)
      })

      it('should return true to iso date 2019-03-20T17:34:37+00:00', () => {
        expect(Validations.isISODateString('2019-03-20T17:34:37+00:00')).toBe(false)
      })
    })

    describe('isDate', () => {
      it('should exist', () => {
        expect(Validations.isDate).toBeDefined()
      })

      it('should return true to date 2019-03-20T17:31:16.237Z', () => {
        expect(Validations.isDate('2019-03-20T17:31:16.237Z')).toBe(true)
      })

      it('should return true to date 2019-03-20', () => {
        expect(Validations.isDate('2019-03-20')).toBe(true)
      })

      it('should return true to date 20/03/2019', () => {
        expect(Validations.isDate('20/03/2019', 'DD/MM/YYYY')).toBe(true)
      })

      it('should return true to date 2019-03-20', () => {
        expect(Validations.isDate(20190320)).toBe(true)
      })

      it('should return true to date 1553103277', () => {
        expect(Validations.isDate('1553103277')).toBe(false)
      })

      it('should return true to date 2019-03-20T17:34:37+0000', () => {
        expect(Validations.isDate('2019-03-20T17:34:37+0000')).toBe(true)
      })

      it('should return true to date Wed, 20 Mar 19 17:34:37 +0000', () => {
        expect(Validations.isDate('Wed, 20 Mar 19 17:34:37 +0000')).toBe(true)
      })

      it('should return true to date 2019-03-20T17:34:37+00:00', () => {
        expect(Validations.isDate('2019-03-20T17:34:37+00:00')).toBe(true)
      })
    })

    describe('isCpf', () => {
      it('should exist', () => {
        expect(Validations.isCpf).toBeDefined()
      })

      it('should return false to cpf 000.000.000-00', () => {
        expect(Validations.isCpf('000.000.000-00')).toBe(false)
      })

      it('should return false to cpf 00000000000', () => {
        expect(Validations.isCpf('00000000000')).toBe(false)
      })

      it('should return true to cpf 630.880.530-00', () => {
        expect(Validations.isCpf('630.880.530-00')).toBe(true)
      })

      it('should return true to cpf 63088053000', () => {
        expect(Validations.isCpf('63088053000')).toBe(true)
      })

      it('should return false to cpf abc', () => {
        expect(Validations.isCpf('abc')).toBe(false)
      })

      it('should return false to cpf 630880530009', () => {
        expect(Validations.isCpf('630880530009')).toBe(false)
      })
    })
  })
})()
