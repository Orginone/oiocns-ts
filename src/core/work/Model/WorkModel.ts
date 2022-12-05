import ApiV1 from "./ApiV1"


/**
 * 办事类统一模型
 */
export default class WorkModel extends ApiV1{
  // 单例
  private static _instance: WorkModel;

  private constructor() {
    super()
  }

  public static getInstance(): WorkModel {
    if (this._instance == null) {
      this._instance = new WorkModel();
    }
    return this._instance;
  }
  
}