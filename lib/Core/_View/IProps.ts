/**
 * 声明视图属性接口规范。
 *
 * @author    姚尧 <yyao@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_View/IProps.ts
 */

/// <reference path="../_Runtime/IFlow.ts" />

namespace Core {

    export interface IProps extends Util.IHashTable<any> {
        /**
         * 关联业务流。
         */
        flow?: IFlow;
    }
}
