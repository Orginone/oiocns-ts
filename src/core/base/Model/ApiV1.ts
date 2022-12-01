import {kernel,model,schema} from "../../../base/index"

/**
 * 为模型提供能力扩展
 * 注意：能力扩展不能有实例，此为抽象类
 */
export default abstract class BaseServiceApi{

    /**
   * 创建字典类型
   * @param {any} params 请求参数
   * @returns {model.ResultType<schema.XDict>} 请求结果
   */
  public async createDict(
    params: model.DictModel,
  ): Promise<model.ResultType<schema.XDict>> {
    return await kernel.request({
      module: 'base',
      action: 'CreateDict',
      params: params,
    });
  }
  /**
   * 创建字典项
   * @param {any} params 请求参数
   * @returns {model.ResultType<schema.XDictItem>} 请求结果
   */
  public async createDictItem(
    params: model.DictItemModel,
  ): Promise<model.ResultType<schema.XDictItem>> {
    return await kernel.request({
      module: 'base',
      action: 'CreateDictItem',
      params: params,
    });
  }
  /**
   * 删除字典类型
   * @param {any} params 请求参数
   * @returns {model.ResultType<any>} 请求结果
   */
  public async deleteDict(params: model.IdReqModel): Promise<model.ResultType<any>> {
    return await kernel.request({
      module: 'base',
      action: 'DeleteDict',
      params: params,
    });
  }
  /**
   * 删除字典项
   * @param {any} params 请求参数
   * @returns {model.ResultType<any>} 请求结果
   */
  public async deleteDictItem(params: model.IdReqModel): Promise<model.ResultType<any>> {
    return await kernel.request({
      module: 'base',
      action: 'DeleteDictItem',
      params: params,
    });
  }
  /**
   * 更新字典类型
   * @param {any} params 请求参数
   * @returns {model.ResultType<schema.XDict>} 请求结果
   */
  public async updateDict(
    params: model.DictModel,
  ): Promise<model.ResultType<schema.XDict>> {
    return await kernel.request({
      module: 'base',
      action: 'UpdateDict',
      params: params,
    });
  }
  /**
   * 更新字典项
   * @param {any} params 请求参数
   * @returns {model.ResultType<schema.XDictItem>} 请求结果
   */
  public async updateDictItem(
    params: model.DictItemModel,
  ): Promise<model.ResultType<schema.XDictItem>> {
    return await kernel.request({
      module: 'base',
      action: 'UpdateDictItem',
      params: params,
    });
  }

}