(() => {
  angular.module('ngNucleus').factory('Validations', [
    'validator',
    'BrV',
    (
      validator,
      BrV
    ) => {
      const stringDefault = string => {
        string = string.replace(new RegExp('[ÁÀÂÃ]', 'gi'), 'a')
        string = string.replace(new RegExp('[ÉÈÊ]', 'gi'), 'e')
        string = string.replace(new RegExp('[ÍÌÎ]', 'gi'), 'i')
        string = string.replace(new RegExp('[ÓÒÔÕ]', 'gi'), 'o')
        string = string.replace(new RegExp('[ÚÙÛ]', 'gi'), 'u')
        string = string.replace(new RegExp('[Ç]', 'gi'), 'c')
        string = string.replace(new RegExp(' ', 'g'), '_')
        return string
      }

      return {
        isRequired: (array, item) => {
          return array.includes(item)
        },
        isNullOrEmpty: value => {
          return value == null || value === ''
        },
        isName: value => {
          return !value.toString().trim().match(/[^a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-+$]/g)
        },
        isUrl: value => {
          return validator.isURL(value)
        },
        isCpf: value => {
          return BrV.cpf.validate(value)
        },
        isRg: value => {
          return value.toString().trim().match(/([0-9])/g) && value.length > 0 && value.length < 16
        },
        isUf: value => {
          const UFs = [
            'AC',
            'AL',
            'AP',
            'AM',
            'BA',
            'CE',
            'DF',
            'ES',
            'GO',
            'MA',
            'MT',
            'MS',
            'MG',
            'PA',
            'PB',
            'PR',
            'PE',
            'PI',
            'RJ',
            'RN',
            'RS',
            'RO',
            'RR',
            'SC',
            'SP',
            'SE',
            'TO'
          ]
          return UFs.includes(value)
        },
        isTitulo: value => {
          value = value.toString().replace(/[^0-9]/g, '').slice(0, 12)
          let uf = value.substr(-4, 2)
          if ((value.length < 5 || value.length > 13) || (value[1].repeat(value.length) === value) || (uf < 1 || uf > 28)) { return false }
          let dv = value.substr(-2)
          let base = 2
          let sequence = value.substr(0, value.length - 4)
          for (let i = 0; i < 2; i++) {
            let fator = 9
            let soma = 0
            for (let j = sequence.length - 1; j > -1; j--) {
              soma += sequence[j] * fator
              if (fator === base) { fator = 10 }
              fator--
            }
            let digit = soma % 11
            if (digit === 0 && uf < 3) { digit = 1 } else if (digit === 10) { digit = 0 }
            if (dv[i] !== digit) { return false }
            switch (i) {
              case 0:
                sequence = uf.concat(digit)
                break
            }
          }
          return true
        },
        isNumber: value => {
          return !isNaN(value)
        },
        isString: value => {
          return angular.isString(value)
        },
        isGenre: value => {
          const genres = ['masculino', 'feminino']
          return genres.includes(value.toString().trim().toLowerCase())
        },
        isCivilStatus: value => {
          const civilStatus = ['solteiro', 'casado', 'divorciado']
          return civilStatus.includes(value.toString().trim().toLowerCase())
        },
        isInstruction: value => {
          const instructions = [
            'superior',
            'superior_incompleto',
            'ensino_medio',
            'ensino_fundamental'
          ]
          return instructions.includes(stringDefault(value.toString().trim().toLowerCase()))
        },
        isDateOnly: value => {
          return moment(value).isValid()
        },
        isTimer: value => {
          return moment(value, 'HH:mm').isValid()
        },
        isCep: value => {
          return value.toString().trim().length === 8
        },
        isBrPhoneNumber: value => {
          return validator.isMobilePhone(value, ['pt-BR'])
        },
        isEmail: value => {
          return validator.isEmail(value)
        },
        isCnpj: value => {
          return BrV.cnpj.validate(value)
        },
        isIe: (value, state) => {
          return BrV.ie(state).validate(value)
        },
        isPis: value => {
          return BrV.pis.validate(value)
        },
        isBrBoletoBancario: value => {
          return value.length === 47
        },
        isCarPlate: value => {
          return value.toString().trim().length === 7
        },
        isNfeAccessKey: value => {
          return value.length === 44
        },
        isUserType: value => {
          const types = ['admin', 'regular']
          return types.includes(value)
        },
        isBoolean: value => {
          return value === false || value === true || value === 0 || value === 1
        },
        isContactType: value => {
          const types = ['trabalho', 'celular', 'particular', 'outros']
          return types.includes(value)
        },
        isContactKey: value => {
          const types = ['sim', 'nao', 'nenhum']
          return types.includes(value)
        },
        isTypeUnity: value => {
          const types = ['m', 'pc', 'kg']
          return types.includes(value)
        },
        isInscricaoMunicipal: value => {
          const invalidIM = [
            '000000000000000',
            '111111111111111',
            '222222222222222',
            '333333333333333',
            '444444444444444',
            '555555555555555',
            '666666666666666',
            '777777777777777',
            '888888888888888',
            '999999999999999'
          ]
          return !isNaN(value) && !invalidIM.includes(value) && value.toString().length > 0 && value.toString().length < 16
        },
        isWeek: value => {
          const types = ['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom']
          return types.includes(value)
        },
        isShiftCategory: value => {
          const types = ['normal', 'compensado', 'folga']
          return types.includes(value)
        },
        isPosition: value => {
          return true
        }
      }
    }])
})()
