"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Token_1 = require("./Token");
var Separator = /** @class */ (function (_super) {
    __extends(Separator, _super);
    function Separator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Separator.prototype.matcherFn = function (str) {
        var shift = 0;
        if (str[0] === ' ') {
            this.content = str.substr(1);
            shift = 1;
        }
        else {
            this.content = str;
        }
        if (this.content.startsWith(this.Symbol)) {
            return this.Symbol.length + shift;
        }
        return 0;
    };
    Separator.prototype.parse = function (input) {
        this.end = this.matcherFn(input);
        return this.end > 0;
    };
    return Separator;
}(Token_1.Token));
exports.Separator = Separator;
var And = /** @class */ (function (_super) {
    __extends(And, _super);
    function And() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.Symbol = 'AND ';
        return _this;
    }
    return And;
}(Separator));
exports.And = And;
var Or = /** @class */ (function (_super) {
    __extends(Or, _super);
    function Or() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.Symbol = 'OR ';
        return _this;
    }
    return Or;
}(Separator));
exports.Or = Or;
var Comma = /** @class */ (function (_super) {
    __extends(Comma, _super);
    function Comma() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.Symbol = ',';
        return _this;
    }
    return Comma;
}(Separator));
exports.Comma = Comma;
