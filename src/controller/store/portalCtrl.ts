import { kernel } from "../../base";
import { Emitter } from "../../base/common";

type UsingSpace = {
  id: string,
  schemaName: string,
  remark: string,
  nickname: string,
  createTime: string,
  temps?: tempsType[];
};

type tempsType = {
  contain_link: string;
  contain_name: string;
  h: number;
  i: number;
  moved: number;
  type: string;
  w: number;
  x: number;
  y: number;
};

class PortalController extends Emitter {
  /**
   * 新增 修改方案
   */
  addPortal(params: {
    workspaceId: string;
    content: UsingSpace;
  }): void {
    kernel.anystore.insert(
      `${params.workspaceId}_p`,
      params.content,
      "company"
    );
  }

  /**
   * 查找方案
   */
  getPortal(params: { workspaceId: string, skip: number, limit: number }) {
    const res = kernel.anystore.aggregate(
      `${params.workspaceId}_p`,
      { skip: params.skip, limit: params.limit },
      "company"
    );

    return res;
  }

  /**
   * 删除方案
   */
  delPortal(params: { workspaceId: string, match: UsingSpace }): void {
    kernel.anystore.remove(
      `${params.workspaceId}_p`,
      params.match,
      "company"
    )
  }

  /**
   * 更新方案
   */
  updatePortal(params: { workspaceId: string, oldVal: UsingSpace, newVal: UsingSpace }): void {
    kernel.anystore.update(
      `${params.workspaceId}_p`,
      {
        match: params.oldVal,
        update: {_set_: params.newVal},
      },
      "company"
    )
  }
}
export default new PortalController();
