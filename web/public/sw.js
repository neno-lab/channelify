const self = this;

self.addEventListener('push', (e) => {
  console.log('Push Notification Received: ', e);

  let data = { title: 'Bezveze!', content: 'Something New Happened!' };
  if (e.data) {
    data = JSON.parse(e.data.text());
  }

  let options = {
    body: data.content,
    dir: 'ltr',
    icon: '/../src/assets/images/Icon-96.png',
    badge: '/../src/assets/images/Icon-96.png',
    vibrate: [100, 50, 100],
  };

  e.waitUntil(self.registration.showNotification(data.title, options));
});
