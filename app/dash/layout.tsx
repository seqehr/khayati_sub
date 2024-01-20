"use client";
import React from "react";
import Image from "next/image";
type Props = {};

const layout = ({ children }) => {
  const handleContextMenu = (e) => {
    e.preventDefault(); // Prevent the default right-click behavior
    // Additional logic if needed
  };
  return (
    <div onContextMenu={handleContextMenu}>
      <div
        className="container flex flex-col pb-4 mx-auto lg:w-96 w-[90%] text-[12px] lg:text-base px-2"
        dir="rtl"
      >
        <Image
          src="/logo.png"
          alt=""
          className="mx-auto"
          width={100}
          height={100}
        />
        <p className="text-center"> اشتراک ویژه آکادمی لذت خیاطی </p>
        {children}
      </div>
    </div>
  );
};

export default layout;
