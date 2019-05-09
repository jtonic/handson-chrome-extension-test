function init() {
  const cookies = chrome.cookies.getAll();
  if (Array.isArray(cookies) && cookies.length > 0) {
    window.alert(`1st cookie is ${cookies[0]}`);
  }
  window.alert(`no cookies: `);
}

document.addEventListener("DOMContentLoaded", init);
