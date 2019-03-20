(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['exports', 'angular', 'moment', 'validator', 'BrV'], factory);
    } else if (typeof exports === 'object') {
        factory(exports, require('angular'), require('angular-moment'), require('validator'), require('br-validations'));
    } else {
        factory((root.ngNucleus = {}), root.angular, root.moment, root.validator, root.BrV);
    }
}(this, function (exports, angular, moment, validator, BrV) {
"use strict";

function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

if (angular == null) {
  throw new Error('Angularjs cannot be found by ng-nucleus!');
}

if (!angular.isFunction(moment) || angular.isUndefined(moment)) {
  throw new Error('Moment cannot be found by ng-nucleus!');
}

if (!angular.isObject(validator) || angular.isUndefined(validator)) {
  throw new Error('Validator.js cannot be found by ng-nucleus!');
}

if (!angular.isObject(BrV) || angular.isUndefined(BrV)) {
  throw new Error('Br-validations.js cannot be found by ng-nucleus!');
}

var _default = angular.module('ngNucleus', []);

exports.default = _default;
"use strict";

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

(function () {
  angular.module('ngNucleus').directive('uiTitulo', ['Validations', function (Validations) {
    return {
      require: 'ngModel',
      link: function link(scope, iElement, iAttrs, ngModelCtrl) {
        var clearValue = function clearValue(rawValue) {
          return rawValue.toString().replace(/[^0-9]/g, '').slice(0, 12);
        };

        var format = function format(cleanValue) {
          return cleanValue.trim().replace(/[^0-9]$/, '');
        };

        var validations = function validations(value) {
          return Validations.isTitulo(value);
        };

        ngModelCtrl.$formatters.push(function formatter(value) {
          if (ngModelCtrl.$isEmpty(value)) {
            return value;
          }

          var cleanValue = clearValue(value.toString());
          return format(cleanValue);
        });
        ngModelCtrl.$parsers.push(function parser(value) {
          ngModelCtrl.$setValidity('titulo', true);

          if (ngModelCtrl.$isEmpty(value)) {
            ngModelCtrl.$setValidity('titulo', false);
            return value;
          }

          var cleanValue = clearValue(value.toString());
          var formattedValue = format(cleanValue);

          if (!validations(cleanValue)) {
            ngModelCtrl.$setValidity('titulo', false);
          }

          if (ngModelCtrl.$viewValue !== formattedValue) {
            ngModelCtrl.$setViewValue(formattedValue);
            ngModelCtrl.$render();
          }

          if (angular.isUndefined(ngModelCtrl.getModelValue)) {
            return cleanValue;
          }

          var actualModelType = _typeof(ngModelCtrl.$modelValue);

          return ngModelCtrl.getModelValue(formattedValue, actualModelType);
        });
      }
    };
  }]);
})();

"use strict";

(function () {
  angular.module('ngNucleus').directive('uiUpperCase', [function () {
    return {
      require: 'ngModel',
      scope: {
        ngModel: '=ngModel'
      },
      link: function link(scope, iElement, iAttrs, ngModelCtrl) {
        scope.$watch('ngModel', function (value) {
          if (value) {
            scope.ngModel = value.toString().toUpperCase();
          }
        });
      }
    };
  }]);
})();

"use strict";

(function () {
  angular.module('ngNucleus').factory('Validations', ['$window', function ($window) {
    var stringDefault = function stringDefault(string) {
      string = string.replace(new RegExp('[ÁÀÂÃ]', 'gi'), 'a');
      string = string.replace(new RegExp('[ÉÈÊ]', 'gi'), 'e');
      string = string.replace(new RegExp('[ÍÌÎ]', 'gi'), 'i');
      string = string.replace(new RegExp('[ÓÒÔÕ]', 'gi'), 'o');
      string = string.replace(new RegExp('[ÚÙÛ]', 'gi'), 'u');
      string = string.replace(new RegExp('[Ç]', 'gi'), 'c');
      string = string.replace(new RegExp(' ', 'g'), '_');
      return string;
    };

    return {
      isRequired: function isRequired(array, item) {
        return array.includes(item);
      },
      isNullOrEmpty: function isNullOrEmpty(value) {
        return value == null || value === '';
      },
      isName: function isName(value) {
        return !value.toString().trim().match(/[^a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-+$]/g);
      },
      isUrl: function isUrl(value) {
        return $window.validator.isURL(value);
      },
      isCpf: function isCpf(value) {
        return $window.BrV.cpf.validate(value);
      },
      isRg: function isRg(value) {
        return value.toString().trim().match(/([0-9])/g) && value.length > 0 && value.length < 16;
      },
      isUf: function isUf(value) {
        var UFs = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];
        return UFs.includes(value);
      },
      isTitulo: function isTitulo(value) {
        var dig1 = 0;
        var dig2 = 0;
        var tam = value.length;
        var digitos = value.substr(tam - 2, 2);
        var estado = value.substr(tam - 4, 2);
        var titulo = value.substr(0, tam - 2);
        titulo = '000000000000' + titulo;
        titulo = titulo.substr(titulo.length - 11, titulo.length - 1);
        var exce = estado === '01' || estado === '02';
        dig1 = (titulo.charCodeAt(0) - 48) * 2 + (titulo.charCodeAt(1) - 48) * 9 + (titulo.charCodeAt(2) - 48) * 8 + (titulo.charCodeAt(3) - 48) * 7 + (titulo.charCodeAt(4) - 48) * 6 + (titulo.charCodeAt(5) - 48) * 5 + (titulo.charCodeAt(6) - 48) * 4 + (titulo.charCodeAt(7) - 48) * 3 + (titulo.charCodeAt(8) - 48) * 2;
        var resto = dig1 % 11;

        if (resto === 0) {
          if (exce) {
            dig1 = 1;
          } else {
            dig1 = 0;
          }
        } else {
          if (resto === 1) {
            dig1 = 0;
          } else {
            dig1 = 11 - resto;
          }
        }

        dig2 = (titulo.charCodeAt(9) - 48) * 4 + (titulo.charCodeAt(10) - 48) * 3 + dig1 * 2;
        resto = dig2 % 11;

        if (resto === 0) {
          if (exce) {
            dig2 = 1;
          } else {
            dig2 = 0;
          }
        } else {
          if (resto === 1) {
            dig2 = 0;
          } else dig2 = 11 - resto;
        }

        if (digitos.charCodeAt(0) - 48 === dig1 && digitos.charCodeAt(1) - 48 === dig2) {
          return true;
        } else {
          return false;
        }
      },
      isNumber: function isNumber(value) {
        return !isNaN(value);
      },
      isString: function isString(value) {
        return angular.isString(value);
      },
      isGenre: function isGenre(value) {
        var genres = ['masculino', 'feminino'];
        return genres.includes(value.toString().trim().toLowerCase());
      },
      isCivilStatus: function isCivilStatus(value) {
        var civilStatus = ['solteiro', 'casado', 'divorciado'];
        return civilStatus.includes(value.toString().trim().toLowerCase());
      },
      isInstruction: function isInstruction(value) {
        var instructions = ['superior', 'superior_incompleto', 'ensino_medio', 'ensino_fundamental'];
        return instructions.includes(stringDefault(value.toString().trim().toLowerCase()));
      },
      isDateOnly: function isDateOnly(value) {
        return $window.moment(value).isValid();
      },
      isTimer: function isTimer(value) {
        return $window.moment(value, 'HH:mm').isValid();
      },
      isCep: function isCep(value) {
        return value.toString().trim().length === 8;
      },
      isBrPhoneNumber: function isBrPhoneNumber(value) {
        return $window.validator.isMobilePhone(value, ['pt-BR']);
      },
      isEmail: function isEmail(value) {
        return $window.validator.isEmail(value);
      },
      isCnpj: function isCnpj(value) {
        return $window.BrV.cnpj.validate(value);
      },
      isIe: function isIe(value, state) {
        return $window.BrV.ie(state).validate(value);
      },
      isPis: function isPis(value) {
        return $window.BrV.pis.validate(value);
      },
      isBrBoletoBancario: function isBrBoletoBancario(value) {
        return value.length === 47;
      },
      isCarPlate: function isCarPlate(value) {
        return value.toString().trim().length === 7;
      },
      isNfeAccessKey: function isNfeAccessKey(value) {
        return value.length === 44;
      },
      isUserType: function isUserType(value) {
        var types = ['admin', 'regular'];
        return types.includes(value);
      },
      isBoolean: function isBoolean(value) {
        return value === false || value === true || value === 0 || value === 1;
      },
      isContactType: function isContactType(value) {
        var types = ['trabalho', 'celular', 'particular', 'outros'];
        return types.includes(value);
      },
      isContactKey: function isContactKey(value) {
        var types = ['sim', 'nao', 'nenhum'];
        return types.includes(value);
      },
      isTypeUnity: function isTypeUnity(value) {
        var types = ['m', 'pc', 'kg'];
        return types.includes(value);
      },
      isInscricaoMunicipal: function isInscricaoMunicipal(value) {
        var invalidIM = ['000000000000000', '111111111111111', '222222222222222', '333333333333333', '444444444444444', '555555555555555', '666666666666666', '777777777777777', '888888888888888', '999999999999999'];
        return !isNaN(value) && !invalidIM.includes(value) && value.toString().length > 0 && value.toString().length < 16;
      },
      isWeek: function isWeek(value) {
        var types = ['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom'];
        return types.includes(value);
      },
      isShiftCategory: function isShiftCategory(value) {
        var types = ['normal', 'compensado', 'folga'];
        return types.includes(value);
      },
      isPosition: function isPosition(value) {
        return true;
      }
    };
  }]);
})();

exports.ngNucleus = exports.default;
}));
