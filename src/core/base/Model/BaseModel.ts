import BaseServiceApi from "./ApiV1"


/**
 * 字典类统一模型
 */
export default class BaseModel extends BaseServiceApi{
  // 单例
  private static _instance: BaseModel;

  private constructor() {
    super()
  }

  public static getInstance(): BaseModel {
    if (this._instance == null) {
      this._instance = new BaseModel();
    }
    return this._instance;
  }
  /** 
   * 示例DEMO：应用分类创建
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