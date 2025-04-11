"use client";

import { Icon } from "@iconify/react/dist/iconify.js";

const PaymentCompleteTopBar = () => {
  return (
    <div className="p-3">
      <div className="flex justify-between items-center">
        <Icon
          icon={"material-symbols:keyboard-arrow-left"}
          fontSize={"1.6rem"}
          onClick={() => window.history.back()}
        />
        <Icon icon={"icon-park-outline:more"} fontSize={"1.6rem"} />
      </div>
    </div>
  );
};
export default PaymentCompleteTopBar;
