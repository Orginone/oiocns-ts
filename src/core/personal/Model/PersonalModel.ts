import ApiV1 from "./ApiV1"


/**
 * 个人统一模型
 */
export default class PersonalModel extends ApiV1{
  // 单例
  private static _instance: PersonalModel;

  private constructor() {
    super()
  }

  public static getInstance(): PersonalModel {
    if (this._instance == null) {
      this._instance = new PersonalModel();
    }
    return this._instance;
  }

  
}