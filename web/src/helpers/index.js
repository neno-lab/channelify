export const urlBase64ToUint8Array = (base64String) => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

export const displayConfirmNotification = () => {
  if ('serviceWorker' in navigator) {
    let options = {
      body: 'You successfully subscribed to our Notification service!',
    };

    navigator.serviceWorker.ready.then((swreg) => {
      swreg.showNotification('Succefully subscribed!', options);
    });
  }
};

export const configurePushSub = () => {
  return;
};

export const askForNotificationPermission = () => {
  Notification.requestPermission((result) => {
    if (result !== 'granted') {
      console.log('User Denied Notifications!');
    } else {
      // displayConfirmNotification();
      // configurePushSub()
    }
  });
};
