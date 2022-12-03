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
  /** 
   * 示例DEMO：没有意义，测试api是否能调用通
  */
  public appCreateDict(){
    return this.createDict({  // 唯一ID
        id: "1111",
        name: "222",
        code: "33",
        public: true,
        belongId: 2,
        remark: "备注"}).then(function(resq){
        console.log("resq==>",resq);
    })
  }
}