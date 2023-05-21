
import '~styles/reset.css'
import { tabManageUrl } from "~constants";

function IndexPopup() {
  return (
    <div>
      <div className="text-lg">super Tabs </div>
      <div className="text-lg">
        <a href={tabManageUrl}>Tab Manager</a>
      </div>
    </div>
  )
}

export default IndexPopup
