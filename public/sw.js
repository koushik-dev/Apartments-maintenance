self.addEventListener("message", function (e) {
  console.log(e);
  self.registration.showNotification("Test Notification title", {
    body: e.data,
    badge: "/apartment_icon_192.png",
  });
});
