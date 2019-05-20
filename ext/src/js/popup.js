import "/node_modules/jquery/dist/jquery.min.js";

function init() {
  let isArray = $.isArray([]);
  window.alert(`is array? ${isArray}`);
}

document.addEventListener("DOMContentLoaded", init);

chrome.browserAction.setBadgeText({ text: "ON" });
