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
var Expression_1 = require("../language/Expression");
var Parenthesis = /** @class */ (function (_super) {
    __extends(Parenthesis, _super);
    function Parenthesis() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Parenthesis.startsWithParenthesis = function (jql) {
        if (jql.length >= 2) {
            if (jql[0] === '(') {
                return 0;
            }
        }
        return -1;
    };
    Parenthesis.endOfParenthesis = function (jql) {
        var stack = [];
        for (var i = 0; i < jql.length; i++) {
            if (jql[i] === '(') {
                stack.push(i);
            }
            else if (jql[i] === ')') {
                stack.pop();
                if (stack.length === 0) {
                    return i;
                }
            }
        }
    };
    Parenthesis.prototype.matcherFn = function (str) {
        var start = Parenthesis.startsWithParenthesis(str);
        if (start > -1) {
            var end = Parenthesis.endOfParenthesis(str);
            this.content = str.substr(start + 1, end - start - 1);
            return end + 1;
        }
        return 0;
    };
    Parenthesis.prototype.parse = function (input) {
        this.end = this.matcherFn(input);
        if (this.end > 0) {
            this.nestedExpression = new Expression_1.Expression();
            return this.nestedExpression.parse(this.content);
        }
        return false;
    };
    return Parenthesis;
}(Token_1.Token));
exports.Parenthesis = Parenthesis;
