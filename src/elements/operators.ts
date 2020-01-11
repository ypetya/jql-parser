/* tslint:disable:max-classes-per-file */
import {Separator} from './separators';
export abstract class Operator extends Separator {

}

export class Equals extends Operator {
  readonly Symbol = '=';
}

export class Less extends Operator {
  readonly Symbol = '<';
}

export class Greater extends Operator {
  readonly Symbol = '>';
}

export class In extends Operator {
  readonly Symbol = 'IN ';
}
