import { kernel } from '../../base';
import { INullSpeciesItem } from './ispecies';
import { SpeciesItem } from './species';
import { PageRequest } from '../../base/model';

/**
 * 加载分类树
 * @param id 组织id
 */
export const loadSpeciesTree = async (id: string) => {
  let item: INullSpeciesItem;
  const res = await kernel.querySpeciesTree(id, '');
  if (res.success) {
    item = new SpeciesItem(res.data, undefined);
  }
  return item
};

export const queryOperationBySpeciesIds = async(ids: any,spaceId: string) => {  
  const res = await kernel.queryOperationBySpeciesIds({
    ids:ids,
    spaceId:spaceId
  });
  return res.data;
}

export const getTableAttrs = async(
    id: string,
    spaceId:string,
    recursionOrg: boolean,
    recursionSpecies: boolean,
    page: PageRequest
) =>{
  const res = await kernel.querySpeciesAttrs({
    id:id,
    spaceId: spaceId,
    recursionOrg: recursionOrg,
    recursionSpecies: recursionSpecies,
    page: {
      offset: page.offset,
      limit: page.limit,
      filter: '',
    },
  });
  return res.data;
}


export type { INullSpeciesItem, ISpeciesItem } from './ispecies';
