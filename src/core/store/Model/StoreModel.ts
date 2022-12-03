import ApiV1 from "./ApiV1"


/**
 * 仓库统一模型
 */
export default class StoreModel extends ApiV1{
  // 单例
  private static _instance: StoreModel;

  private constructor() {
    super()
  }

  public static getInstance(): StoreModel {
    if (this._instance == null) {
      this._instance = new StoreModel();
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