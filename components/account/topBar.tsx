"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";

const AccountTopBar = (props: {
  operateButton: boolean;
  setOperateButton: () => void;
}) => {
  const router = useRouter();
  return (
    <div className="flex justify-between text-gray-400 items-center">
      <div onClick={() => router.back()}>
        {!props.operateButton && (
          <Icon icon={"oui:arrow-left"} fontSize={"1.5rem"} />
        )}
      </div>
      <div className="text-black">账号与安全</div>
      <p
        onClick={() => {
          props.setOperateButton();
        }}
      >
        {props.operateButton ? "完成" : "管理"}
      </p>
    </div>
  );
};

export default AccountTopBar;
