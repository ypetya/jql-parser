export abstract class Token {
  content!: string;
  end!: number;

  protected matcherFn(str: string): number {
    return 0;
  };

  abstract parse(input: string): boolean;
}
