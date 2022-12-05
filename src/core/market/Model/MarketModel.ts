import consts from "@/core/consts";
import { CommonStatus, TargetType } from "@/core/enum";
import ApiV1, { model, schema } from "./ApiV1"


/**
 * 市场统一模型
 */
export default class MarketModel extends ApiV1{
  // 单例
  private static _instance: MarketModel;

  private constructor() {
    super()
  }

  public static getInstance(): MarketModel {
    if (this._instance == null) {
      this._instance = new MarketModel();
    }
    return this._instance;
  }
  
  /**
   * 更新商店信息
   * @param name 商店名称
   * @param code 商店编号
   * @param samrId 监管组织/个人
   * @param remark 备注
   * @param ispublic 是否公开
   * @returns
   */
   public async update(params:model.MarketModel): Promise<model.ResultType<any>> {
    const res = await this.updateMarket(params);
    if (res.success) {
      //TODO 不需要缓存全局？？？
      // this.market = res;
    }
    return res;
  }

  /**
   * 分页获取商店成员
   * @param page 分页参数
   * @returns 加入的商店成员
   */
  public async getMember(marketId:string,
    page: model.PageRequest,
  ): Promise<model.ResultType<schema.XMarketRelationArray>> {
    return await this.queryMarketMember({
      id: marketId,//TODO 不需要全局
      page: page,
    });
  }

  /**
   * 拉对象加入商店
   * @param targetIds 对象ID集合
   * @param typenames 对象类型
   * @returns 是否成功
   */
  public async pullMember(marketId:string,targetIds: string[]): Promise<model.ResultType<any>> {
    return await this.pullAnyToMarket({
      targetIds: targetIds,
      marketId: marketId,//TODO 不需要全局
      typeNames: [TargetType.Person, ...consts.CompanyTypes],
    });
  }

  /**
   * 获取商品上架申请列表
   * @param page 分页参数
   * @returns 返回商品上架申请列表
   */
  public async getMerchandiseApply(marketId:string,
    page: model.PageRequest,
  ): Promise<model.ResultType<schema.XMerchandiseArray>> {
    return await this.queryMerchandiesApplyByManager({
      id: marketId,
      page: page,
    });
  }

  /**
   * 审批商品上架申请
   * @param id 申请ID
   * @param status 审批结果
   * @returns 是否成功
   */
  public async approvalPublishApply(
    id: string,
    status: number = CommonStatus.RejectStartStatus,
  ): Promise<model.ResultType<any>> {
    return await this.approvalMerchandise({ id, status });
  }

  /**
   * 下架商品
   * @param merchandiseId 下架商品ID
   * @returns 下架是否成功
   */
  public async unPublish(
    merchandiseId: string,
    belongId: string,
  ): Promise<model.ResultType<any>> {
    return await this.deleteMerchandiseByManager({
      id: merchandiseId,
      belongId: belongId,
    });
  }

}