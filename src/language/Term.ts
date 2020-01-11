import {Equals, Greater, In, Less, Operator} from '../elements/operators';
import {Token} from '../elements/Token';
import {Operand} from './Operand';

/**
 * term :== operand [ operator { operand } ]
 */
export class Term extends Token {
    private lhsValue!: Operand;
    operator?: Operator;
    rhsValue?: Operand;

    get end(): number {
        let end = this.lhsValue.end;
        if (this.operator) {
            end += this.operator.end;
        }
        if (this.rhsValue) {
            end += this.rhsValue.end;
        }
        return end;
    }

    get content(): string {
        const c = [this.lhsValue.content];
        if (this.operator) {

            c.push(this.operator.content);

            if (this.rhsValue) {
                c.push(
                    this.rhsValue.content);
            }
        }

        return c.join(' ');
    }

    set content(value: string) {
        throw new Error('Method not implemented.');
    }

    protected matcherFn(str: string): number {
        throw new Error('Method not implemented.');
    }

    parse(input: string): boolean {
        this.lhsValue = new Operand();
        if (this.lhsValue.parse(input)) {
            let next = input.substr(this.lhsValue.end);

            this.operator = parseOperator(next);
            if (this.operator) {
                next = next.substr(this.operator.end);
                this.rhsValue = new Operand();
                return this.rhsValue.parse(next);
            }

            return true;
        }

        return false;
    }
}

const OPERATORS: Array<() => Operator> = [() => new Equals(), () => new Less(), () => new Greater(), () => new In()];

function parseOperator(jql: string): Operator | undefined {
    for (const operator of OPERATORS) {
        const o = operator();
        if (o.parse(jql)) {
            return o;
        }
    }
}

