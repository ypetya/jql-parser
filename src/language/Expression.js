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
var Term_1 = require("./Term");
var separators_1 = require("../elements/separators");
/**
 * expression(Or,And) :== term [ separator(Or,And) { expression } ]
 **/
var Expression = /** @class */ (function (_super) {
    __extends(Expression, _super);
    function Expression() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Expression.prototype, "end", {
        get: function () {
            var end = this.term.end;
            if (this.separator) {
                end += this.separator.end;
            }
            if (this.expression) {
                end += this.expression.end;
            }
            return end;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Expression.prototype, "content", {
        get: function () {
            var str = this.term.content;
            if (this.separator) {
                str += " " + this.separator.content + " ";
            }
            if (this.expression) {
                str += " " + this.expression.content;
            }
            return str;
        },
        set: function (value) {
            throw new Error('Method not implemented.');
        },
        enumerable: true,
        configurable: true
    });
    Expression.prototype.matcherFn = function (str) {
        throw new Error('Method not implemented.');
    };
    // TODO flatten expressions!
    Expression.prototype.parse = function (input) {
        this.term = new Term_1.Term();
        if (this.term.parse(input)) {
            var next = input.substr(this.term.end);
            this.separator = parseSeparator(next);
            if (this.separator) {
                next = next.substr(this.separator.end);
                this.expression = new Expression();
                return this.expression.parse(next);
            }
            return true;
        }
        return false;
    };
    return Expression;
}(Token_1.Token));
exports.Expression = Expression;
var SEPARATORS = [function () { return new separators_1.And(); }, function () { return new separators_1.Or(); }, function () { return new separators_1.Comma(); }];
function parseSeparator(jql) {
    for (var _i = 0, SEPARATORS_1 = SEPARATORS; _i < SEPARATORS_1.length; _i++) {
        var separator = SEPARATORS_1[_i];
        var s = separator();
        if (s.parse(jql)) {
            return s;
        }
    }
    return null;
}
