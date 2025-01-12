import React from "react";

export default function Avatar() {
  return (
    <>
      <div className="flex flex-row justify-between items-center bg-base-100 h-10 w-40 rounded-lg">
        <span>text1</span>
        <div className="w-14 rounded-full">
          <img
            className="rounded-full"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          />
        </div>
        <span>text2</span>
      </div>
    </>
  );
}
