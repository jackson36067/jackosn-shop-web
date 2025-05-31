"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";

const PaymentCompleteTopBar = () => {
  const router = useRouter();
  return (
    <div className="p-3">
      <div className="flex justify-between items-center">
        <Icon
          icon={"material-symbols:keyboard-arrow-left"}
          fontSize={"1.6rem"}
          onClick={() => router.push("/my")}
        />
        <Icon icon={"icon-park-outline:more"} fontSize={"1.6rem"} />
      </div>
    </div>
  );
};
export default PaymentCompleteTopBar;
