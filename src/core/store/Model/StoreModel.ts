import { IFileSystemItem } from "@/types/store/ifilesys";
import ApiV1 from "./ApiV1"
import {rootDir} from "./FileSysSubModel"


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
   * 获取网盘子业务模型
   * @returns 网盘子业务实例
   */
  public getFileSysSubModel():IFileSystemItem{
    return rootDir;
  }
}