chrome.runtime.onInstalled.addListener(function() {
  alert("extension installed");
  chrome.notifications.create({
    type: "basic",
    iconUrl: "assets/drink_water16.png",
    title: "Time to Hydrate",
    message: "Everyday I'm Guzzlin'!",
    buttons: [{ title: "Keep it Flowing." }],
    priority: 0
  });
});
