import { Emitter } from '../../../base/common';
import userCtrl from '../../personal/Model/PersonalModel';
import { DomainTypes} from '../../../core/enum';
import { INullSpeciesItem } from '../../../types/setting/ispecies';
import {loadSpeciesTree} from './thing'
/**
 * 物的控制器
 */
class ThingController extends Emitter {
  private _teamId: string = '';
  private _species: Map<string, INullSpeciesItem>;
  constructor() {
    super();
    this._species = new Map();
    super.subscribePart([DomainTypes.Company], () => {
      setTimeout(async () => {
        if (this._teamId != userCtrl.company.id) {
          if (userCtrl.isCompanySpace) {
            await this.loadTeamSpecies(userCtrl.company.id);
          }
        }
      }, 500);
    });
  }
  /** 组织的分类根 */
  public get teamSpecies(): INullSpeciesItem {
    if (this._species.has(this._teamId)) {
      return this._species.get(this._teamId);
    }
    return undefined;
  }
  /** 加载组织分类 */
  public async loadTeamSpecies(teamId: string): Promise<INullSpeciesItem> {
    this._teamId = teamId;
    if (teamId.length > 0 && !this._species.has(this._teamId)) {
      this._species.set(this._teamId, await loadSpeciesTree(this._teamId));
    }
    this.changCallback();
    return this.teamSpecies;
  }
}

export default new ThingController();
