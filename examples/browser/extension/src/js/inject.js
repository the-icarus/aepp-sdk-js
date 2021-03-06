import BrowserRuntimeConnection
  from 'AE_SDK_MODULES/utils/aepp-wallet-communication/connection/browser-runtime'
import BrowserWindowMessageConnection
  from 'AE_SDK_MODULES/utils/aepp-wallet-communication/connection/browser-window-message'
import { getBrowserAPI } from 'AE_SDK_MODULES/utils/aepp-wallet-communication/helpers'
import { MESSAGE_DIRECTION } from 'AE_SDK_MODULES/utils/aepp-wallet-communication/schema'
import ContentScriptBridge from 'AE_SDK_MODULES/utils/aepp-wallet-communication/content-script-bridge'

const readyStateCheckInterval = setInterval(function () {
  if (document.readyState === 'complete') {
    clearInterval(readyStateCheckInterval)

    const port = getBrowserAPI().runtime.connect()
    const extConnection = BrowserRuntimeConnection({
      connectionInfo: {
        description: 'Content Script to Extension connection',
        origin: window.origin
      },
      port
    })
    const pageConnection = BrowserWindowMessageConnection({
      connectionInfo: {
        description: 'Content Script to Page  connection',
        origin: window.origin
      },
      origin: window.origin,
      sendDirection: MESSAGE_DIRECTION.to_aepp,
      receiveDirection: MESSAGE_DIRECTION.to_waellet
    })

    const bridge = ContentScriptBridge({ pageConnection, extConnection })
    bridge.run()
  }
}, 10)
