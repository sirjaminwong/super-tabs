import { useEffect, useState } from "react"

import styleText from "data-text:~/assets/style.scss"
import TabsPanel, {css} from "~components/tabs-panel";

function ContentIndex() {

  const [visible, setVisible] = useState(false);

useEffect(() => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if(event.key === 'Escape') {
      setVisible(false)
    }
    if(event.metaKey && event.shiftKey && event.code === 'KeyL') {
      setVisible(pre => !pre)
    }
  }
  document.addEventListener('keydown',handleKeyDown);
  return () => {
    document.removeEventListener('keydown',handleKeyDown);
  }
}, []);


  if (!visible) {
    return null
  }

  return (
    <div className="container">
      {/* <TabsPanel/> */}
    </div>
  )
}

export default ContentIndex


export const config = {
  matches: ['http://*/*', 'https://*/*', '<all_urls>'],
}


export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = styleText + css
  return style
}
