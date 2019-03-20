(() => {
  angular.module('ngNucleus').factory('Validations', [
    () => {
      return {
        isTitulo: value => {
          value = value.toString()
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
        }
      }
    }])
})()
