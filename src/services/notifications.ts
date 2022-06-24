function urlBase64ToUint8Array (base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

async function setupServiceWorker () {
  // register service worker
  const register = await navigator.serviceWorker.register('./pushWorker.js', {
    scope: '/'
  })
  await navigator.serviceWorker.ready
  // register push
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,

    // public vapid key
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  })
  // Send push notification
  await fetch('http://127.0.0.1:8080/subscribe', {
    method: 'POST',
    body: JSON.stringify({subscription}),
    headers: {
      'content-type': 'application/json'
    }
  })
}

const publicVapidKey =
  'BKGyLVKB2CavcJxo59dc8nZ-Kv_toI2lcbQ3fpWslaaQM3m9Nd9ozGmbAq8FOPLqFYxswrYtoEbbFrccp3nQY6U'

export function setupNotifications () {
  if ('serviceWorker' in navigator) {
    setupServiceWorker().catch((err) => console.error(err))
  }else{
    console.error("Service Workers are not available on this platform")
  }
}
