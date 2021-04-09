javascript:(function(b){
    if(!!b.${injectedName}) return;
    console.log("${injectedName} initialization begin");
    var a = {queue: [], callback: function () {
            var d = Array.prototype.slice.call(arguments, 0);
            var c = d.shift();
            var e = d.shift();
            d[0] = decodeURIComponent(d[0]);
            this.queue[c].apply(this, d);
            if (!e) {
                delete this.queue[c];
            }
        }};

    var Android = {};
    var Unicom = {};

    ${allFuncName} function () {
        var f = Array.prototype.slice.call(arguments, 0);
        if (f.length < 1) {
            throw "${injectedName} call error, message:miss method name";
        }

        var e = [];
        var hasCB = false;
        var cbIdx = -1;
        for (var h = 1; h < f.length; h++) {
            var c = f[h];
            var j = typeof c;
            e[e.length] = j;
            if (j === "function") {
                hasCB = true;
                var cbIdx = a.queue.length;
                a.queue[cbIdx] = c;
                f[h] = cbIdx;
            }
        }
        var g = JSON.parse(prompt(JSON.stringify({method: f.shift(), types: e, args: f})));
        if (g.code !== 200) {
            if(hasCB && cbIdx>=0) delete a.queue[cbIdx];
            throw "call error, code:" + g.code + ", message:" + g.result;
        }
        return g.result;
    };
    Object.getOwnPropertyNames(a).forEach(function (d) {
        var c = a[d];
        if (typeof c === "function" && d !== "callback") {
            a[d] = function () {
                return c.apply(a, [d].concat(Array.prototype.slice.call(arguments, 0)));
            };
        }
    });

    Object.getOwnPropertyNames(Android).forEach(function (d) {
        var c = Android[d];
        if (typeof c === "function" && d !== "callback") {
            Android[d] = function () {
                return c.apply(Android, [d].concat(Array.prototype.slice.call(arguments, 0)));
            };
        }
    });

    Object.getOwnPropertyNames(Unicom).forEach(function (d) {
        var c = Unicom[d];
        if (typeof c === "function" && d !== "callback") {
            Unicom[d] = function () {
                return c.apply(Unicom, [d].concat(Array.prototype.slice.call(arguments, 0)));
            };
        }
    });

    var _MESSAGE_TYPE = '__msg_type',
        _EVENT_ID = '__event_id',
        _PARAMS = '__params',
        _CUSTOM_PROTOCOL_SCHEME = 'qlive',
        _JSON_MESSAGE = '__json_message';

    var _event_hook_map = {};

    function _handleMessageFromQQLive(message){
        var msgWrap = message[_JSON_MESSAGE];
        if(!msgWrap) return;
        switch(msgWrap[_MESSAGE_TYPE]){
            case 'event':
            {
                if (typeof msgWrap[_EVENT_ID] === 'string' && typeof _event_hook_map[msgWrap[_EVENT_ID]] === 'function') {
                    var ret = _event_hook_map[msgWrap[_EVENT_ID]](msgWrap[_PARAMS]);
                }
            }
        }
    }

    function _on(event, callback){
        if (!event || typeof event !== 'string') {
            return;
        }
        if (typeof callback !== 'function') {
            return;
        }
        _event_hook_map[event] = callback;
        _invoke("registListener", {"eventName":event});
    }

    function _checkJsApi(param, callback){
        if (typeof callback !== 'function') {
            return;
        }
        var errCode = 0;
        var errMsg = "";
        var result = {};
        var methodName;
        var methodArray;
        if(typeof param === 'object'){
            methodArray = param['apiList'];
        }

        if(get_type(methodArray) === 'array'){
            for(var i=0;i<methodArray.length;i++){
                methodName = methodArray[i];
                result[methodName] = !!(a[methodName]);
            }
        }else{
            errCode = -1;
            errMsg = 'param error';
        }
        var ret = {'errCode':errCode ,'errMsg': errMsg,'result': result};
        callback(ret);
    }

    var defaultCallbackFun = function(){};

    function _invoke(methodName, params, callback){
        if (!methodName || typeof methodName !== 'string') {
            return;
        };
        if(methodName === 'checkApi'){
            _checkJsApi(params, callback);
            return;
        }
        if(a[methodName]){
            if(typeof callback !== 'function'){
                callback = defaultCallbackFun;
            }
            if (params != null && params !== undefined) {
                a[methodName](params, callback);
            } else {
                a[methodName](callback);
            }
        }
    }

    function get_type(variable) {
        return Object.prototype.toString.call(variable).slice(8, -1).toLowerCase();
    }

    a.invoke = _invoke;
    a.on = _on;
    a._handleMessageFromQQLive = _handleMessageFromQQLive;

    b.${injectedName} = a;
    b.Android = Android;
    b.Unicom = Unicom;

    var readyEvent = document.createEvent('Events');
    readyEvent.initEvent('onTJSBridgeReady');
    document.dispatchEvent(readyEvent);

    console.log("${injectedName} initialization end");
})(window);
