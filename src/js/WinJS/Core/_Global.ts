// Copyright (c) Microsoft Corporation.  All Rights Reserved. Licensed under the MIT License. See License.txt in the project root for license information.
//(function (global) {
//    "use strict";
//
//    define(global);
//}(this));

interface Global {
  document?: HTMLDocument;
  parent?: Window;
  screen?: Screen;
  top?: Window;
  Math?: Math;
  window?: Window;
  Windows?: any;

  addEventListener?(type: string, handler: EventListener, useCapture?: boolean): void;
  getComputedStyle?(elt: Element, pseudoElt?: string): CSSStyleDeclaration;
  setTimeout?(expression: any, msec?: number, language?: any): number;

  setImmediate?: () => any;
  msWriteProfilerMark?: (profilemark?:string) => any;
  msGetWeakWinRTProperty?:any;
  msSetWeakWinRTProperty?:any;
  Debug?:any;
  navigator?:any;
  clearTimeout:any;
}

'use strict'
var _global: Global = this;


export = _global;
