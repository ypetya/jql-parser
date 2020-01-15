import { Parenthesis } from "./Parenthesis";
import { And, Or, Separator } from "./separators";
import { Term } from "./Term";
import { Token } from "./Token";

/**
 * expression(Or,And) :== term [ separator(Or,And) { paren{expression} | expression } ]
 */
export class Expression extends Token {
  term!: Term;
  separator?: Separator;
  paren?: Parenthesis;
  expression?: Expression;

  get end(): number {
    let end = this.term.end;
    if (this.separator) {
      end += this.separator.end;
    }
    if (this.paren) {
      if(this.paren.end > 0) {
        end += this.paren.end;
      } else if (this.expression) {
        end += this.expression.end;
      }
    }
    return end;
  }

  get content(): string {
    let str = this.term.content;
    if (this.separator) {
      str += ` ${this.separator.content} `;
    }
    if (this.expression) {
      str += ` ${this.expression.content}`;
    }
    return str;
  }

  set content(value: string) {
    throw new Error("Method not implemented.");
  }

  // TODO flatten expressions!
  parse(input: string): boolean {
    this.term = new Term();
    if (this.term.parse(input)) {
      let next = input.substr(this.term.end);
      this.separator = parseSeparator(next);
      if (this.separator) {
        next = next.substr(this.separator.end);

        this.expression = new Expression();

        this.paren = new Parenthesis();
        if (this.paren.parse(next)) {
          return this.expression.parse(this.paren.content);
        }

        return this.expression.parse(next);
      }
      return true;
    }
    return false;
  }
}

const SEPARATORS: Array<() => Separator> = [() => new And(), () => new Or()];

function parseSeparator(jql: string): Separator | undefined {
  for (const separator of SEPARATORS) {
    const s = separator();
    if (s.parse(jql)) {
      return s;
    }
  }
}
