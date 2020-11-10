import { Expression } from "./Expression";
import { OrderBy } from "./OrderBy";
import { Token } from "./Token";

export class Sentence extends Token {
  expression!: Expression;
  orderBy?: OrderBy;

  // TODO: no global normalization! every token should do itself!
  private static normalize(jql: string): string {
    let s = jql.replace(/[ ]{2,}/g, " ");
    s = s.replace(/ and /ig, " AND ");
    s = s.replace(/ or /ig, " OR ");
    s = s.replace(/ in\s?\(/ig, " IN (");
    s = s.replace(/ order by /i, " ORDER BY ");
    s = s.replace(/ asc$/i, " ASC");
    s = s.replace(/ desc$/i, " DESC");
    s = s.replace(/ in openSprint/i, " IN openSprint");
    return s.trim();
  }

  get end(): number {
    let end = this.expression.end;
    if (this.orderBy) {
      end += this.orderBy.end;
    }
    return end;
  }

  // separate ORDER by clause from the EXPRESSION
  protected matcherFn(str: string): number {
    let ix = str.indexOf('ORDER');

    if(ix===-1) {
      ix = str.length;
    }
    return ix;
  }


  parse(input: string): boolean {
    this.content = Sentence.normalize(input);
    this.expression = new Expression();

    const end = this.matcherFn(this.content);
    const expressionPart = this.content.substr(0, end);

    if (this.expression.parse(expressionPart)) {
      if (this.content.length !== end) {
        const orderByPart = this.content.substr(end,this.content.length - expressionPart.length);
        this.orderBy = new OrderBy();
        return this.orderBy.parse(orderByPart);
      }
      return true;
    }
    return false;
  }
}
