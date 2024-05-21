import { useState } from "react";
import Sidebar from "../scenes/global/Sidebar";
import Topbar from "../scenes/global/Topbar";

function MainLayout({ children }) {
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <div
      className="app"
      style={{ display: "flex", height: "100vh", overflow: "hidden" }}
    >
      <Sidebar isSidebar={isSidebar} />
      <main className="content" style={{ flexGrow: 1, overflowY: "auto" }}>
        <Topbar setIsSidebar={setIsSidebar} />
        {children}
      </main>
    </div>
  );
}
export default MainLayout;
