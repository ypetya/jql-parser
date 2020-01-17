import { Expression } from "./Expression";

describe("Expression", () => {
  let e: Expression;
  beforeEach(() => e = new Expression());

  it("should parse a single term as an expression", () => {
    expect(e.parse("a=b")).toBe(true);
  });

  it("should know a list is not an expression", () => {
    expect(e.parse("1,2,3,4")).toBe(false);
  });

  it("should mark an expression at extra string on the end to invalid",
    () => {
      expect(e.parse("a=b c")).toBe(false);
    });

  it("should recognize an expression as valid even it has an extra space at the end",
    () => {
      expect(e.parse("a=b ")).toBe(true);
    });

  it('should parse a complex expression', ()=>{
    expect(e.parse('a=b AND (o<2 OR test IN (1,2,"@") AND "cecil" > de ) OR 1 = 1 '))
      .toBe(true);
  })
});
