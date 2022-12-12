<img width="1060" alt="image" src="https://user-images.githubusercontent.com/8328012/201800690-9f5e989e-4ed3-4817-85b9-b594ac89fd31.png">  
此工程为奥集能平台通用SDK，API提供机制按领域来划分，采用领域模型来提供能力。  
各领域下有唯一开放模型，比较store目录下为【仓库业务模型】 ，其下唯一开放模型为StoreModel(外部调用统一使用主业务模型)，所有办事相关接口均由StoreModel来提供,办事下还有SubModel为统一子业务模型存放目录，存放【应用子业务模】以及【文档子业务模型】，子业务模型为主业务模型提供能力，统一由主业务模型进行外部调用  
  
  
此SDK目前正在建设中，对应公库地址为：https://www.npmjs.com/package/@orginone/oiocns-ts


# 奥集能应用架构图  
通用SDK组件为此工程的全局定位，在此工程中，包含所有核心数据交互请求逻辑。为后续应用的迭代提供建设思路  
<img width="705" alt="image" src="https://user-images.githubusercontent.com/8328012/206955965-3cd53512-d9c1-4321-a18e-1f7a11eb27e5.png">



# 工程目录

```
├── base                                 // 后台交互API（由后台人员维护此目录）
└── core                                 // 业务模型核心API
    ├── work                             // 办事业务模型
        ├── index.ts                     // 办事模型开放入口（每个模型下，统一出口能力文件）
    ├── store                            // 仓库业务模型
        ├── Model                       
            ├── StoreModel               // 办事业务主模型，统一入口
        ├── SubModel                     
            ├── AppSubModel              // 办事中，应用业务子模型
            ├── DocsSubModel             // 办事中，文档业务子模型
    ├── setting                          // 设置业务模型
    ├── market                           // 市场业务模型
    ├── communicate                      // 沟通业务模型
    ├── personal                         // 个人业务模型    	 
├── util                                 // 工具库
├── types                                // 所有声明文件归集目录
```

## git规范

1. 命名要求：  
   1.1 统一前缀-姓名缩写-描述及日期。如 增加XX功能 `feature/lw/addmain1101`  
   1.2 分支名称前缀如下  
````
    - common：调整通用组件、通用功能、通用数据接口、通用样式等  
    - feature：新功能  
    - fix：bug修复  
    - hotfix：线上紧急修复  
    - perf：性能优化  
    - other：配置信息调整等非上面5种的改动改动  
````

2. 迭代要求：  
   2.1 `main` 分支为主干，所有迭代基于此分支进行获取  
   2.2 所有新功能迭代，问题修复等，需要进行发布，需要提交 `PR` 请求到 `main` 分支。  
   2.3 待系统上线后会拉出 `test` ,后续迭代与 `ISSUE`中问题进行关联的模式  


## 协同开发步骤

1.本地快速调试步骤  
    参考文件：`https://www.bilibili.com/read/cv17617145`

2.如何发布正式版本  
   2.1.登录https://www.npmjs.com/注册账号  
   2.2.将账号发给仓库管理员，进行组织邀请  
   2.3.版本发布（注每个版本都需要发布时，填写发布的内容）
      `npm publish --access public`

## 如何使用SDK？  
1.安装并依赖组件  
`npm install @orginone/oiocns-ts`  

2.使用办事模型   
`import {WorkModel} from "@orginone/oiocns-ts"`

3.调用进行使用    
`如获取待办的数量：WorkModel.TaskCount()`  



