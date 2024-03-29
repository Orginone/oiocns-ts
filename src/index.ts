import {ChatController as chatCtrl} from "./controller/chat"
import userCtrl from "./controller/setting"
import processCtrl from "./controller/setting/processCtrl"
import appCtrl from "./controller/store/appCtrl"
import docsCtrl from "./controller/store"
import marketCtrl from "./controller/store/marketCtrl"
import thingCtrl from "./controller/thing"
import todoCtrl from "./controller/todo/todoCtrl"
import portalCtrl from "./controller/store/portalCtrl"
import dictionaryCtrl from "./controller/setting/dictionaryCtrl"
import {logger,LoggerLevel} from "./base/common/"

import { IFileSystemItem, IObjectItem,INullSpeciesItem, Dict} from './core/'
import { TargetType} from './core/enum'
import { ICompany,SpaceType } from './core/target/itarget'
/**
 * 顶层归口服务
*/
export {docsCtrl,appCtrl,chatCtrl,marketCtrl,userCtrl,thingCtrl,todoCtrl,processCtrl,portalCtrl,dictionaryCtrl,logger,LoggerLevel,TargetType,Dict}

export type {IFileSystemItem,IObjectItem,ICompany,SpaceType,INullSpeciesItem}