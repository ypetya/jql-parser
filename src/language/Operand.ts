import { List } from "./List";
import { Parenthesis } from "./Parenthesis";
import { Quote } from "./Quote";
import { Token } from "./Token";
import { Value } from "./Value";

/**
 * operand :== quote | string | paren{list}
 */
export class Operand extends Token {
  value!: Quote | Value | List;
  paren?: Parenthesis;
  spaces = 0;

  get end(): number {
    const end = this.spaces;
    if (this.paren && this.paren.end > 0) {
      return end + this.paren.end;
    }
    return end + this.value.end;
  }

  parse(input: string): boolean {
    let str = input;
    if (input[0] === " ") {
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

    this.paren = new Parenthesis();
    if (this.paren.parse(str)) {
      this.value = new List();
      return this.value.parse(this.paren.content);
    }

    return false;
  }
}
