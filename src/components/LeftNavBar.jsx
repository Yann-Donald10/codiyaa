import React, { useRef, useEffect } from "react";
import "../css/LeftNavBar.css";

export default function LeftNavLayout() {
  const sidebarRef = useRef(null);
  const resizerRef = useRef(null);

  useEffect(() => {
    const sidebar = sidebarRef.current;
    const resizer = resizerRef.current;

    if (!sidebar || !resizer) return;

    let x = 0;
    let sidebarWidth = sidebar.offsetWidth;

    const onMouseMove = (e) => {
      const dx = e.clientX - x;
      x = e.clientX;
      sidebarWidth = sidebarWidth + dx;

      if (sidebarWidth < 150) sidebarWidth = 150; // min width
      if (sidebarWidth > 2000) sidebarWidth = 2000; // max width

      sidebar.style.width = `${sidebarWidth}px`;
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    const onMouseDown = (e) => {
      x = e.clientX;
      sidebarWidth = sidebar.offsetWidth;
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    };

    resizer.addEventListener("mousedown", onMouseDown);

    return () => {
      resizer.removeEventListener("mousedown", onMouseDown);
    };
  }, []);

  return (
    <div className="layout-container">
      
      <div ref={sidebarRef} className="sidebar">
        <h1>project_name</h1>
        <p>Navigation…</p>
      </div>

      <div ref={resizerRef} className="resizer" />

      <div className="content">
        <h2>Zone de contenu</h2>
        <p>Ceci représente le reste de ta page.</p>
      </div>

    </div>
  );
}
