const self = this;

self.addEventListener('push', (e) => {
  console.log('Push Notification Received: ', e);

  let data = { title: 'Bezveze!', content: 'Something New Happened!' };
  if (e.data) {
    data = JSON.parse(e.data.text());
  }

  let options = {
    body: data.content,
  };

  e.waitUntil(self.registration.showNotification(data.title, options));
});
