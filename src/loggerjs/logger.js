/***
 * @module   Logger
 *
 * @author rodrigo.edamatsu@mstech.com.br
 */
;(function () {
    'use strict';

    var Logger = {};

    var currNamespace;

    window.config = {
        debug: true,
        namespace: {}
    };

    /**
     *
     * @param _config
     */
    Logger.config = function (_config) {
        if (_config && typeof _config === 'object') {
            config.debug = _config.debug || config.debug;
            config.namespace = _config.namespace || config.namespace;
        }
    };

    /**
     *
     */
    Logger.log = function log() {
        canShowDebug() && console.log.apply(console, arguments);
        currNamespace = null;
    };

    /**
     *
     */
    Logger.warn = function warn() {
        canShowDebug() && console.warn.apply(console, arguments);
    };

    /**
     *
     */
    Logger.info = function info() {
        canShowDebug() && console.info.apply(console, arguments);
    };

    /**
     *
     */
    Logger.error = function error() {
        canShowDebug() && console.error.apply(console, arguments);
    };

    /**
     * Create namespace for debug
     */
    Logger.ns = function namespace(_ns) {

        if (config.namespace) {
            config.namespace[_ns] = config.namespace[_ns] || {debug: true};
            currNamespace = config.namespace[_ns];
            expirationNamespaceSelected();
            return this;
        }
    };

    Logger.active = function () {
        if (currNamespace) {
            currNamespace.debug = true;
        } else {
            config.debug = true;
        }
    };

    Logger.inactive = function () {
        if (currNamespace) {
            currNamespace.debug = false;
        } else {
            config.debug = false;
        }
    };

    /**
     * Rule: O namespace selecionado é zerado caso não tenha um método chain utilizando
     */
    function expirationNamespaceSelected () {
        setTimeout(function () {
            currNamespace = null
        }, 100);
    }

    /**
     * Rule: Se o debug geral estiver ativo e se estiver acessando por namespace deve também estar ativo
     * @returns {boolean|*}
     */
    function canShowDebug() {
        return config.debug && ((currNamespace && currNamespace.debug) || !currNamespace);
    }

    window.Logger = Logger;
})();