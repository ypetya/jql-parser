import {Parenthesis} from '../elements/Parenthesis';
import {Quote} from '../elements/Quote';
import {Token} from '../elements/Token';
import {Value} from '../elements/Value';

/**
 * operand :== quote | string | paren {expression}
 */
export class Operand extends Token {
  value!: Quote | Value | Parenthesis;
  spaces = 0;

  get end(): number {
    return this.spaces + this.value.end;
  }

  protected matcherFn(str: string): number {
    throw new Error('Method not implemented.');
  }

  parse(input: string): boolean {
    let str = input;
    if (input[0] === ' ') {
      this.spaces = 1;
      str = input.substr(1);
    }

    const q = new Quote();
    if (q.parse(str)) {
      this.value = q;
      return true;
    }

    const value = new Value();
    if (value.parse(str)) {
      this.value = value;
      return true;
    }

    const paren = new Parenthesis();
    if (paren.parse(str)) {
      this.value = paren;
      return true;
    }

    return false;
  }
}
