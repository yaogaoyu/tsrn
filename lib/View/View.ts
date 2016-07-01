/**
 * 定义视图抽象组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      View/View.ts
 */

/// <reference path="../Core/_View/IView.ts" />

namespace View {
    export class View<P extends Core.IProps, S extends Core.IState> extends React.Component<P, S> implements Core.IView {
    }
}
