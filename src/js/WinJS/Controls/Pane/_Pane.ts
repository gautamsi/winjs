// Copyright (c) Microsoft Open Technologies, Inc.  All Rights Reserved. Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
/// <reference path="../../Core.d.ts" />
import Animations = require("../../Animations");
import Promise = require("../../Promise");
import _Base = require("../../Core/_Base");
import _BaseUtils = require("../../Core/_BaseUtils");
//import _Constants = require("../ToolBar/_Constants");
import _Control = require("../../Utilities/_Control");
import _Dispose = require("../../Utilities/_Dispose");
import _ElementUtilities = require("../../Utilities/_ElementUtilities");
import _Global = require("../../Core/_Global");
import _WriteProfilerMark = require("../../Core/_WriteProfilerMark");

//require(["require-style!less/styles-toolbar"]);
//require(["require-style!less/colors-toolbar"]);

"use strict";

var _Constants = {
    controlCssClass: "win-pane",
    contentClass: "win-pane-content",

    closedDisplayNoneClass: "win-pane-none",
    closedDisplayMinimalClass: "win-pane-minimal",
    closedDisplayCompactClass: "win-pane-compact",
    closedDisplayFullClass: "win-pane-full",

    closedDisplayModes: {
        none: "none",
        minimal: "minimal",
        compact: "compact",
        full: "full",
    }
};


/// <field>
/// <summary locid="WinJS.UI.ToolBar">
/// Represents a toolbar for displaying commands.
/// </summary>
/// </field>
/// <icon src="ui_winjs.ui.toolbar.12x12.png" width="12" height="12" />
/// <icon src="ui_winjs.ui.toolbar.16x16.png" width="16" height="16" />
/// <htmlSnippet supportsContent="true"><![CDATA[<div data-win-control="WinJS.UI.ToolBar">
/// <button data-win-control="WinJS.UI.Command" data-win-options="{id:'',label:'example',icon:'back',type:'button',onclick:null,section:'primary'}"></button>
/// </div>]]></htmlSnippet>
/// <part name="toolbar" class="win-toolbar" locid="WinJS.UI.ToolBar_part:toolbar">The entire ToolBar control.</part>
/// <part name="toolbar-overflowbutton" class="win-toolbar-overflowbutton" locid="WinJS.UI.ToolBar_part:ToolBar-overflowbutton">The toolbar overflow button.</part>
/// <part name="toolbar-overflowarea" class="win-toolbar-overflowarea" locid="WinJS.UI.ToolBar_part:ToolBar-overflowarea">The container for toolbar commands that overflow.</part>
/// <resource type="javascript" src="//$(TARGET_DESTINATION)/js/WinJS.js" shared="true" />
/// <resource type="css" src="//$(TARGET_DESTINATION)/css/ui-dark.css" shared="true" />
export class _Pane {
    private _id: string;
    private _disposed: boolean;
    private _element: HTMLElement;
    private _contentElement: HTMLElement;
    private _closedDisplayMode: string;

    /// <field type="HTMLElement" domElement="true" hidden="true" locid="WinJS.UI.ToolBar.element" helpKeyword="WinJS.UI.ToolBar.element">
    /// Gets the DOM element that hosts the ToolBar.
    /// </field>
    get element() {
        return this._element;
    }

    set closedDisplayMode(value: string) {
        this._closedDisplayMode = value;

        _ElementUtilities.removeClass(this._element, _Constants.closedDisplayNoneClass);
    }

    constructor(element?: HTMLElement, options: any = {}) {
        /// <signature helpKeyword="WinJS.UI.ToolBar.ToolBar">
        /// <summary locid="WinJS.UI.ToolBar.constructor">
        /// Creates a new ToolBar control.
        /// </summary>
        /// <param name="element" type="HTMLElement" domElement="true" locid="WinJS.UI.ToolBar.constructor_p:element">
        /// The DOM element that will host the control.
        /// </param>
        /// <param name="options" type="Object" locid="WinJS.UI.ToolBar.constructor_p:options">
        /// The set of properties and values to apply to the new ToolBar control.
        /// </param>
        /// <returns type="WinJS.UI.ToolBar" locid="WinJS.UI.ToolBar.constructor_returnValue">
        /// The new ToolBar control.
        /// </returns>
        /// </signature>

        // Make sure there's an element
        this._element = element || _Global.document.createElement("div");

        // Attaching JS control to DOM element
        this._element["winControl"] = this;

        this._id = this._element.id || _ElementUtilities._uniqueID(this._element);
        this._writeProfilerMark("constructor,StartTM");

        if (!this._element.hasAttribute("tabIndex")) {
            this._element.tabIndex = -1;
        }

        // Attach our css class.
        _ElementUtilities.addClass(this._element, _Constants.controlCssClass);

        this._disposed = false;
        _ElementUtilities.addClass(this._element, "win-disposable");

        this._setupTree();

        _Control.setOptions(this, options);

        this._writeProfilerMark("constructor,StopTM");

        return this;
    }

    dispose() {
        /// <signature helpKeyword="WinJS.UI._Pane.dispose">
        /// <summary locid="WinJS.UI._Pane.dispose">
        /// Disposes this _Pane.
        /// </summary>
        /// </signature>
        if (this._disposed) {
            return;
        }

        _Dispose.disposeSubTree(this.element);
        this._disposed = true;
    }

    private _writeProfilerMark(text: string) {
        _WriteProfilerMark("WinJS.UI.ToolBar:" + this._id + ":" + text);
    }

    private _setupTree() {
        this._writeProfilerMark("_setupTree,info");

        // Reparent contents
        this._contentElement = document.createElement("DIV");
        _ElementUtilities.addClass(this._contentElement, _Constants.contentClass);
        while (this._element.firstElementChild) {
            this._contentElement.appendChild(this._element.firstElementChild);
        }
        this._element.appendChild(this._contentElement);
    }

    static supportedForProcessing: boolean = true;
}

// addEventListener, removeEventListener, dispatchEvent
_Base.Class.mix(_Pane, _Control.DOMEventMixin);
