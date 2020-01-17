export abstract class Token {
  content!: string;
  end!: number;

  protected matcherFn(str: string): number {
    throw new Error("Method not implemented");
  };

  abstract parse(input: string): boolean;
}
