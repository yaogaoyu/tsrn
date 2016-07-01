/**
 * 首页视图。
 *
 * @author    姚尧 <yyao@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      View/Index.tsx
 */

 /// <reference path="View.ts" />

namespace View {

    import ReactNative = __React;

    export class Index extends View<Core.IProps, Core.IState> {
        /**
         * 定义样式。
         */
        private styles: any = ReactNative.StyleSheet.create({
            container: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }
        });
        /**
         * 构造函数。
         */
        constructor(props: Core.IProps) {
            super(props);
        }

        /**
         * 渲染方法。。
         */
        public render(): JSX.Element {
            return (
                <ReactNative.View style={this.styles.container}>
                    <ReactNative.Text>
                        (Typescript + React Native) Demo - Index
                    </ReactNative.Text>
                </ReactNative.View>
            );
        }
    }
}
