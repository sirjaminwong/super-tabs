import React, { useCallback } from "react"

import styleText from "data-text:./tabs-panel.module.scss"
import * as style from "./tabs-panel.module.scss"

import defaultIcon from "data-base64:~assets/chrome_logo_dark.svg"
import { useTabs } from "~hooks/useTabs"

export const css = styleText

const TabsPanel: React.FC<{}> = () => {

  const handleOpen = useCallback(
    (tab: chrome.tabs.Tab) => () => {
      chrome.tabs.update(tab.id, { active: true });
    },
    [],
  );

  const allTabs = useTabs()

  const filterTabs = allTabs.filter(tab => !tab.url?.startsWith('chrome://') && tab.active === false)

  return (
    <div className={style.container}>
      {filterTabs.map((tab) => (
        <div className={style.item} onClick={(handleOpen(tab))} key={tab.id}>
          <div className={style.content}>
            <img className={style.icon} src={tab.favIconUrl || defaultIcon} />  <span>{tab.title}</span>
          </div>
          <div className={style.actions} onClick={() => {
            chrome.tabs.remove(tab.id)
          }}>x</div>
        </div>
      ))}
    </div>
  )
}
export default React.memo(TabsPanel)
