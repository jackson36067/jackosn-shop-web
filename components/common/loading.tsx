"use client";
import { Icon } from "@iconify/react/dist/iconify.js";

const LoadingComponent = (props: { title: string }) => {
  return (
    <div className="fixed z-99999 inset-0 w-full h-full flex justify-center items-center bg-[rgba(0,0,0,0.8)]">
      <div className="flex flex-col justify-center items-center p-6 bg-[rgba(0,0,0,0.9)] rounded-md">
        <Icon
          icon="line-md:loading-twotone-loop"
          className="w-16 h-16 text-white"
        />
        <p className="text-white text-xl">{props.title}</p>
      </div>
    </div>
  );
};

export default LoadingComponent;
