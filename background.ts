console.log('in background.ts');

chrome.runtime.onMessage.addListener(
  async (request, sender, sendResponse) => {
    console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
    if (request.type === 'getTabs') {
      const tabs =  await chrome.tabs.query({});
      sendResponse(tabs);
    }
  }
);