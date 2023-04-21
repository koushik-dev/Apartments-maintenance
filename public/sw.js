import { precacheAndRoute } from "workbox-window";

precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener("push", function (e) {
  console.log("Push Received...");
  self.registration.showNotification("Test Notification title", {
    body: "New Maintenance bill added to the apartments",
    badge: "/apartment_icon_192.png",
  });
});
