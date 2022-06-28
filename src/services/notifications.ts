import axios from "axios"

async function login(){
  return instance.post("login", {"email":"c@c.com", password:"password"})
}

const instance = axios.create({withCredentials:true, baseURL:"https://ubernathan.sleepycat.date", headers: {
  'Content-Type': 'application/json',
}})

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

async function setupServiceWorker (url: string) {
  console.log("oui1")
  console.log(await login())
  console.log("oui2")
  // register service worker
  const register = await navigator.serviceWorker.register('./pushWorker.js', {
    scope: '/'
  })
  console.log("oui5")
  await navigator.serviceWorker.ready
  console.log("oui6")
  // register push
  await register.pushManager.getSubscription().then(sub => sub?.unsubscribe()).finally()
  const subscription =   (await register.pushManager.subscribe({
    userVisibleOnly: true,
    // public vapid key
    //applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    applicationServerKey:publicVapidKey
  }))
  console.log("subscription: ",subscription)
  // Send push notification
  await instance.post('/notifications/subscribe', {subscription}
  )
}

const publicVapidKey =
  'BMBYjGF0wds0nTPo7S-3E1KVyjuaW8XhJrL2p-yvkm1Pk3qeHovUZ7OaRCDfqRhe6hW8lg7qBl6KynM3dlrNt8c'

export function setupNotifications (url: string) {
  if ('serviceWorker' in navigator) {
    setupServiceWorker(url)
  }else{
    console.error("Service Workers are not available on this platform")
  }
}
