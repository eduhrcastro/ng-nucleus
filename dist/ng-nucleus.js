(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['exports', 'angular', 'moment', 'validator', 'BrV'], function (exports, angular, moment, validator, BrV) {
            factory((root.ngNucleus = exports), angular, moment, validator, BrV);
        });
    } else if (typeof exports === 'object') {
        factory(exports, require('angular'), require('angular-moment.js'), require('validator.js'), require('br-validations.js'));
    } else {
        factory((root.ngNucleus = {}), root.angular, root.moment, root.validator, root.BrV);
    }
}(this, function (exports, angular, moment, validator, BrV) {
'use strict';

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = angular.module('ngNucleus', []);
'use strict';

(function () {
  angular.module('ngNucleus').factory('Validations', ['moment', 'validator', 'BrV', function (moment, validator, BrV) {
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
        return validator.isURL(value);
      },
      isCpf: function isCpf(value) {
        return BrV.cpf.validate(value);
      },
      isRg: function isRg(value) {
        return value.toString().trim().match(/([0-9])/g) && value.length > 0 && value.length < 16;
      },
      isUf: function isUf(value) {
        var UFs = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];
        return UFs.includes(value);
      },
      isTitulo: function isTitulo(value) {
        value = value.toString().replace(/[^0-9]/g, '').slice(0, 12);
        var uf = value.substr(-4, 2);
        if (value.length < 5 || value.length > 13 || value[1].repeat(value.length) === value || uf < 1 || uf > 28) {
          return false;
        }
        var dv = value.substr(-2);
        var base = 2;
        var sequence = value.substr(0, value.length - 4);
        for (var i = 0; i < 2; i++) {
          var fator = 9;
          var soma = 0;
          for (var j = sequence.length - 1; j > -1; j--) {
            soma += sequence[j] * fator;
            if (fator === base) {
              fator = 10;
            }
            fator--;
          }
          var digit = soma % 11;
          if (digit === 0 && uf < 3) {
            digit = 1;
          } else if (digit === 10) {
            digit = 0;
          }
          if (dv[i] !== digit) {
            return false;
          }
          switch (i) {
            case 0:
              sequence = uf.concat(digit);
              break;
          }
        }
        return true;
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
        return moment(value).isValid();
      },
      isTimer: function isTimer(value) {
        return moment(value, 'HH:mm').isValid();
      },
      isCep: function isCep(value) {
        return value.toString().trim().length === 8;
      },
      isBrPhoneNumber: function isBrPhoneNumber(value) {
        return validator.isMobilePhone(value, ['pt-BR']);
      },
      isEmail: function isEmail(value) {
        return validator.isEmail(value);
      },
      isCnpj: function isCnpj(value) {
        return BrV.cnpj.validate(value);
      },
      isIe: function isIe(value, state) {
        return BrV.ie(state).validate(value);
      },
      isPis: function isPis(value) {
        return BrV.pis.validate(value);
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
'use strict';

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
};

(function () {
  angular.module('ngNucleus').directive('uiTitulo', ['$log', 'Validations', function ($log, Validations) {
    return {
      require: 'ngModel',
      scope: {
        ngModel: '=ngModel'
      },
      link: function link(scope, iElement, iAttrs, ngModelCtrl) {
        var clearValue = function clearValue(rawValue) {
          return rawValue.toString().replace(/[^0-9]/g, '').slice(0, 12);
        };

        var format = function format(cleanValue) {
          return cleanValue.trim().replace(/[^0-9]$/, '');
        };

        var validations = function validations(value) {
          $log.log(value);
          $log.log(Validations.isTitulo(value));
          $log.log(Validations.isBrPhoneNumber('5585996592604'));
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
'use strict';

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

exports.ngNucleus = exports.default;
}));
