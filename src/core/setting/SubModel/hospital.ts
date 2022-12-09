import { schema } from '../../../base';
import { TargetType } from '../../enum';
import Company from '@/core/personal/SubModel/company';

export default class Hospital extends Company {
  constructor(target: schema.XTarget) {
    super(target);
    this.subTypes = [
      TargetType.Group,
      TargetType.JobCohort,
      TargetType.Office,
      TargetType.Working,
      TargetType.Section,
      TargetType.Laboratory,
    ];
  }
}
