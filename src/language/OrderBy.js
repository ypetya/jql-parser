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
var Operand_1 = require("./Operand");
var OrderBy = /** @class */ (function (_super) {
    __extends(OrderBy, _super);
    function OrderBy() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.order = null;
        _this.spaces = 0;
        return _this;
    }
    OrderBy.prototype.matcherFn = function (str) {
        var next = str;
        if (str[0] === ' ') {
            this.spaces = 1;
            next = str.substr(1);
        }
        if (next.startsWith('ORDER BY ')) {
            if (next.endsWith('ASC')) {
                this.order = 'ASC';
            }
            else if (next.endsWith('DESC')) {
                this.order = 'DESC';
            }
        }
        if (this.order) {
            this.content = next.substr(9, next.length - 9 - this.order.length);
            return next.length;
        }
        return 0;
    };
    OrderBy.prototype.parse = function (input) {
        if (this.matcherFn(input) > 0) {
            this.operand = new Operand_1.Operand();
            return this.operand.parse(this.content);
        }
        return false;
    };
    return OrderBy;
}(Token_1.Token));
exports.OrderBy = OrderBy;
