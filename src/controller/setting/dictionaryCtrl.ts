import { kernel } from '../../base';
import { Emitter } from '../../base/common';
import { PageRequest } from '../../base/model';

class DictionaryController extends Emitter {
  /**
   * 查询字典分类
   */
  // async getDictList(params: { id: string, spaceId: string, page: PageRequest }) {
  //   const res = await kernel.querySpeciesDict({
  //     id: params.id,
  //     spaceId: params.spaceId,
  //     page: {
  //       offset: params.page.offset,
  //       limit: params.page.limit,
  //       filter: '',
  //     },
  //   });

  //   return res;
  // }
}
export default new DictionaryController();
