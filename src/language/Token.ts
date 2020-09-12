export abstract class Token {
  private mContent = "";
  private mEnd = 0;

  get content(): string {
    return this.mContent;
  }

  set content(v: string) {
    this.mContent = v;
  }

  get end(): number {
    return this.mEnd;
  }

  set end(v: number) {
    this.mEnd = v;
  }

  protected matcherFn(str: string): number {
    throw new Error("Method not implemented");
  };

  abstract parse(input: string): boolean;
}
