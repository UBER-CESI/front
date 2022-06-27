/* eslint-disable no-restricted-globals */
self.addEventListener("push", (e) => {
    const data = e.data.json();
    console.log(data)
    self.registration.showNotification(
        data.title, // title of the notification
        {
            body: data.body, //the body of the push notification
            image:
                data.image,
            icon: data.icon, // icon
        }
    );
});