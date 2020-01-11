import {Token} from './Token';

export class Quote extends Token {
  protected quoteChar!: string;

  protected matcherFn(str: string): number {
    const quoteChars = ['"', '\''];
    for (const quoteChar of quoteChars) {
      if (str[0] === quoteChar) {
        this.quoteChar = quoteChar;
        for (let k = 1; k < str.length; k++) {
          if (str[k] === this.quoteChar) {
            // found the end character
            this.content = str.substr(1, k - 1);
            return k + 1;
          }
        }
      }
    }
    return 0;

  }

  parse(input: string): boolean {
    this.end = this.matcherFn(input);
    return this.end > 0;
  }
}
