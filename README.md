#使用说明

##项目名tsrn = typescript + react-native

> 此项目为typescript + react-native开发框架，react-native请自行初始化

> 初始化react-native
>> react-native init \<Project Name\>


> 将此项目中的文件拷贝到项目所在目录


>> index.android.js.dist 改名并覆盖原有 index.android.js


>> index.ios.js.dist 改名并覆盖原有 index.ios.js


>> package.json.dist 改名并覆盖原有 package.json


## 安装依赖包
> npm i --save

## 运行
> npm start 启动调试cli服务器


> npm run ios 启动调试cli服务器并启动Iphone模拟器


> gulp watch 开发模式 - 修改文件即重新编译


## 调试（ dev 或 debug ）模式
> ### IOS

1. 开发环境

    使用以下指令来运行Demo，开发过程中也可以单独使用。
    `gulp clear && gulp bundle:debug && npm run ios`

    如果打过离线包再进入调试模式，先执行gulp clear，再使用xcode打开ios下的工程文件，在xcode中删除之前添加的ios/bundle/app.jsbundle文件和ios/bundle/assets目录的引用后执行上面的指令。

    *IOS9把所有的http请求都改为https了：IOS9系统发送的网络请求将统一使用TLS 1.2 SSL。采用TLS 1.2 协议，目的是 强制增强数据访问安全，而且 系统 Foundation 框架下的相关网络请求，将不再默认使用 Http 等不安全的网络协议，而默认采用 TLS 1.2。服务器因此需要更新，以解析相关数据。如不更新，可通过在 Info.plist 中声明，倒退回不安全的网络请求，配置如下。*

    ```
    <key>NSAppTransportSecurity</key>
    <dict>
        <key>NSAllowsArbitraryLoads</key>
        <true/>
    </dict>
    ```

2. 第三方包配置:

    加入了横竖屏控制第三方包：[react-native-orientation](https://github.com/yamill/react-native-orientation)


> ###Android

``

## 打离线包
> IOS

`gulp package:ios`

打包完成后用xcode打开ios目录下的xcode工程文件，添加ios/bundle/app.jsbundle文件和ios/bundle/assets目录的引用到工程中的tsrn目录下。完成这步操作即可在真机或模拟机上运行。

> Android

`gulp package:android`

