import { generateUuid } from './uuid';

export class Emitter {
  private _refreshCallback: { [name: string]: (key: string) => void } = {};
  private _partRefreshCallback: {
    [name: string]: { [p: string]: (key: string) => void };
  } = {};
  constructor() {
    this._refreshCallback = {};
  }
  /**
   * @desc 订阅变更
   * @param callback 变更回调
   * @returns 订阅ID
   */
  public subscribe(callback: (key: string) => void): string {
    const id = generateUuid();
    if (callback) {
      callback(id);
      this._refreshCallback[id] = callback;
    }
    return id;
  }

  /**
   * 以异步的方式订阅一次性变更
   */
  public subscribeOnceAsync() {
    return new Promise<string>((s, e)=> {
      let id = "";
      id = this.subscribe(key => {
        this.unsubscribe(id);
        s(key);
      });
    });
  }

  /**
   * @desc 订阅局部变更
   * @param callback 变更回调
   * @returns 订阅ID
   */
  public subscribePart(p: string | string[], callback: (key: string) => void): string {
    const key = generateUuid();
    if (p.length > 0) {
      callback(key);
      this._partRefreshCallback[key] = {};
      if (typeof p === 'string') {
        this._partRefreshCallback[key][p] = callback;
      } else {
        for (const i of p) {
          this._partRefreshCallback[key][i] = callback;
        }
      }
    }
    return key;
  }

  /**
   * 以异步的方式订阅一次性局部变更
   */
  public subscribePartOnceAsync(p: string | string[]) {
    return new Promise<string>((s, e)=> {
      let id = "";
      id = this.subscribePart(p, key => {
        this.unsubscribe(id);
        s(key);
      });
    });
  }

  /**
   * @desc 取消订阅 支持取消多个
   * @param key 订阅ID
   */
  public unsubscribe(key: string | string[]): void {
    if (typeof key == 'string') {
      delete this._refreshCallback[key];
      delete this._partRefreshCallback[key];
    } else {
      key.forEach((id: string) => {
        delete this._refreshCallback[id];
        delete this._partRefreshCallback[id];
      });
    }
  }

  /**
   * @desc 变更回调
   */
  public changCallback() {
    Object.keys(this._refreshCallback).forEach((key) => {
      this._refreshCallback[key].apply(this, [generateUuid()]);
    });
  }

  /**
   * @desc 局部变更回调
   * @param {string} p 订阅方法名称
   */
  public changCallbackPart(p: string): void {
    this.changCallback();
    Object.keys(this._partRefreshCallback).forEach((key) => {
      const callback = this._partRefreshCallback[key][p];
      if (callback) {
        callback.apply(this, [generateUuid()]);
      }
    });
  }
}
