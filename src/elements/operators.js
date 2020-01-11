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
var separators_1 = require("./separators");
var Operator = /** @class */ (function (_super) {
    __extends(Operator, _super);
    function Operator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Operator;
}(separators_1.Separator));
exports.Operator = Operator;
var Equals = /** @class */ (function (_super) {
    __extends(Equals, _super);
    function Equals() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.Symbol = '=';
        return _this;
    }
    return Equals;
}(Operator));
exports.Equals = Equals;
var Less = /** @class */ (function (_super) {
    __extends(Less, _super);
    function Less() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.Symbol = '<';
        return _this;
    }
    return Less;
}(Operator));
exports.Less = Less;
var Greater = /** @class */ (function (_super) {
    __extends(Greater, _super);
    function Greater() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.Symbol = '>';
        return _this;
    }
    return Greater;
}(Operator));
exports.Greater = Greater;
var In = /** @class */ (function (_super) {
    __extends(In, _super);
    function In() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.Symbol = 'IN ';
        return _this;
    }
    return In;
}(Operator));
exports.In = In;
