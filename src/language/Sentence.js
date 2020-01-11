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
var Expression_1 = require("./Expression");
var OrderBy_1 = require("./OrderBy");
var Sentence = /** @class */ (function (_super) {
    __extends(Sentence, _super);
    function Sentence() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Sentence.normalize = function (jql) {
        var s = jql.replace(/[ ]{2,}/g, ' ');
        s = s.replace(/ and /ig, ' AND ');
        s = s.replace(/ or /ig, ' OR ');
        s = s.replace(/ in\s?\(/ig, ' IN (');
        s = s.replace(/ order by /i, ' ORDER BY ');
        s = s.replace(/ asc$/i, ' ASC');
        s = s.replace(/ desc$/i, ' DESC');
        s = s.replace(/ in openSprint/i, ' IN openSprint');
        return s.trim();
    };
    Object.defineProperty(Sentence.prototype, "end", {
        get: function () {
            var end = this.expression.end;
            if (this.orderBy) {
                end += this.orderBy.end;
            }
            return end;
        },
        enumerable: true,
        configurable: true
    });
    Sentence.prototype.matcherFn = function (str) {
        throw new Error('Method not implemented.');
    };
    Sentence.prototype.parse = function (input) {
        this.content = Sentence.normalize(input);
        this.expression = new Expression_1.Expression();
        if (this.expression.parse(this.content)) {
            if (this.expression.end !== this.content.length) {
                var next = this.content.substr(this.expression.end);
                this.orderBy = new OrderBy_1.OrderBy();
                return this.orderBy.parse(next);
            }
            return true;
        }
        return false;
    };
    return Sentence;
}(Token_1.Token));
exports.Sentence = Sentence;
