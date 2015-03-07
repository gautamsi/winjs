'use strict';
var _Base = require('./Core/_Base');
var _StateMachine = require('./Promise/_StateMachine');
_Base.Namespace.define("WinJS", {
    Promise: _StateMachine.Promise
});
var _export = _StateMachine.Promise;
module.exports = _export;
