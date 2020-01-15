import {Token} from './Token';

export class Value extends Token {

  static S = /^[a-zA-Z0-9+\-~_@./]+(\(\))?/;

  protected matcherFn(str: string): number {
    const groups = str.match(Value.S);

    if (Array.isArray(groups) && groups.length > 0) {
      const end = groups[0].length;
      this.content = str.substr(0, end);
      return end;
    }
    return 0;
  }

  parse(input: string): boolean {
    this.end = this.matcherFn(input);
    return this.end > 0;
  }
}
