import { Parenthesis } from "./Parenthesis";

describe("Parenthesis", () => {
  let p: Parenthesis;
  beforeEach(() => p = new Parenthesis());

  it("should parse an expression in parenthesis", () => {
    expect(p.parse("(a=b)")).toBe(true);
  });

  it("should parse a list in parenthesis", () => {
    expect(p.parse("(1,2,3,4)")).toBe(true);
  });
});
