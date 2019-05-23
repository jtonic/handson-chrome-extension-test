chrome.runtime.onInstalled.addListener(async function() {
  const settingsPath = chrome.runtime.getURL("src/settings/settings.json");
  const json = await fetch(settingsPath).then(result => result.json());
  console.log("settings", settingsPath, json);

  chrome.notifications.create({
    type: "basic",
    iconUrl: "assets/drink_water16.png",
    title: "Time to Hydrate",
    message: "Everyday I'm Guzzlin'!",
    buttons: [{ title: "Keep it Flowing." }],
    priority: 0
  });

  chrome.tabs.onUpdated.addListener(function callback(_, changeInfo, _) {
    console.log("changeInfo", changeInfo);
    if (
      changeInfo.url &&
      changeInfo.url.startsWith("https://mail.google.com")
    ) {
      chrome.browserAction.setBadgeText({ text: "ON" });
    }
  });

  chrome.tabs.onRemoved.addListener(function callback(_, _) {
    chrome.tabs.query({ url: "*://mail.google.com/*" }, tabs => {
      console.log("tabs", tabs);
      if (tabs.length < 1) {
        chrome.browserAction.setBadgeText({ text: "" });
      }
    });
  });
});
