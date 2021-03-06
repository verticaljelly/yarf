'use strict';

require('./utils/consoleLog.js');
require('./utils/extend.js');
require('./utils/arrayTrim.js');
require('./utils/stringUpperCase.js');
require('./utils/objectIsEmpty.js');
var nodeNative = {
    http: require('http')
};
var externalLibs = {
    ws: require('ws')
};
var server = require('./Router.js');
var wsRouter = require('./WSRouter.js');
process.die = function(message){
    console.log(message);
    process.exit();
};
/**
 *
 * @param portNumber
 * @param pathToApplication
 * @param sslCfg SSL Configs must have key and cert anything else is ignored.s
 * @returns {boolean}
 */
exports.start = function (portNumber, pathToApplication, options) {
    if (typeof(portNumber) != "number") {
        return false;
    }
    if (typeof pathToApplication == 'undefined' || isEmpty(pathToApplication)) {
        console.log("invalid path to application:", pathToApplication);
        return false;
    }
    if (typeof options.mongo == 'undefined'){
        console.log('running without mongodb means no sessions');
    }
    var httpServer;
    if (typeof options.sslCfg == "undefined" || typeof options.sslCfg.key == "undefined" || typeof options.sslCfg.cert == "undefined") {
        httpServer = nodeNative.http.createServer(server.HTTPServerFunction(pathToApplication, options));
    } else {
        httpServer = nodeNative.http.createServer({key: options.sslCfg.key, cert: options.sslCfg.cert}, server.HTTPServerFunction(pathToApplication, options));
    }
    var pathToApp = pathToApplication;
    httpServer.listen(portNumber, "0.0.0.0");
    console.log('Server running at http://127.0.0.1:' + portNumber + '/');
};

exports.Controller = require("./Controller.js");
exports.View = require("./View.js");
//exports.Websocket = require('./Websocket.js');
exports.Mapper = require("./Mapper.js");
exports.Model = require("./Model.js"); // for now there's not much functionality in models
