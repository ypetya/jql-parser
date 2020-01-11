"use strict";
exports.__esModule = true;
var Sentence_1 = require("./language/Sentence");
exports.parse = function (str) {
    var s = new Sentence_1.Sentence();
    return s.parse(str);
};
