import { Emitter } from '../../../base/common';
import { kernel, model, schema } from '../../../base';
import {DomainTypes} from '../../../core/enum'
import {
  IPerson,
  ICompany,
  ISpace,
  ICohort,
} from '../../../types/setting/itarget';
import Person from '../SubModel/person'

const sessionUserName = 'sessionUser';
const sessionSpaceName = 'sessionSpace';
/** 用户控制器 */
class PersonalModel extends Emitter {
  private _user: IPerson | undefined;
  private _curSpace: ICompany | undefined;
  /**构造方法 */
  constructor() {
    super();
    const userJson = sessionStorage.getItem(sessionUserName);
    if (userJson && userJson.length > 0) {
      this._loadUser(JSON.parse(userJson));
      setTimeout(async () => {
        await this._user?.getJoinedCompanys();
        this._curSpace = this._findCompany(
          sessionStorage.getItem(sessionSpaceName) || '',
        );
        if (this._curSpace) {
          this.changCallbackPart(DomainTypes.Company);
          // emitter.changCallbackPart(DomainTypes.Company);
        }
      }, 10);
    }
  }
  /** 是否已登录 */
  get Logined(): boolean {
    return !!this._user?.target.id;
  }
  /** 是否为单位空间 */
  get IsCompanySpace(): boolean {
    return this._curSpace != undefined;
  }
  /** 当前用户 */
  get User(): IPerson {
    if (this._user) {
      return this._user;
    } else {
      return { id: '', target: { id: '' } } as unknown as IPerson;
    }
  }
  /** 当前单位空间 */
  get Company(): ICompany {
    if (this._curSpace) {
      return this._curSpace;
    } else {
      return { id: '', target: { id: '' } } as unknown as ICompany;
    }
  }
  /** 当前空间对象 */
  get Space(): ISpace {
    if (this._curSpace) {
      return this._curSpace;
    }
    return this._user!;
  }
  /** 设置当前空间 */
  public setCurSpace(id: string) {
    if (id === this._user!.target.id) {
      this._curSpace = undefined;
      sessionStorage.setItem(sessionSpaceName, '');
    } else {
      this._curSpace = this._findCompany(id);
      if (this._curSpace) {
        sessionStorage.setItem(sessionSpaceName, id);
      }
    }
    this.changCallbackPart(DomainTypes.Company);
    // emitter.changCallbackPart(DomainTypes.Company);
  }
  /**
   * 获取我的群组
   * @returns 群组数据
   */
  public async getCohortList(): Promise<ICohort[]> {
    if (this._curSpace) {
      return await this._curSpace.getJoinedCohorts(false);
    } else {
      return await this._user!.getJoinedCohorts(false);
    }
  }
  /**
   * 登录
   * @param account 账户
   * @param password 密码
   */
  public async login(account: string, password: string): Promise<model.ResultType<any>> {
    let res = await kernel.login(account, password);
    if (res.success) {
      await this._loadUser(res.data.person);
    }
    return res;
  }
  /**
   * 注册用户
   * @param name 姓名
   * @param motto 座右铭
   * @param phone 电话
   * @param account 账户
   * @param password 密码
   * @param nickName 昵称
   */
  public async register(
    name: string,
    motto: string,
    phone: string,
    account: string,
    password: string,
    nickName: string,
  ): Promise<model.ResultType<any>> {
    let res = await kernel.register(name, motto, phone, account, password, nickName);
    if (res.success) {
      await this._loadUser(res.data.person);
    }
    return res;
  }
  /**
   * 变更密码
   * @param account 账号
   * @param password 密码
   * @param privateKey 私钥
   * @returns
   */
  public async resetPassword(
    account: string,
    password: string,
    privateKey: string,
  ): Promise<model.ResultType<any>> {
    return await kernel.resetPassword(account, password, privateKey);
  }

  private async _loadUser(person: schema.XTarget): Promise<void> {
    sessionStorage.setItem(sessionUserName, JSON.stringify(person));
    this._user = new Person(person);
    this._curSpace = undefined;
    await this._user.getJoinedCompanys(false);
    this.changCallbackPart(DomainTypes.User);
    // super.changCallbackPart(DomainTypes.User);
  }

  private _findCompany(id: string): ICompany | undefined {
    if (this._user && id.length > 0) {
      for (const item of this._user.joinedCompany) {
        if (item.target.id === id) {
          return item;
        }
      }
    }
  }
}

export default new PersonalModel();
