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
     * 当前设备。
     */
    private static d: string = '';

    /**
     * 设置/获取当前设备。
     */
    public static device(d?: string): string {
        if (d != undefined && d != null) {
            Application.d = d;
        }
        return Application.d;
    }

    /**
     * IOS渲染方法。
     */
    public iosRender(): JSX.Element {
        return this.appRender();
    }

    /**
     * Android渲染方法。
     */
    public androidRender(): JSX.Element {
        return this.appRender();
    }

    /**
     * 渲染方法。
     */
    private appRender(): JSX.Element {
        return (
            <View.Index />
        );
    }

}
