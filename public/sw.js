self.addEventListener("push", function (e) {
  console.log(e);
  self.registration.showNotification("Test Notification title", {
    body: "New Maintenance bill added to the apartments",
    badge: "/apartment_icon_192.png",
  });
});
