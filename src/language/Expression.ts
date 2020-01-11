import {And, Comma, Or, Separator} from '../elements/separators';
import {Token} from '../elements/Token';
import {Term} from './Term';

/**
 * expression(Or,And) :== term [ separator(Or,And) { expression } ]
 */
export class Expression extends Token {
  term!: Term;
  separator?: Separator;
  expression?: Expression;

  get end(): number {
    let end = this.term.end;
    if (this.separator) {
      end += this.separator.end;
    }
    if (this.expression) {
      end += this.expression.end;
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
    throw new Error('Method not implemented.');
  }

  protected matcherFn(str: string): number {
    throw new Error('Method not implemented.');
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
        return this.expression.parse(next);
      }
      return true;
    }
    return false;
  }
}

const SEPARATORS: Array<() => Separator> = [() => new And(), () => new Or(), () => new Comma()];

function parseSeparator(jql: string): Separator | undefined {
  for (const separator of SEPARATORS) {
    const s = separator();
    if (s.parse(jql)) {
      return s;
    }
  }
}
