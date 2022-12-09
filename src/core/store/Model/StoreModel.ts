import DocsSubModel from "../SubModel/DocsSubModel"
import AppSubModel from "../SubModel/AppSubModel"


/**
 * 仓库统一模型
 */
class StoreModel{
  /**
   * 获取网盘子业务模型
   * @returns 网盘子业务实例
   */
  public getDocsSubModel():DocsSubModel{
    return new DocsSubModel();
  }
  /**
   * 获取应用业务模型
   * @returns 应用子业务实例
   */
  public getAppSubModel():AppSubModel{
    return new AppSubModel();
  }
}
export default new StoreModel()