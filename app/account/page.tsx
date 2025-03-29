"use client";

import AccountContent from "@/components/account/AccountContent";
import AccountTopBar from "@/components/account/topBar";
import { useState } from "react";

export default function AccountPage() {
  const [operateButton, setOperateButton] = useState<boolean>(false);
  const handleChangeOperateState = () => {
    setOperateButton(!operateButton);
  };
  return (
    <div className="px-3 py-5">
      <AccountTopBar
        operateButton={operateButton}
        setOperateButton={handleChangeOperateState}
      />
      <AccountContent operateState={operateButton} />
    </div>
  );
}
