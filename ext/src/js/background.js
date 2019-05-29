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

  if (chrome.commands) {
    chrome.commands.getAll(commands => {
      console.log("commands");
      commands.forEach(command => {
        console.log(command);
      });
    });
  }
});

chrome.commands.onCommand.addListener(function(command) {
  if (command === "duplicate-tab") {
    findCurrentTab().then(tabId => {
      console.log("Duplicate tab for id", tabId);
      chrome.tabs.duplicate(tabId);
    });
  }
});

function findCurrentTab() {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      console.log("tabs", tabs);
      console.log(Array.isArray(tabs) && tabs.length > 0);
      if (Array.isArray(tabs) && tabs.length > 0) {
        resolve(tabs[0].id);
      } else {
        reject(new Error("Current tab not found"));
      }
    });
  });
}
