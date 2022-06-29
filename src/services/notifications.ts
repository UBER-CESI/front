import  {AxiosInstance} from "axios"

const publicVapidKey =
  'BGCOrjnq-FZXRZG-BKa9X0InZngKZOH8L4LHMurhZTLMUp2tearZ14RCx91U9lkf_ZVB-EbOub5_J0cZEig55gM'

export async function setupNotifications (instance:AxiosInstance, buildconf: (...arg0:any) => any) {
  if ('serviceWorker' in navigator) {
    // register service worker
    const register = await navigator.serviceWorker.register('/pushWorker.js', {
      scope: '/'
    })
    await navigator.serviceWorker.ready
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
    await instance(buildconf('notifications/subscribe',"POST", JSON.stringify({subscription})))
    //await instance.post('/notifications/subscribe', {subscription})
    
  }else{
    console.error("Service Workers are not available on this platform")
  }
}
//s
