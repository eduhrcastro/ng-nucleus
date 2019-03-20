(() => {
  angular.module('ngNucleus').factory('Validations', [
    '$window',
    (
      $window
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
          return $window.validator.isURL(value)
        },
        isCpf: value => {
          return $window.BrV.cpf.validate(value)
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
          let dig1 = 0
          let dig2 = 0
          let tam = value.length
          let digitos = value.substr(tam - 2, 2)
          let estado = value.substr(tam - 4, 2)
          let titulo = value.substr(0, tam - 2)
          titulo = '000000000000' + titulo
          titulo = titulo.substr(titulo.length - 11, titulo.length - 1)
          let exce = (estado === '01') || (estado === '02')
          dig1 = (titulo.charCodeAt(0) - 48) * 2 + (titulo.charCodeAt(1) - 48) * 9 + (titulo.charCodeAt(2) - 48) * 8 + (titulo.charCodeAt(3) - 48) * 7 + (titulo.charCodeAt(4) - 48) * 6 + (titulo.charCodeAt(5) - 48) * 5 + (titulo.charCodeAt(6) - 48) * 4 + (titulo.charCodeAt(7) - 48) * 3 + (titulo.charCodeAt(8) - 48) * 2; let resto = (dig1 % 11)
          if (resto === 0) {
            if (exce) {
              dig1 = 1
            } else {
              dig1 = 0
            }
          } else {
            if (resto === 1) {
              dig1 = 0
            } else {
              dig1 = 11 - resto
            }
          }
          dig2 = (titulo.charCodeAt(9) - 48) * 4 + (titulo.charCodeAt(10) - 48) * 3 + dig1 * 2
          resto = (dig2 % 11)
          if (resto === 0) {
            if (exce) { dig2 = 1 } else { dig2 = 0 }
          } else {
            if (resto === 1) { dig2 = 0 } else dig2 = 11 - resto
          }
          if ((digitos.charCodeAt(0) - 48 === dig1) && (digitos.charCodeAt(1) - 48 === dig2)) {
            return true
          } else {
            return false
          }
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
          return $window.moment(value).isValid()
        },
        isTimer: value => {
          return $window.moment(value, 'HH:mm').isValid()
        },
        isCep: value => {
          return value.toString().trim().length === 8
        },
        isBrPhoneNumber: value => {
          return $window.validator.isMobilePhone(value, ['pt-BR'])
        },
        isEmail: value => {
          return $window.validator.isEmail(value)
        },
        isCnpj: value => {
          return $window.BrV.cnpj.validate(value)
        },
        isIe: (value, state) => {
          return $window.BrV.ie(state).validate(value)
        },
        isPis: value => {
          return $window.BrV.pis.validate(value)
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
