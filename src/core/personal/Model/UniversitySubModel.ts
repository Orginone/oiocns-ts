import { schema } from '@/base';
import { TargetType } from '../../enum';
import Company from './CompanySubModel';

export default class University extends Company {
  constructor(target: schema.XTarget) {
    super(target);
    //TODO 何用？
    // this.subTypes = [
    //   TargetType.Group,
    //   TargetType.JobCohort,
    //   TargetType.Office,
    //   TargetType.Working,
    //   TargetType.Section,
    //   TargetType.College,
    //   TargetType.Laboratory,
    // ];
  }
}
