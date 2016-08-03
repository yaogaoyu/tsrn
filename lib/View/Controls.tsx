/**
 * 播放器视图。
 *
 * @author    姚尧 <yyao@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      View/Controls.tsx
 */

 /// <reference path="View.ts" />

namespace View {

    import ReactNative = __React;
    var WEBVIEWBRIDGE: any = require('react-native-webview-bridge');

    export class Controls extends View<Core.IProps, Core.IState> {
        /**
         * 定义样式。
         */
        private styles: any = ReactNative.StyleSheet.create({
            container: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            },
            contentContainer: { paddingVertical: 0 }
        });

        /**
         * 构造函数。
         */
        constructor(props: Core.IProps) {
            super(props);
            // var webviewbridge: any = this.refs['webviewbridge'];
            // const webviewbridge: any = this.refs['webviewbridge'];
            // if (webviewbridge['sendToBridge']) {
            //     webviewbridge['sendToBridge']("d7bcfe11f34cb58f86ec30d174eedcb6763c18c400000000000000000000000000000000597ae3bd");
            // }
        }

        /**
         * IOS系统渲染方法。
         */
        public iosRender(): JSX.Element {
            const injectScript: any = `(function () {
                window.$$u = "";
                window.dispatchEvent(new Event("bridgeReady"));
            }());`;

            return (
                <WEBVIEWBRIDGE style={this.styles.container}
                    ref='webviewbridge'
                    javaScriptEnabled={true}
                    injectedJavaScript={injectScript}
                    onBridgeMessage={this.onBridgeMessage.bind(this)}
                    source={{uri: 'http://dahao.de/zuopin/' + this.props.params['work'] + '/play-app.html?' + new Date().getTime()}}
                />
            );
        }

        /**
         * Android系统渲染方法。
         */
        public androidRender(): JSX.Element {
            const injectScript: any = `(function () {
                window.$$u = "";
                window.dispatchEvent(new Event("bridgeReady"));
            }());`;

            return (
                <WEBVIEWBRIDGE style={this.styles.container}
                    ref='webviewbridge'
                    javaScriptEnabled={true}
                    injectedJavaScript={injectScript}
                    onBridgeMessage={this.onBridgeMessage.bind(this)}
                    source={{uri: 'http://dahao.de/zuopin/' + this.props.params['work'] + '/play-app.html?' + new Date().getTime()}}
                />
            );
        }

        private onBridgeMessage(msg: string): void {
            let data: Util.IHashTable<any> = JSON.parse(msg);
            console.log(data);
            let webviewbridge: any = this.refs['webviewbridge'];
            switch (data['type']) {
                case "alert":
                    ReactNative["Alert"].alert("", data['val'], [
                        {
                            text: "确定",
                            onPress: () => {
                                let message: string = JSON.stringify({type: 'alertResult', target: data["target"], val: true, cb: data["cb"]});
                                webviewbridge.sendToBridge(message);
                            }
                        }
                    ]);
                    break;
                case "confirm":
                    ReactNative["Alert"].alert("", data['val'], [
                            {
                                text: "取消",
                                onPress: () => {
                                    let message: string = JSON.stringify({type: "confirmResult", target: data["target"], val: false});
                                    webviewbridge.sendToBridge(message);
                                }
                            },
                            {
                                text: "确定",
                                onPress: () => {
                                    let message: string = JSON.stringify({type: "confirmResult", target: data["target"], val: true, cb: data["cb"]});
                                    webviewbridge.sendToBridge(message);
                                }
                            }
                        ]);
                    break;
                case "back":
                    this.props.nav.pop();
                    break;
                case "share":
                    console.log("share");
                    break;
                case "login":
                    console.log("login");
                    break;
            }
        }
    }
}
