import React from "react";

function LeftSider() {
  return (
    <div className="fixed left-0 bottom-0 ml-4  sm:static">
      <div className="flex flex-col items-center gap-3">
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <i className="ri-facebook-circle-line  text-emerald-900 text-2xl"></i>
          <i className="ri-instagram-line text-emerald-900 text-2xl"></i>
          <i className="ri-linkedin-box-line  text-emerald-900 text-2xl"></i>
          <i className="ri-github-line  text-emerald-900 text-2xl"></i>
          <i className="ri-mail-line  text-emerald-900 text-2xl"></i>
        </div>
        <div className="w-[1px] h-32 bg-emerald-900 mt-3 sm:hidden"></div>
      </div>
    </div>
  );
}

export default LeftSider;
