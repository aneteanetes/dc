"use strict";
exports.__esModule = true;
var DeepClonable = (function () {
    function DeepClonable() {
    }
    DeepClonable.prototype.clone = function (target) {
        return clone(this, target);
    };
    return DeepClonable;
}());
exports.DeepClonable = DeepClonable;
function clone(source, target) {
    if (!target)
        target = {};
    var _props = dcUtility.props(source).filter(function (x) { return dcUtility.notCore(x); });
    _props.forEach(function (key) {
        if (typeof source[key] === 'function') {
            target[key] = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                source[key].apply(target, args);
            };
        }
        else
            target[key] = source[key];
    });
    return target;
}
exports.clone = clone;
var dcUtility;
(function (dcUtility) {
    function notCore(key) {
        return ["constructor",
            "clone",
            "__defineGetter__",
            "__defineSetter__",
            "hasOwnProperty",
            "__lookupGetter__",
            "__lookupSetter__",
            "propertyIsEnumerable",
            "__proto__",
            "toString",
            "toLocaleString",
            "valueOf",
            "isPrototypeOf"].indexOf(key) == -1;
    }
    dcUtility.notCore = notCore;
    function props(obj) {
        var p = [];
        for (; obj != null; obj = Object.getPrototypeOf(obj)) {
            var op = Object.getOwnPropertyNames(obj);
            for (var i = 0; i < op.length; i++)
                if (p.indexOf(op[i]) == -1)
                    p.push(op[i]);
        }
        return p;
    }
    dcUtility.props = props;
})(dcUtility || (dcUtility = {}));
