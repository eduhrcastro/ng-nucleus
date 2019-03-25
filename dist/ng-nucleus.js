(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['exports', 'angular', 'moment', 'validator', 'BrV', 'StringMask'], factory);
    } else if (typeof exports === 'object') {
        factory(exports, require('angular'), require('angular-moment'), require('validator'), require('br-validations'), require('string-mask'));
    } else {
        factory((root.ngNucleus = {}), root.angular, root.moment, root.validator, root.BrV, root.StringMask);
    }
}(this, function (exports, angular, moment, validator, BrV, StringMask) {
"use strict";

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

if (!angular.isFunction(StringMask) || angular.isUndefined(StringMask)) {
  throw new Error('StringMask cannot be found by ng-nucleus!');
}

var _default = angular.module('ngNucleus', []);

exports.default = _default;
"use strict";

(function () {
  angular.module('ngNucleus').factory('Validations', ['$window', function ($window) {
    return {
      isCnpj: function isCnpj(value) {
        return $window.BrV.cnpj.validate(value.toString());
      },
      isCpf: function isCpf(value) {
        return $window.BrV.cpf.validate(value.toString());
      },
      isDate: function isDate(value, dateFormat) {
        if (angular.isUndefined(dateFormat) || dateFormat === '') {
          return moment(value).isValid();
        }

        return moment(value, dateFormat).isValid() && value.length === dateFormat.length;
      },
      isISODateString: function isISODateString(value) {
        return /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{3}([-+][0-9]{2}:[0-9]{2}|Z)$/.test(value.toString());
      },
      isNumber: function isNumber(value) {
        return !isNaN(value);
      },
      isInscricaoMunicipal: function isInscricaoMunicipal(value) {
        var invalidIM = ['0', '000000000000000', '111111111111111', '222222222222222', '333333333333333', '444444444444444', '555555555555555', '666666666666666', '777777777777777', '888888888888888', '999999999999999'];
        return !isNaN(value) && !invalidIM.includes(value.toString()) && value.toString().length > 0 && value.toString().length < 16;
      },
      isPis: function isPis(value) {
        return value.toString().length > 10 && value.toString().length < 15 && $window.BrV.pis.validate(value.toString());
      },
      isTitulo: function isTitulo(value) {
        value = value.toString();
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
      }
    };
  }]);
})();
"use strict";

(function () {
  angular.module('ngNucleus').directive('uiCnpj', ['$window', 'Validations', function ($window, Validations) {
    return {
      require: 'ngModel',
      link: function link(scope, iElement, iAttrs, ngModelCtrl) {
        var clearValue = function clearValue(rawValue) {
          return rawValue.replace(/[^\d]/g, '').slice(0, 14);
        };

        var format = function format(cleanValue) {
          return ($window.StringMask.apply(cleanValue, '00.000.000/0000-00') || '').trim();
        };

        var validations = function validations(value) {
          return angular.isDefined(value) && Validations.isCnpj(value);
        };

        ngModelCtrl.$parsers.push(function parser(value) {
          ngModelCtrl.$setValidity('cnpj', true);

          if (ngModelCtrl.$isEmpty(value)) {
            ngModelCtrl.$setValidity('cnpj', false);
            return value;
          }

          var cleanValue = clearValue(value);
          var formattedValue = format(cleanValue);

          if (!validations(cleanValue)) {
            ngModelCtrl.$setValidity('cnpj', false);
          }

          if (ngModelCtrl.$viewValue !== formattedValue) {
            ngModelCtrl.$setViewValue(formattedValue);
            ngModelCtrl.$render();
          }

          if (angular.isUndefined(ngModelCtrl.$viewValue)) {
            return cleanValue;
          }

          return formattedValue;
        });
      }
    };
  }]);
})();
"use strict";

(function () {
  angular.module('ngNucleus').directive('uiCodeNumber', [function () {
    return {
      require: 'ngModel',
      link: function link(scope, iElement, iAttrs, ngModelCtrl) {
        ngModelCtrl.$parsers.push(function (value) {
          ngModelCtrl.$setValidity('code', true);
          var input = value.toString().replace(/[^0-9]/g, '').slice(0, 4);

          if (input.length !== 4 || isNaN(input)) {
            ngModelCtrl.$setValidity('code', false);
          }

          if (input !== value.toString()) {
            ngModelCtrl.$setViewValue(input);
            ngModelCtrl.$render();
          }

          return input.toString();
        });
      }
    };
  }]);
})();
"use strict";

(function () {
  angular.module('ngNucleus').directive('uiCommonName', [function () {
    return {
      require: 'ngModel',
      link: function link(scope, iElement, iAttrs, ngModelCtrl) {
        ngModelCtrl.$parsers.push(function (value) {
          return value.toString().replace(/(?:^|\s)\S/g, function (a) {
            return a.toUpperCase();
          });
        });
      }
    };
  }]);
})();
"use strict";

(function () {
  angular.module('ngNucleus').directive('uiConta', ['$window', function ($window) {
    return {
      require: 'ngModel',
      link: function link(scope, iElement, iAttrs, ngModelCtrl) {
        var invalidAccount = ['00000000000000', '11111111111111', '22222222222222', '33333333333333', '44444444444444', '55555555555555', '66666666666666', '77777777777777', '88888888888888', '99999999999999'];

        var currentMask = function currentMask(length) {
          var mask = '';

          for (var i = 0; i < length; i++) {
            if (i + 1 === length - 1) {
              mask += '0-';
            } else {
              mask += '0';
            }
          }

          return mask;
        };

        var clearValue = function clearValue(rawValue) {
          return rawValue.toString().replace(/[^0-9]/g, '').slice(0, 14);
        };

        var format = function format(cleanValue) {
          var formattedValue = $window.StringMask.apply(cleanValue, currentMask(cleanValue.length));
          return formattedValue.trim();
        };

        var validations = function validations(value) {
          return value && !invalidAccount.includes(value);
        };

        ngModelCtrl.$parsers.push(function parser(value) {
          ngModelCtrl.$setValidity('conta', true);

          if (ngModelCtrl.$isEmpty(value)) {
            ngModelCtrl.$setValidity('conta', false);
            return value;
          }

          var cleanValue = clearValue(value);
          var formattedValue = format(cleanValue);

          if (!validations(cleanValue)) {
            ngModelCtrl.$setValidity('conta', false);
          }

          if (ngModelCtrl.$viewValue !== formattedValue) {
            ngModelCtrl.$setViewValue(formattedValue);
            ngModelCtrl.$render();
          }

          if (angular.isUndefined(ngModelCtrl.$viewValue)) {
            return cleanValue;
          }

          return formattedValue;
        });
      }
    };
  }]);
})();
"use strict";

(function () {
  angular.module('ngNucleus').directive('uiCpf', ['$window', 'Validations', function ($window, Validations) {
    return {
      require: 'ngModel',
      link: function link(scope, iElement, iAttrs, ngModelCtrl) {
        var clearValue = function clearValue(rawValue) {
          return rawValue.toString().replace(/[^\d]/g, '').slice(0, 11);
        };

        var format = function format(cleanValue) {
          return ($window.StringMask.apply(cleanValue, '000.000.000-00') || '').trim();
        };

        var validations = function validations(value) {
          return angular.isDefined(value) && Validations.isCpf(value);
        };

        ngModelCtrl.$parsers.push(function (value) {
          ngModelCtrl.$setValidity('cpf', true);

          if (ngModelCtrl.$isEmpty(value)) {
            ngModelCtrl.$setValidity('cpf', false);
            return value;
          }

          var cleanValue = clearValue(value);
          var formattedValue = format(cleanValue);

          if (!validations(cleanValue)) {
            ngModelCtrl.$setValidity('cpf', false);
          }

          if (ngModelCtrl.$viewValue !== formattedValue) {
            ngModelCtrl.$setViewValue(formattedValue);
            ngModelCtrl.$render();
          }

          if (angular.isUndefined(ngModelCtrl.$viewValue)) {
            return cleanValue;
          }

          return formattedValue;
        });
      }
    };
  }]);
})();
"use strict";

(function () {
  angular.module('ngNucleus').directive('uiDate', ['$locale', 'Validations', function ($locale, Validations) {
    return {
      require: 'ngModel',
      link: function link(scope, iElement, iAttrs, ngModelCtrl) {
        var dateFormatMapByLocale = {
          'pt-br': 'DD/MM/YYYY',
          'es-ar': 'DD/MM/YYYY',
          'es-mx': 'DD/MM/YYYY',
          'es': 'DD/MM/YYYY',
          'en-us': 'MM/DD/YYYY',
          'en': 'MM/DD/YYYY',
          'fr-fr': 'DD/MM/YYYY',
          'fr': 'DD/MM/YYYY',
          'ru': 'DD.MM.YYYY'
        };
        var dateFormat = dateFormatMapByLocale[$locale.id] || 'YYYY-MM-DD';
        iAttrs.parse = iAttrs.parse || 'true';
        dateFormat = iAttrs.uiDateMask || dateFormat;

        var clearValue = function clearValue(rawValue) {
          if (angular.isObject(rawValue) || Validations.isISODateString(rawValue)) {
            return moment(rawValue).format(dateFormat);
          }

          rawValue = rawValue.toString().replace(/[^0-9]/g, '').trim();
          return moment(rawValue, dateFormat.replace('/', '')).format(dateFormat);
        };

        var validations = function validations(value) {
          return !ngModelCtrl.$isEmpty(value) && Validations.isDate(value, dateFormat);
        };

        ngModelCtrl.$parsers.push(function (value) {
          ngModelCtrl.$setValidity('date', true);

          if (ngModelCtrl.$isEmpty(value)) {
            ngModelCtrl.$setValidity('date', false);
            return value;
          }

          var formattedValue = clearValue(value);

          if (!validations(formattedValue)) {
            ngModelCtrl.$setValidity('date', false);
          }

          if (ngModelCtrl.$viewValue !== formattedValue) {
            ngModelCtrl.$setViewValue(formattedValue);
            ngModelCtrl.$render();
          }

          if (angular.isUndefined(ngModelCtrl.$viewValue)) {
            return formattedValue;
          }

          return iAttrs.parse === 'false' ? formattedValue : moment(formattedValue).format(dateFormat);
        });
      }
    };
  }]);
})();
"use strict";

(function () {
  angular.module('ngNucleus').directive('uiFinance', ['$locale', 'Validations', function ($locale, Validations) {
    return {
      require: 'ngModel',
      link: function link(scope, iElement, iAttrs, ngModelCtrl) {
        var decimalDelimiter = $locale.NUMBER_FORMATS.DECIMAL_SEP;
        var thousandsDelimiter = $locale.NUMBER_FORMATS.GROUP_SEP;
        var currencySym = $locale.NUMBER_FORMATS.CURRENCY_SYM + ' ';

        var clearValue = function clearValue(rawValue) {
          rawValue = rawValue.toString().replace(/[^0-9.,]/g, '');
          var integer = rawValue.substr(0, rawValue.indexOf(decimalDelimiter));
          integer = integer.toString().replace(/[^0-9]/g, '');
          var floating = rawValue.substr(rawValue.indexOf(decimalDelimiter) - rawValue.length);
          var cleanValue = integer + floating;
          var number = cleanValue.toString().replace(decimalDelimiter, thousandsDelimiter);

          if (ngModelCtrl.$isEmpty(number)) {
            return number;
          }

          return Number(number).toString();
        };

        var format = function format(cleanValue) {
          if (ngModelCtrl.$isEmpty(cleanValue)) {
            return cleanValue;
          }

          if (cleanValue.split(thousandsDelimiter).length - 1 === 1) {
            cleanValue = cleanValue.toString().replace(thousandsDelimiter, decimalDelimiter);
          }

          var integer = cleanValue.substr(0, cleanValue.indexOf(decimalDelimiter));
          integer = integer.toString().replace(/\B(?=(\d{3})+(?!\d))/g, thousandsDelimiter);
          var floating = cleanValue.substr(cleanValue.indexOf(decimalDelimiter) - cleanValue.length);

          if (angular.isDefined(iAttrs.decimals) && parseInt(iAttrs.decimals) > 0) {
            floating = floating.substr(0, parseInt(iAttrs.decimals) + 1);
          }

          if (angular.isDefined(iAttrs.currency) && (iAttrs.currency === true || iAttrs.currency)) {
            return currencySym + integer + floating;
          }

          return integer + floating;
        };

        var validations = function validations(value) {
          return angular.isDefined(value) && value !== '' && Validations.isNumber(value);
        };

        ngModelCtrl.$parsers.push(function (value) {
          ngModelCtrl.$setValidity('finance', true);

          if (ngModelCtrl.$isEmpty(value)) {
            ngModelCtrl.$setValidity('finance', false);
            return value;
          }

          var cleanValue = clearValue(value);
          var formattedValue = format(cleanValue);

          if (!validations(cleanValue)) {
            ngModelCtrl.$setValidity('finance', false);
          }

          if (ngModelCtrl.$viewValue !== formattedValue) {
            ngModelCtrl.$setViewValue(formattedValue);
            ngModelCtrl.$render();
          }

          if (angular.isUndefined(ngModelCtrl.$viewValue)) {
            return cleanValue;
          }

          return formattedValue;
        });
      }
    };
  }]);
})();
"use strict";

(function () {
  angular.module('ngNucleus').directive('uiInscricaoMunicipal', ['Validations', function (Validations) {
    return {
      require: 'ngModel',
      link: function link(scope, iElement, iAttrs, ngModelCtrl) {
        var clearValue = function clearValue(rawValue) {
          return Number(rawValue.toString().replace(/[^0-9]/g, '').slice(0, 15)).toString();
        };

        var format = function format(cleanValue) {
          return cleanValue.trim();
        };

        var validations = function validations(value) {
          return Validations.isInscricaoMunicipal(value);
        };

        ngModelCtrl.$parsers.push(function (value) {
          ngModelCtrl.$setValidity('inscricaoMunicipal', true);

          if (ngModelCtrl.$isEmpty(value)) {
            ngModelCtrl.$setValidity('inscricaoMunicipal', false);
            return value;
          }

          var cleanValue = clearValue(value);
          var formattedValue = format(cleanValue);

          if (!validations(cleanValue)) {
            ngModelCtrl.$setValidity('inscricaoMunicipal', false);
          }

          if (ngModelCtrl.$viewValue !== formattedValue) {
            ngModelCtrl.$setViewValue(formattedValue);
            ngModelCtrl.$render();
          }

          if (angular.isUndefined(ngModelCtrl.$viewValue)) {
            return cleanValue;
          }

          return formattedValue;
        });
      }
    };
  }]);
})();
"use strict";

(function () {
  angular.module('ngNucleus').directive('uiNumberIntegerOnly', [function () {
    return {
      require: 'ngModel',
      link: function link(scope, iElement, iAttrs, ngModelCtrl) {
        ngModelCtrl.$parsers.push(function (value) {
          ngModelCtrl.$setValidity('min', true);
          ngModelCtrl.$setValidity('max', true);
          ngModelCtrl.$setValidity('integer', true);
          var input = value.toString().replace(/[^0-9.-]/g, '');

          if (!Number.isInteger(Number(input))) {
            ngModelCtrl.$setValidity('integer', false);
          } else {
            input = input.replace('.', '');
          }

          if (angular.isDefined(iAttrs.numberMin) && parseInt(input) < parseInt(iAttrs.numberMin)) {
            ngModelCtrl.$setValidity('min', false);
          } else if (angular.isDefined(iAttrs.numberMax) && parseInt(input) > parseInt(iAttrs.numberMax)) {
            ngModelCtrl.$setValidity('max', false);
          }

          if (input !== value.toString()) {
            ngModelCtrl.$setViewValue(input);
            ngModelCtrl.$render();
          }

          return Math.trunc(Number(input));
        });
      }
    };
  }]);
})();
"use strict";

(function () {
  angular.module('ngNucleus').directive('uiPis', ['Validations', '$window', function (Validations, $window) {
    return {
      require: 'ngModel',
      link: function link(scope, iElement, iAttrs, ngModelCtrl) {
        var clearValue = function clearValue(rawValue) {
          return rawValue.toString().replace(/[^0-9]/g, '').slice(0, 11);
        };

        var format = function format(cleanValue) {
          var formattedValue = $window.StringMask.apply(cleanValue, '000.0000.000-0');
          return formattedValue.trim();
        };

        var validations = function validations(value) {
          return Validations.isPis(value);
        };

        ngModelCtrl.$parsers.push(function (value) {
          ngModelCtrl.$setValidity('pis', true);

          if (ngModelCtrl.$isEmpty(value)) {
            ngModelCtrl.$setValidity('pis', false);
            return value;
          }

          var cleanValue = clearValue(value);
          var formattedValue = format(cleanValue);

          if (!validations(cleanValue)) {
            ngModelCtrl.$setValidity('pis', false);
          }

          if (ngModelCtrl.$viewValue !== formattedValue) {
            ngModelCtrl.$setViewValue(formattedValue);
            ngModelCtrl.$render();
          }

          if (angular.isUndefined(ngModelCtrl.$viewValue)) {
            return cleanValue;
          }

          return formattedValue;
        });
      }
    };
  }]);
})();
"use strict";

(function () {
  angular.module('ngNucleus').directive('uiScientificNotation', ['Validations', function (Validations) {
    return {
      require: 'ngModel',
      link: function link(scope, iElement, iAttrs, ngModelCtrl) {
        var clearValue = function clearValue(rawValue) {
          return rawValue.toString().replace(/[^0-9.-]/g, '');
        };

        var validations = function validations(value) {
          if (angular.isDefined(iAttrs.min) && parseFloat(value) < parseFloat(iAttrs.min)) {
            return false;
          } else if (angular.isDefined(iAttrs.max) && parseFloat(value) > parseFloat(iAttrs.max)) {
            return false;
          }

          return angular.isDefined(value) && value !== '' && Validations.isNumber(value);
        };

        var format = function format(value) {
          if (ngModelCtrl.$isEmpty(value)) {
            return value;
          }

          return Number(value).toString();
        };

        ngModelCtrl.$parsers.push(function (value) {
          ngModelCtrl.$setValidity('notation', true);

          if (ngModelCtrl.$isEmpty(value)) {
            ngModelCtrl.$setValidity('notation', false);
            return value;
          }

          var cleanValue = clearValue(value);
          var formattedValue = format(cleanValue);

          if (!validations(cleanValue)) {
            ngModelCtrl.$setValidity('notation', false);
          }

          if (ngModelCtrl.$viewValue !== formattedValue) {
            ngModelCtrl.$setViewValue(formattedValue);
            ngModelCtrl.$render();
          }

          if (angular.isUndefined(ngModelCtrl.$viewValue)) {
            return cleanValue;
          }

          return formattedValue;
        });
      }
    };
  }]);
})();
"use strict";

(function () {
  angular.module('ngNucleus').directive('uiStringOnlyMask', [function () {
    return {
      require: 'ngModel',
      link: function link(scope, iElement, iAttrs, ngModelCtrl) {
        ngModelCtrl.$parsers.push(function (value) {
          var input = value.toString().replace(/[^a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-+$]/g, '');

          if (input !== value.toString()) {
            ngModelCtrl.$setViewValue(input);
            ngModelCtrl.$render();
          }

          return String(input);
        });
      }
    };
  }]);
})();
"use strict";

(function () {
  angular.module('ngNucleus').directive('uiTitulo', ['Validations', function (Validations) {
    return {
      require: 'ngModel',
      link: function link(scope, iElement, iAttrs, ngModelCtrl) {
        var clearValue = function clearValue(rawValue) {
          return rawValue.toString().replace(/[^0-9]/g, '').slice(0, 12);
        };

        var format = function format(cleanValue) {
          return cleanValue.trim();
        };

        var validations = function validations(value) {
          return Validations.isTitulo(value);
        };

        ngModelCtrl.$parsers.push(function (value) {
          ngModelCtrl.$setValidity('titulo', true);

          if (ngModelCtrl.$isEmpty(value)) {
            ngModelCtrl.$setValidity('titulo', false);
            return value;
          }

          var cleanValue = clearValue(value);
          var formattedValue = format(cleanValue);

          if (!validations(cleanValue)) {
            ngModelCtrl.$setValidity('titulo', false);
          }

          if (ngModelCtrl.$viewValue !== formattedValue) {
            ngModelCtrl.$setViewValue(formattedValue);
            ngModelCtrl.$render();
          }

          if (angular.isUndefined(ngModelCtrl.$viewValue)) {
            return cleanValue;
          }

          return formattedValue;
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
      link: function link(scope, iElement, iAttrs, ngModelCtrl) {
        ngModelCtrl.$parsers.push(function (value) {
          return value.toString().toUpperCase();
        });
      }
    };
  }]);
})();

exports.ngNucleus = exports.default;
}));
