#使用说明

##项目名tsrn = typescript + react-native

> 此项目为typescript + react-native开发框架，react-native请自行初始化

> 初始化react-native
>> react-native init \<Project Name\>


> 将此项目中的文件拷贝到项目所在目录


>> index.android.js.dist 改名并覆盖原有 index.android.js


>> index.ios.js.dist 改名并覆盖原有 index.ios.js


>> package.json.dist 改名并覆盖原有 package.json


##安装依赖包
> npm i --save

## 运行
> npm start 启动调试cli服务器


> npm run ios 启动调试cli服务器并启动Iphone模拟器


> gulp watch 开发模式 - 修改文件即重新编译

## 打离线包
> IOS

`gulp package:ios`

打包完成后用xcode打开ios目录下的xcode工程文件，添加ios/bundle/app.jsbundle文件和ios/bundle/assets目录的引用到工程中的tsrn目录下。完成这步操作即可在真机或模拟机上运行。

> Android

`gulp package:android`

