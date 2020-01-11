"use strict";
exports.__esModule = true;
var Sentence_1 = require("./Sentence");
describe('Sentence', function () {
    var s;
    beforeEach(function () { return s = new Sentence_1.Sentence(); });
    it("should parse a sentence with ORDER BY", function () {
        expect(s.parse('project in ("Fantastic and jira in light ") AND sprint in openSprints() OR COMPONENT = jira ORDER BY Rank ASC')).toBe(true);
    });
    it('should parse a single term', function () {
        expect(s.parse('a= "valid"')).toBe(true);
    });
    it('should parse a sentence with nested parenthesis', function () {
        expect(s.parse('b = validFn() or ( a in (1,2,3 , "UI/" ) AND peter_kiss = assignee )')).toBe(true);
    });
});
