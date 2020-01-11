import {Expression} from '../language/Expression';
import {Token} from './Token';

export class Parenthesis extends Token {
  nestedExpression?: Expression;

  private static startsWithParenthesis(jql: string): number {
    if (jql.length >= 2) {
      if (jql[0] === '(') {
        return 0;
      }
    }
    return -1;
  }

  private static endOfParenthesis(jql: string): number {
    const stack = [];
    for (let i = 0; i < jql.length; i++) {
      if (jql[i] === '(') {
        stack.push(i);
      } else if (jql[i] === ')') {
        stack.pop();
        if (stack.length === 0) {
          return i;
        }
      }
    }
    return stack[0];
  }

  protected matcherFn(str: string): number {
    const start = Parenthesis.startsWithParenthesis(str);
    if (start > -1) {
      const end = Parenthesis.endOfParenthesis(str);
      this.content = str.substr(start + 1, end - start - 1);
      return end + 1;
    }
    return 0;
  }

  parse(input: string): boolean {
    this.end = this.matcherFn(input);
    if (this.end > 0) {
      this.nestedExpression = new Expression();

      return this.nestedExpression.parse(this.content);
    }
    return false;
  }
}
