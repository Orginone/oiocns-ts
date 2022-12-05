import { common, model, schema } from "@/base";
import kernelapi from "@/base/api/kernelapi"

/**
 * 为模型提供能力扩展
 * 注意：能力扩展不能有实例，此为抽象类
 */
export default class ApiV1 extends kernelapi {
    public readonly target: schema.XTarget;
    
    constructor(target: schema.XTarget) {
        super();
        this.target = target;
    }
    /**
     * 获取加入的组织
     * @param data 请求参数
     * @returns 请求结果
     */
    public async getjoined(data: any): Promise<model.ResultType<schema.XTargetArray>> {
        data.id = this.target.id;
        data.typeName = [this.target.typeName];
        data.page = {
            offset: 0,
            filter: '',
            limit: common.Constants.MAX_UINT_16,
        };
        return await this.queryJoinedTargetById(data);
    }

    /**
     * 拉对象加入组织
     * @param data 拉入参数
     * @returns 拉入结果
     */
    public async pull(data: any): Promise<model.ResultType<any>> {
        data.id = this.target.id;
        data.teamTypes = [this.target.typeName];
        return await this.pullAnyToTeam(data);
    }

}