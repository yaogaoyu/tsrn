/**
 * APP入口视图类。
 *
 * @author    姚尧 <yyao@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Application.tsx
 */

/// <reference path="../include/tsd.d.ts" />
/// <reference path="View/Index.tsx" />

class Application extends View.View<Core.IProps, Core.IState> {
    /**
     * 版本号。
     */
    public static version: string = '${VERSION}';

    /**
     * 渲染方法。。
     */
    public render(): JSX.Element {
        return (
            <View.Index />
        );
    }
}
