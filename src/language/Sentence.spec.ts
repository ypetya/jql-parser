import {Sentence} from './Sentence';

describe('Sentence', () => {
  let s: Sentence;

  beforeEach(() => s = new Sentence());

  it(`should parse a sentence with ORDER BY`, () => {
    expect(s.parse('project in ("Fantastic and jira in light ") AND sprint in openSprints() OR COMPONENT = jira ORDER BY Rank ASC'))
        .toBe(true);
  });

  it('should parse a single term', () => {
    expect(s.parse('a= "valid"')).toBe(true);
  });

  it('should parse a sentence with nested parenthesis', () => {
    expect(s.parse('b = validFn() or ( a in (1,2,3 , "UI/" ) AND peter_kiss = assignee )')).toBe(true);
  });
});
