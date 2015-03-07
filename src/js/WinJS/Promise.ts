  'use strict';
  import _Base = require('./Core/_Base');
  import _StateMachine = require('./Promise/_StateMachine');

    _Base.Namespace.define("WinJS", {
        Promise: _StateMachine.Promise
    });

    var _export = _StateMachine.Promise;
    export = _export;
