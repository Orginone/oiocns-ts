import Cohort from './CohortSubModel';
import consts from '../consts';
import Company from './CompanySubModel';
import Hospital from './HospitalSubModel';
import MarketTarget from './mbase';
import { TargetType } from '../../enum';
import University from './UniversitySubModel';
// import { CommonStatus } from './../enum';
import { validIsSocialCreditCode } from '@/utils/tools';
import { ICompany, IPerson, ICohort, SpaceType } from './itarget';
import { schema, faildResult, kernel, common } from '@/base';
import { ResultType, TargetModel } from '@/base/model';
import { XTarget } from '@/base/schema';

export default class Person extends MarketTarget implements IPerson {
  joinedFriend: schema.XTarget[];
  joinedCohort: ICohort[];
  joinedCompany: ICompany[];
  constructor(target: schema.XTarget) {
    super(target);

    this.searchTargetType = [
      TargetType.Cohort,
      TargetType.Person,
      ...consts.CompanyTypes,
    ];
    this.subTypes = [];
    this.pullTypes = [TargetType.Person];
    this.joinTargetType = [TargetType.Person, TargetType.Cohort, ...consts.CompanyTypes];
    this.createTargetType = [TargetType.Cohort, ...consts.CompanyTypes];

    this.joinedFriend = [];
    this.joinedCohort = [];
    this.joinedCompany = [];
    this.extendTargetType = [TargetType.Cohort, TargetType.Person];
  }
  public get spaceData(): SpaceType {
    return {
      id: this.target.id,
      name: '个人空间',
      icon: this.target.avatar,
      typeName: this.target.typeName as TargetType,
    };
  }
  public async searchCohort(code: string): Promise<ResultType<schema.XTargetArray>> {
    return await this.searchTargetByName(code, [TargetType.Cohort]);
  }
  public async searchPerson(code: string): Promise<ResultType<schema.XTargetArray>> {
    return await this.searchTargetByName(code, [TargetType.Person]);
  }
  public async searchCompany(code: string): Promise<ResultType<schema.XTargetArray>> {
    return await this.searchTargetByName(code, consts.CompanyTypes);
  }
  public async update(data: Omit<TargetModel, 'id'>): Promise<ResultType<XTarget>> {
    return await super.updateTarget(data);
  }
  public async createCohort(
    data: Omit<TargetModel, 'id' | 'belongId' | 'teamName' | 'teamCode'>,
  ): Promise<ResultType<any>> {
    const res = await this.createTarget({
      ...data,
      teamCode: data.code,
      teamName: data.name,
      belongId: this.target.id,
    });
    if (res.success && res.data != undefined) {
      const cohort = new Cohort(res.data);
      this.joinedCohort.push(cohort);
      return cohort.pullMember([this.target]);
    }
    return res;
  }
  public async createCompany(
    data: Omit<TargetModel, 'id'>,
  ): Promise<ResultType<schema.XTarget>> {
    data.belongId = this.target.id;
    if (!consts.CompanyTypes.includes(<TargetType>data.typeName)) {
      return faildResult('您无法创建该类型单位!');
    }
    if (!validIsSocialCreditCode(data.code)) {
      return faildResult('请填写正确的代码!');
    }
    const tres = await this.searchTargetByName(data.code, consts.CompanyTypes);
    if (!tres.data.result) {
      const res = await this.createTarget(data);
      if (res.success && res.data != undefined) {
        let company;
        switch (<TargetType>data.typeName) {
          case TargetType.University:
            company = new University(res.data);
            break;
          case TargetType.Hospital:
            company = new Hospital(res.data);
            break;
          default:
            company = new Company(res.data);
            break;
        }
        this.joinedCompany.push(company);
        company.pullMember([this.target]);
      }
      return res;
    } else {
      return faildResult('该单位已存在!');
    }
  }
  public async deleteCohort(id: string): Promise<ResultType<any>> {
    let res = await kernel.deleteTarget({
      id: id,
      typeName: TargetType.Cohort,
      belongId: this.target.id,
    });
    console.log('过滤前', this.joinedCohort);
    if (res.success) {
      this.joinedCohort = this.joinedCohort.filter((a) => a.target.id != id);
      console.log('过滤后', this.joinedCohort);
    }
    return res;
  }
  public async deleteCompany(id: string): Promise<ResultType<any>> {
    let res = await kernel.deleteTarget({
      id: id,
      typeName: TargetType.Company,
      belongId: this.target.id,
    });
    if (res.success) {
      this.joinedCompany = this.joinedCompany.filter((a) => a.target.id != id);
    }
    return res;
  }
  public async applyJoinCohort(id: string): Promise<ResultType<any>> {
    const cohort = this.joinedCohort.find((cohort) => {
      return cohort.target.id == id;
    });
    if (cohort == undefined) {
      return await this.applyJoin(id, TargetType.Cohort);
    }
    return faildResult(consts.IsJoinedError);
  }
  public async quitCohorts(id: string): Promise<ResultType<any>> {
    const res = await this.cancelJoinTeam(id);

    if (res.success) {
      this.joinedCohort = this.joinedCohort.filter((cohort) => {
        return cohort.target.id != id;
      });
    }
    return res;
  }
  public async quitCompany(id: string): Promise<ResultType<any>> {
    const res = await kernel.exitAnyOfTeamAndBelong({
      id,
      teamTypes: [
        TargetType.JobCohort,
        TargetType.Department,
        TargetType.Cohort,
        ...consts.CompanyTypes,
      ],
      targetId: this.target.id,
      targetType: TargetType.Person,
    });
    this.joinedCompany = this.joinedCompany.filter((company) => {
      return company.target.id != id;
    });
    return res;
  }
  public async getFriends(reload: boolean = false): Promise<schema.XTarget[]> {
    if (!reload && this.joinedFriend.length > 0) {
      return this.joinedFriend;
    }
    const res = await this.getSubTargets([TargetType.Person]);
    if (res.success && res.data.result) {
      this.joinedFriend = res.data.result;
    }

    return this.joinedFriend;
  }
  public async applyFriend(target: schema.XTarget): Promise<ResultType<any>> {
    const joinedTarget = this.joinedFriend.find((a) => {
      return a.id == target.id;
    });
    if (joinedTarget == undefined) {
      const res = await this.pullMember([target]);
      if (res.success) {
        await this.applyJoin(target.id, TargetType.Person);
      }
      return res;
    }
    return faildResult(consts.IsExistError);
  }

  public async cancelJoinApply(id: string): Promise<ResultType<any>> {
    return await kernel.cancelJoinTeam({
      id,
      typeName: TargetType.Person,
      belongId: this.target.id,
    });
  }
  public async getUsefulProduct(reload: boolean = false): Promise<schema.XProduct[]> {
    return super.getUsefulProduct(reload);
  }
  public async getUsefulResource(
    id: string,
    reload: boolean = false,
  ): Promise<schema.XResource[]> {
    return super.getUsefulResource(id, reload);
  }
  public async resetPassword(
    password: string,
    privateKey: string,
  ): Promise<ResultType<any>> {
    return await kernel.resetPassword(this.target.code, password, privateKey);
  }
}
