import { kernel } from '../../base/index';
import { TargetType } from '../../types/target/enum';
import Provider from '../context/Model/provider';
import { CreateChat } from './Model/chat';
import { IChatGroup } from '../../types/chat/ichat';
/**
 * 加载通讯录会话
 * @returns 会话接口数组
 */
export const LoadChats = async (): Promise<IChatGroup[]> => {
  let groups: IChatGroup[] = [];
  const res = await kernel.queryImChats({
    spaceId: Provider.spaceId,
    cohortName: TargetType.Cohort,
    spaceTypeName: TargetType.Company,
  });
  if (res.success) {
    res.data?.groups?.forEach((item, index) => {
      groups.push({
        spaceId: item.id,
        spaceName: item.name,
        isOpened: index === 0,
        chats: item.chats.map((c) => {
          return CreateChat(item.id, item.name, c);
        }),
      });
    });
  }
  return groups;
};
