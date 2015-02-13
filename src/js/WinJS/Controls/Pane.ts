// Copyright (c) Microsoft Open Technologies, Inc.  All Rights Reserved. Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
/// <reference path="../../../../typings/require.d.ts" />

import _Base = require('../Core/_Base');
import _Pane = require('./Pane/_Pane');

var module: typeof _Pane = null;

function getModule() {
    if (!module) {
        require(["./Pane/_Pane"], (m: typeof _Pane) => {
            module = m;
        });
    }
    return module._Pane;
}

_Base.Namespace.define("WinJS.UI", {
    _Pane: {
        get: getModule
    }
});

var publicMembers = Object.create({}, {
    _Pane: {
        get: function () {
            return getModule();
        }
    }
});

export = publicMembers;
