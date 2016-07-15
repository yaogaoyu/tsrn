/**
 * 定义视图抽象组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      View/View.ts
 */

/// <reference path="../Core/_View/IView.ts" />
/// <reference path="../Application.tsx" />

namespace View {
    export abstract class View<P extends Core.IProps, S extends Core.IState> extends React.Component<P, S> implements Core.IView {
        /**
         * 主渲染方法。
         */
        public render(): JSX.Element {
            return Application.device() === "ios" ? this.iosRender() : this.androidRender();
        }

        /**
         * IOS系统渲染方法。
         */
        protected abstract iosRender(): JSX.Element;
        /**
         * Android系统渲染方法。
         */
        protected abstract androidRender(): JSX.Element;
    }
}
