chrome.runtime.onInstalled.addListener(() => {
  chrome.tabs.onActivated.addListener(async (info) => {
    const tab = await chrome.tabs.get(info.tabId);

    console.log(tab.url);

    const isYoutube = tab.url.startsWith("https://www.youtube.com/");
    isYoutube
      ? chrome.action.enable(tab.tabId)
      : chrome.action.disable(tab.tabId);
    console.log(isYoutube);
  });
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo) => {
  var tab = await chrome.tabs.get(tabId);
  if (tab.active && changeInfo.url) {
    const isYoutube = tab.url.startsWith("https://www.youtube.com/");
    isYoutube
      ? chrome.action.enable(tab.tabId)
      : chrome.action.disable(tab.tabId);
    console.log(isYoutube);
  }
});