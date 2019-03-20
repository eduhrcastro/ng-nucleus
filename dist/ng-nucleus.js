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
  angular.module('ngNucleus').directive('uiScientificNotation', [function () {
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

          return angular.isDefined(value) && value !== '' && !isNaN(value);
        };

        var format = function format(value) {
          if (value === '') {
            return value;
          }

          return Number(value).toString();
        };

        ngModelCtrl.$formatters.push(function (value) {
          if (ngModelCtrl.$isEmpty(value)) {
            return value;
          }

          var cleanValue = clearValue(value);
          return format(cleanValue);
        });
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

        ngModelCtrl.$formatters.push(function (value) {
          if (ngModelCtrl.$isEmpty(value)) {
            return value;
          }

          var cleanValue = clearValue(value.toString());
          return format(cleanValue);
        });
        ngModelCtrl.$parsers.push(function (value) {
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
"use strict";

(function () {
  angular.module('ngNucleus').factory('Validations', [function () {
    return {
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

exports.ngNucleus = exports.default;
}));
