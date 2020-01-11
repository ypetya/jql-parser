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
var Token_1 = require("../elements/Token");
var Quote_1 = require("../elements/Quote");
var Value_1 = require("../elements/Value");
var Parenthesis_1 = require("../elements/Parenthesis");
/**
 * operand :== quote | string | paren {expression}
 **/
var Operand = /** @class */ (function (_super) {
    __extends(Operand, _super);
    function Operand() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.spaces = 0;
        return _this;
    }
    Object.defineProperty(Operand.prototype, "end", {
        get: function () {
            return this.spaces + this.value.end;
        },
        enumerable: true,
        configurable: true
    });
    Operand.prototype.matcherFn = function (str) {
        throw new Error('Method not implemented.');
    };
    Operand.prototype.parse = function (input) {
        var str = input;
        if (input[0] === ' ') {
            this.spaces = 1;
            str = input.substr(1);
        }
        var q = new Quote_1.Quote();
        if (q.parse(str)) {
            this.value = q;
            return true;
        }
        var value = new Value_1.Value();
        if (value.parse(str)) {
            this.value = value;
            return true;
        }
        var paren = new Parenthesis_1.Parenthesis();
        if (paren.parse(str)) {
            this.value = paren;
            return true;
        }
        return false;
    };
    return Operand;
}(Token_1.Token));
exports.Operand = Operand;
