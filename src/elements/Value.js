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
var Value = /** @class */ (function (_super) {
    __extends(Value, _super);
    function Value() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Value.prototype.matcherFn = function (str) {
        var groups = str.match(Value.S);
        if (Array.isArray(groups) && groups.length > 0) {
            var end = groups[0].length;
            this.content = str.substr(0, end);
            return end;
        }
        return 0;
    };
    Value.prototype.parse = function (input) {
        this.end = this.matcherFn(input);
        return this.end > 0;
    };
    Value.S = /^[a-zA-Z0-9+\-~_@.]+(\(\))?/;
    return Value;
}(Token_1.Token));
exports.Value = Value;
