import PositionSubModel from '../SubModel/PositionSubModel'

/**
 * 设置统一模型
 */
class SettingModel {

    /**
     * 获取岗位子业务模型
     * 
     * @returns 
     */
    public getPositionSubModel():PositionSubModel{
        return new PositionSubModel();
    }
}

export default new SettingModel();
