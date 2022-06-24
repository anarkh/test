;(function () {
  if (window.WebViewJavascriptBridge) { return }

  let messagingIframe
  let sendMessageQueue = []
  let receiveMessageQueue = []
  const messageHandlers = {}

  const CUSTOM_PROTOCOL_SCHEME = 'wvjbscheme'
  const QUEUE_HAS_MESSAGE = '__WVJB_QUEUE_MESSAGE__'

  const responseCallbacks = {}
  let uniqueId = 1

  function _createQueueReadyIframe (doc) {
    messagingIframe = doc.createElement('iframe')
    messagingIframe.style.display = 'none'
    messagingIframe.src = CUSTOM_PROTOCOL_SCHEME + '://' + QUEUE_HAS_MESSAGE
    doc.documentElement.appendChild(messagingIframe)
  }

  function init (messageHandler) {
    if (WebViewJavascriptBridge._messageHandler) { throw new Error('WebViewJavascriptBridge.init called twice') }
    WebViewJavascriptBridge._messageHandler = messageHandler

    const receivedMessages = receiveMessageQueue
    receiveMessageQueue = null

    // 逻辑优化，增加一个保护，tencent:jiachunke(20150328)
    if (receivedMessages) {
      for (let i = 0; i < receivedMessages.length; i++) {
        _dispatchMessageFromObjC(receivedMessages[i])
      }
    }
  }

  function send (data, responseCallback) {
    _doSend({ data: data }, responseCallback)
  }

  function registerHandler (handlerName, handler) {
    messageHandlers[handlerName] = handler
  }

  function callHandler (handlerName, data, responseCallback) {
    _doSend({ handlerName: handlerName, data: data }, responseCallback)
  }

  function _doSend (message, responseCallback) {
    if (responseCallback) {
      const callbackId = 'cb_' + (uniqueId++) + '_' + new Date().getTime()
      responseCallbacks[callbackId] = responseCallback
      message.callbackId = callbackId
    }
    sendMessageQueue.push(message)
    messagingIframe.src = CUSTOM_PROTOCOL_SCHEME + '://' + QUEUE_HAS_MESSAGE
  }

  function _fetchQueue () {
    const messageQueueString = JSON.stringify(sendMessageQueue)
    sendMessageQueue = []
    return messageQueueString
  }

  function _dispatchMessageFromObjC (messageJSON) {
    setTimeout(function _timeoutDispatchMessageFromObjC () {
      const message = JSON.parse(messageJSON)
      let messageHandler
      let responseCallback

      if (message.responseId) {
        responseCallback = responseCallbacks[message.responseId]
        if (!responseCallback) { return }
        responseCallback(message.responseData)
        delete responseCallbacks[message.responseId]
      } else {
        if (message.callbackId) {
          const callbackResponseId = message.callbackId
          responseCallback = function (responseData) {
            _doSend({ responseId: callbackResponseId, responseData: responseData })
          }
        }

        let handler = WebViewJavascriptBridge._messageHandler
        if (message.handlerName) {
          handler = messageHandlers[message.handlerName]
        }

        try {
          handler(message.data, responseCallback)
        } catch (exception) {
          if (typeof console !== 'undefined') {
            console.log('WebViewJavascriptBridge: WARNING: javascript handler threw.', message, exception)
          }
        }
      }
    })
  }

  function _handleMessageFromObjC (messageJSON) {
    if (receiveMessageQueue) {
      receiveMessageQueue.push(messageJSON)
    } else {
      _dispatchMessageFromObjC(messageJSON)
    }
  }

  window.WebViewJavascriptBridge = {
    init: init,

    send: send,
    registerHandler: registerHandler,
    callHandler: callHandler,

    // JSBridge框架接口扩展，多平台统一接口，tencent:jiachunke(20150328)
    on: registerHandler,
    invoke: callHandler,

    _fetchQueue: _fetchQueue,
    _handleMessageFromObjC: _handleMessageFromObjC
  }

  // JSBridge框架接口扩展，多平台统一接口，tencent:jiachunke(20150328)
  window.TenvideoJSBridge = WebViewJavascriptBridge
  // JSBridge框架接口扩展，多平台统一接口，需要主动做一次初始化，tencent:jiachunke(20150328)
  TenvideoJSBridge.init(null)

  const doc = document

  // JSBridge框架接口扩展，多平台统一接口，tencent:jiachunke(20150328)
  _createQueueReadyIframe(doc)
  const readyEventExt = doc.createEvent('Events')
  readyEventExt.initEvent('onTenvideoJSBridgeReady')
  readyEventExt.bridge = TenvideoJSBridge
  doc.dispatchEvent(readyEventExt)
})()
