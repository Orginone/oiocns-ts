import { IFileSystemItem } from "@/types/store/ifilesys";
import {rootDir} from "../SubModel/filesys"


/**
 * 仓库统一模型
 */
class StoreModel{
  /**
   * 获取网盘子业务模型
   * @returns 网盘子业务实例
   */
  public getFileSysSubModel():IFileSystemItem{
    return rootDir;
  }
}
export default new StoreModel();