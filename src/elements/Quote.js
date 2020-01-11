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
var Quote = /** @class */ (function (_super) {
    __extends(Quote, _super);
    function Quote() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Quote.prototype.matcherFn = function (str) {
        var quoteChars = ['"', '\''];
        for (var _i = 0, quoteChars_1 = quoteChars; _i < quoteChars_1.length; _i++) {
            var quoteChar = quoteChars_1[_i];
            if (str[0] === quoteChar) {
                this.quoteChar = quoteChar;
                for (var k = 1; k < str.length; k++) {
                    if (str[k] === this.quoteChar) {
                        // found the end character
                        this.content = str.substr(1, k - 1);
                        return k + 1;
                    }
                }
            }
        }
        return 0;
    };
    Quote.prototype.parse = function (input) {
        this.end = this.matcherFn(input);
        return this.end > 0;
    };
    return Quote;
}(Token_1.Token));
exports.Quote = Quote;
