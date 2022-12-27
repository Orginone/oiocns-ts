import { emitter, DomainTypes, ISpace, IMarket, IProduct } from '../../core';
import { kernel } from '../../base';
// import {
//   JOIN_SHOPING_CAR,
//   STORE_RECENTLY_APPS,
//   STORE_USER_MENU,
// } from '@/constants/const';
import { logger,Emitter } from '../../base/common';
// import { XMerchandise } from '../../base/schema';

class PortalController extends Emitter {
  /**
   * 增加、修改
   * @param prod 应用
   * @param cache 是否添加至常用应用
   */
  set(prod: any, cache?: boolean): void {
      kernel.anystore.set(
        STORE_RECENTLY_APPS,
        {
          operation: 'replaceAll',
          data: this._caches,
        },
        'user',
      );
  }

  /**
   * 删除
   * @param message 新消息，无则为空
   */
  delete(data: any[]): void {
    kernel.anystore.delete(
      STORE_USER_MENU,
      {
        operation: 'replaceAll',
        data: {
          data: this._customMenus,
        },
      },
      'user',
    );
  }


}
export default new PortalController();
