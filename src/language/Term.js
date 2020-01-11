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
var operators_1 = require("../elements/operators");
/**
 * term :== operand [ operator { operand } ]
 */
var Term = /** @class */ (function (_super) {
    __extends(Term, _super);
    function Term() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Term.prototype, "end", {
        get: function () {
            var end = this.lhsValue.end;
            if (this.operator) {
                end += this.operator.end;
            }
            if (this.rhsValue) {
                end += this.rhsValue.end;
            }
            return end;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Term.prototype, "content", {
        get: function () {
            return [this.lhsValue.content,
                this.operator.content,
                this.rhsValue.content].join(' ');
        },
        set: function (value) {
            throw new Error('Method not implemented.');
        },
        enumerable: true,
        configurable: true
    });
    Term.prototype.matcherFn = function (str) {
        throw new Error('Method not implemented.');
    };
    Term.prototype.parse = function (input) {
        this.lhsValue = new Operand_1.Operand();
        if (this.lhsValue.parse(input)) {
            var next = input.substr(this.lhsValue.end);
            this.operator = parseOperator(next);
            if (this.operator) {
                next = next.substr(this.operator.end);
                this.rhsValue = new Operand_1.Operand();
                return this.rhsValue.parse(next);
            }
            return true;
        }
        return false;
    };
    return Term;
}(Token_1.Token));
exports.Term = Term;
var OPERATORS = [function () { return new operators_1.Equals(); }, function () { return new operators_1.Less(); }, function () { return new operators_1.Greater(); }, function () { return new operators_1.In(); }];
function parseOperator(jql) {
    for (var _i = 0, OPERATORS_1 = OPERATORS; _i < OPERATORS_1.length; _i++) {
        var operator = OPERATORS_1[_i];
        var o = operator();
        if (o.parse(jql)) {
            return o;
        }
    }
    return null;
}
