self.addEventListener("message", function (e) {
  self.registration.showNotification(e.data.title, {
    body: e.data.message,
    badge: "/apartment_icon_192.png",
  });
});
