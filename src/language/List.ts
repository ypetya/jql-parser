import { Operand } from "./Operand";
import { Comma } from "./separators";
import { Token } from "./Token";

export class List extends Token {
  operand!: Operand;
  comma?: Comma;
  list?: List;

  get end(): number {
    let end = this.operand.end;
    if (this.comma) {
      end += this.comma.end;
      if (this.list) {
        end += this.list.end;
      }
    }
    return end;
  }

  parse(input: string): boolean {
    this.operand = new Operand();
    if(this.operand.parse(input)) {
      this.content = input.substr(this.operand.end);
      this.comma = new Comma();
      if(this.comma.parse(this.content)) {
        this.list = new List();
        this.content = this.content.substr(this.comma.end);

        return this.list.parse(this.content);
      }
      return true;
    }
    return false;
  }

}
