/* tslint:disable:max-classes-per-file */
import {Token} from './Token';

export abstract class Separator extends Token {
  abstract readonly Symbol: string;

  protected matcherFn(str: string): number {
    let shift = 0;
    if (str[0] === ' ') {
      this.content = str.substr(1);
      shift = 1;
    } else {
      this.content = str;
    }
    if (this.content.startsWith(this.Symbol)) {
      return this.Symbol.length + shift;
    }
    return 0;
  }

  parse(input: string): boolean {
    this.end = this.matcherFn(input);
    return this.end > 0;
  }
}

export class And extends Separator {
  readonly Symbol = 'AND ';
}

export class Or extends Separator {
  readonly Symbol = 'OR ';
}

export class Comma extends Separator {
  readonly Symbol = ',';
}
