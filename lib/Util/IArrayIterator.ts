/**
 * 声明数组遍历函数接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Util/IArrayIterator.ts
 */

namespace Util {
    export interface IArrayIterator<T, U> {
        (element: T, index?: number, array?: T[]): U;
    }
}
