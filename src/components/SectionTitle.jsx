import React from "react";

function SectionTitle({ title }) {
  return (
    <div className="flex gap-10 items-center py-10">
      <h1 className="px-20 text-5xl text-emerald-950 ">{title}</h1>
      <div className="w-80 h-[2px] bg-emerald-900"></div>
    </div>
  );
}

export default SectionTitle;
