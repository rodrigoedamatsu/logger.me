/**
 * @desc        logger.me helps you centralize and gain full control of your logs around the application.
 * @module      Logger
 * @version     v1.2.5
 *
 * @requires    console
 *
 * @author https://github.com/rodrigoedamatsu
 */
;(function (console) {
    'use strict';

    var Logger = {};
    var currNamespace;
    var config = {
        debug: true,
        namespace: {}
    };

    /**
     * Define a configuração externamente
     * @param _config
     */
    Logger.config = function (_config) {
        if (_config && typeof _config === 'object') {
            config.debug = _config.debug || config.debug;
            config.namespace = _config.namespace || config.namespace;
        }
    };

    /**
     * Cria um log com ou sem namespace
     */
    Logger.log = function log() {
        canShowDebug() && console.log.apply(console, setArguments.apply(this, arguments));
        currNamespace = null;
    };

    /**
     * Cria um warn com ou sem namespace
     */
    Logger.warn = function warn() {
        canShowDebug() && console.warn.apply(console, setArguments.apply(this, arguments));
        currNamespace = null;
    };

    /**
     * Cria um info com ou sem namespace
     */
    Logger.info = function info() {
        canShowDebug() && console.info.apply(console, setArguments.apply(this, arguments));
        currNamespace = null;
    };

    /**
     * Cria um error com ou sem namespace
     */
    Logger.error = function error() {
        canShowDebug() && console.error.apply(console, setArguments.apply(this, arguments));
        currNamespace = null;
    };

    /**
     * Defini e cria o namespace
     * @param {String} _ns  namespace
     */
    Logger.ns = function namespace(_ns) {
        if (config.namespace) {
            config.namespace[_ns] = config.namespace[_ns] || {debug: true};
            currNamespace = _ns;
            expirationNamespaceSelected();
            return this;
        }
    };

    /**
     * Ativa o log global ou de um namespace específico
     */
    Logger.active = function () {
        toggleDebug(true);
    };

    /**
     * Desativa o log global ou de um namespace específico
     */
    Logger.inactive = function () {
        toggleDebug(false)
    };

    /**
     * Ativa e desativa os logs do namescpae ou de todos os logs
     * @param _status
     */
    function toggleDebug(_status) {
        if (currNamespace) {
            config.namespace[currNamespace].debug = _status;
        } else {
            config.debug = _status;
        }
    }

    /**
     * Reconstrói os argumentos caso tenha namespace
     * @returns {*}
     */
    function setArguments() {
        var arg = Array.prototype.slice.call(arguments);

        if (currNamespace) {
            arg.unshift(('@' + currNamespace + ':'));
        }

        return arg;
    }

    /**
     * Rule: O namespace selecionado é zerado caso não tenha um método chain utilizando-o
     */
    function expirationNamespaceSelected() {
        setTimeout(function () {
            currNamespace = null
        }, 0);
    }

    /**
     * Rule: Poderá exibir os logs - SE o debug geral estiver ativo E se estiver acessando algum namespace, deverá também estar ativo
     * @returns {boolean|*}
     */
    function canShowDebug() {
        return config.debug && ((currNamespace && config.namespace[currNamespace].debug) || !currNamespace);
    }

    window.Logger = Logger;
})(console);