import { IWorking } from '../../../types/setting/itarget';
import BaseTarget from './base';
import { TargetType } from '../../enum';
import { XTarget,XTargetArray} from '../../../base/schema';

/**
 * 工作组的元操作
 */
export default class Working extends BaseTarget implements IWorking {
  private _onDeleted: Function;
  constructor(target: XTarget, onDeleted: Function) {
    super(target);
    this._onDeleted = onDeleted;
  }
  async delete(): Promise<boolean> {
    const res = await this.deleteTarget();
    if (res.success) {
      this._onDeleted?.apply(this, []);
    }
    return res.success;
  }
  public async searchPerson(code: string): Promise<XTargetArray> {
    return await this.searchTargetByName(code, [TargetType.Person]);
  }
}
