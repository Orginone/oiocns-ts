// 异常消息常量
const UnauthorizedError = '抱歉,您没有权限操作.';
const IsExistError = '抱歉,已存在请勿重复创建.';
const ResultError = '抱歉,请求返回异常.';
const NotFoundError = '抱歉,未找到该数据.';
const IsJoinedError = '抱歉,您已加入该组织.';
const FunctionNotFoundError = '抱歉,未找到该方法.';

export default {
  UnauthorizedError,
  IsExistError,
  ResultError,
  NotFoundError,
  IsJoinedError,
  FunctionNotFoundError,
};

// 仓库我的应用 自定义 目录
export const STORE_USER_MENU = 'STORE_USER_MENU';
export const STORE_RECENTLY_APPS = 'STORE_RECENTLY_APPS';
// 购物车
export const JOIN_SHOPING_CAR = 'JOIN_SHOPING_CAR';
// 用户管理
export const USER_MANAGEMENT = 'USER_MANAGEMENT';
//岗位
export const MY_POSITION_LIST = 'POSITION';

// 分享分发 可选类型
export const DestTypes = [
  {
    value: 1,
    label: '组织',
  },
  {
    value: 2,
    label: '角色',
  },
  {
    value: 3,
    label: '岗位',
  },
  {
    value: 4,
    label: '人员',
  },
];
