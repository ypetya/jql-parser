import {Token} from '../elements/Token';
import {Operand} from './Operand';

export class OrderBy extends Token {
  order: 'ASC' | 'DESC' | null = null;
  operand?: Operand;
  private spaces = 0;

  protected matcherFn(str: string): number {
    let next = str;
    if (str[0] === ' ') {
      this.spaces = 1;
      next = str.substr(1);
    }
    if (next.startsWith('ORDER BY ')) {
      if (next.endsWith('ASC')) {
        this.order = 'ASC';
      } else if (next.endsWith('DESC')) {
        this.order = 'DESC';
      }
    }

    if (this.order) {
      this.content = next.substr(9,
        next.length - 9 - this.order.length);
      return next.length;
    }
    return 0;
  }

  parse(input: string): boolean {
    if (this.matcherFn(input) > 0) {
      this.operand = new Operand();
      return this.operand.parse(this.content);
    }
    return false;
  }

}
