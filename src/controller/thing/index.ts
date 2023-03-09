import { Emitter } from "../../base/common";
import userCtrl from "../setting";
import {
  INullSpeciesItem,
  DomainTypes,
  emitter,
  loadSpeciesTree,
  formDeisgnSet,
} from "../../core/";
import { kernel, model } from "../../base/index";

/**
 * 物的控制器
 */
class ThingController extends Emitter {
  private _teamId: string = "";
  private _species: Map<string, INullSpeciesItem>;
  constructor() {
    super();
    this._species = new Map();
    emitter.subscribePart([DomainTypes.Company], () => {
      setTimeout(async () => {
        if (this._teamId != userCtrl.space.id) {
          await this.loadTeamSpecies(userCtrl.space.id);
        }
      }, 100);
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

  public async querySpeciesOperation(params: any) {
    const res = await kernel.querySpeciesOperation(params);
    return res;
  }

  public async setDesign(params: model.OperationModel, createParams: any) {
    await formDeisgnSet(params, createParams);
  }

  public async getOperationItems(params: any) {
    const res = await kernel.queryOperationItems(params);
    return res;
  }

  public async getChildTableAttrs(id: string, spaceId: string) {
    const res = await kernel.querySpeciesAttrs({
      id,
      spaceId,
      recursionOrg: true,
      recursionSpecies: true,
      page: {
        offset: 0,
        limit: 10000,
        filter: "",
      },
    });
    return res.data;
  }
  public async getFormFieldWithPerson(params: any) {
    const res = await kernel.querySubTargetById(params);
    return res.data
  }

  public async getFormFieldWithGroup(params: any) {
    const res = await kernel.queryJoinedTargetById(params)
    return res.data
  }
}

export default new ThingController();
