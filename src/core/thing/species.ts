import { kernel, parseAvatar, schema } from '../../base';
import { AttributeModel, PageRequest, SpeciesModel, TargetShare } from '../../base/model';
import { INullSpeciesItem, ISpeciesItem } from './ispecies';
/**
 * 分类系统项实现
 */
export class SpeciesItem implements ISpeciesItem {
  id: string;
  name: string;
  isRoot: boolean;
  target: schema.XSpecies;
  parent: INullSpeciesItem;
  children: ISpeciesItem[];
  belongInfo: TargetShare;
  constructor(target: schema.XSpecies, parent: INullSpeciesItem) {
    this.children = [];
    this.target = target;
    this.parent = parent;
    this.id = target.id;
    this.name = target.name;
    this.isRoot = parent === undefined;
    if (target.nodes && target.nodes.length > 0) {
      for (const item of target.nodes) {
        this.children.push(new SpeciesItem(item, this));
      }
    }
    this.belongInfo = { name: '奥集能平台', typeName: '平台' };
  }
  async loadAttrs(id: string, page: PageRequest): Promise<schema.XAttributeArray> {
    const res = await kernel.querySpeciesAttrs({
      id: this.id,
      spaceId: id,
      page: {
        offset: page.offset,
        limit: page.limit,
        filter: '',
      },
    });
    return res.data;
  }

  async loadInfo(info: TargetShare): Promise<ISpeciesItem> {
    if (info.typeName != '未知') {
      this.belongInfo = info;
    }
    if (!this.belongInfo && this.target.belongId) {
      const res = await kernel.queryNameBySnowId(this.target.belongId);
      if (res.success && res.data) {
        this.belongInfo = { name: res.data.name, typeName: '未知' } as TargetShare;
        const avator = parseAvatar(res.data.photo);
        if (avator) {
          this.belongInfo = { ...avator, name: res.data.name, typeName: '未知' };
        }
      }
    }
    return this;
  }

  async create(data: Omit<SpeciesModel, 'id' | 'parentId'>): Promise<INullSpeciesItem> {
    const res = await kernel.createSpecies({
      parentId: this.id,
      ...data,
      id: undefined,
    });
    if (res.success) {
      const newItem = new SpeciesItem(res.data, this);
      this.children.push(newItem);
      return newItem;
    }
    return;
  }
  async update(
    data: Omit<SpeciesModel, 'id' | 'parentId' | 'code'>,
  ): Promise<ISpeciesItem> {
    const res = await kernel.updateSpecies({
      ...data,
      id: this.id,
      code: this.target.code,
      parentId: this.target.parentId,
    });
    if (res.success) {
      this.target.name = data.name;
      this.target.public = data.public;
      this.target.authId = data.authId;
      this.target.belongId = data.belongId;
      this.target.remark = data.remark;
    }
    return this;
  }
  async delete(): Promise<boolean> {
    const res = await kernel.deleteSpecies({
      id: this.id,
      typeName: '',
    });
    if (res.success && this.parent) {
      this.parent.children = this.parent.children.filter((i) => {
        return i.id != this.id;
      });
    }
    return res.success;
  }
  async createAttr(
    data: Omit<AttributeModel, 'id' | 'speciesId' | 'speciesCode'>,
  ): Promise<boolean> {
    const res = await kernel.createAttribute({
      id: undefined,
      speciesId: this.id,
      speciesCode: this.target.code,
      ...data,
    });
    return res.success;
  }
  async updateAttr(
    data: Omit<AttributeModel, 'speciesId' | 'speciesCode'>,
  ): Promise<boolean> {
    const res = await kernel.updateAttribute({
      ...data,
      speciesId: this.target.id,
      speciesCode: this.target.code,
    });
    return res.success;
  }
  async deleteAttr(id: string): Promise<boolean> {
    const res = await kernel.deleteAttribute({
      id: id,
      typeName: '',
    });
    return res.success;
  }
}
