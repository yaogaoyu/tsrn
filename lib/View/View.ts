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
        public render(): JSX.Element {
            return Application.device() === "ios" ? this.iosRender() : this.androidRender();
        }

        protected abstract iosRender(): JSX.Element;

        protected abstract androidRender(): JSX.Element;
    }
}
