import { useEffect, useState } from "react"

export const useTabs = () => {
  const [allTabs, setAllTabs] = useState<chrome.tabs.Tab[]>([])
  useEffect(() => {
    const updateAllTabs = () => {
        chrome.tabs.query({}, (tabs) => {
          setAllTabs(tabs)
        })
      }
    chrome.tabs.query({}, (tabs) => {
      setAllTabs(tabs)
    })
    chrome.tabs.onUpdated.addListener(updateAllTabs)
    chrome.tabs.onCreated.addListener(updateAllTabs)
    chrome.tabs.onRemoved.addListener(updateAllTabs)
    chrome.tabs.onMoved.addListener(updateAllTabs)
    chrome.tabs.onActivated.addListener(updateAllTabs)
    chrome.tabs.onDetached.addListener(updateAllTabs)
    chrome.tabs.onAttached.addListener(updateAllTabs)
    return () => {
      chrome.tabs.onUpdated.removeListener(updateAllTabs);
      chrome.tabs.onCreated.removeListener(updateAllTabs);
      chrome.tabs.onRemoved.removeListener(updateAllTabs);
      chrome.tabs.onMoved.removeListener(updateAllTabs);
      chrome.tabs.onActivated.removeListener(updateAllTabs);
      chrome.tabs.onDetached.removeListener(updateAllTabs);
      chrome.tabs.onAttached.removeListener(updateAllTabs);
    }
  }, [])

  useEffect(() => {
    const removeNewTab = (newTab) => {
      chrome.tabs.query({ url: "chrome://newtab/" }).then((allTabs) => {
        chrome.tabs.remove(allTabs.map((tab) => tab.id).filter(item=>item!==newTab.id))
      })
    }
    chrome.tabs.onCreated.addListener(removeNewTab)
    return () => {
      chrome.tabs.onCreated.removeListener(removeNewTab)
    }
  }, [])

  return allTabs
}
