import { schema } from '../../../base';
import { TargetType } from '../../enum';
import Company from '../../personal/SubModel/company';

export default class University extends Company {
  constructor(target: schema.XTarget) {
    super(target);
    this.subTypes = [
      TargetType.Group,
      TargetType.JobCohort,
      TargetType.Office,
      TargetType.Working,
      TargetType.Section,
      TargetType.College,
      TargetType.Laboratory,
    ];
  }
}
