"use client";

import { NavBarMenuItem } from "@/types/column";
import Link from "next/link";

const NavBar = (props: { NavBarMenuItems: NavBarMenuItem[] }) => {
  return (
    <div className="w-full flex justify-around items-center flex-wrap py-5 gap-3">
      {props.NavBarMenuItems.map((item, index) => {
        return (
          <Link
            key={index}
            className="flex flex-col items-center gap-2 w-[16%] h-25"
            href={item.path}
          >
            <img src={item.bgPic} className="w-14 h-14" />
            <div className="text-[1rem]">{item.name}</div>
          </Link>
        );
      })}
    </div>
  );
};
export default NavBar;
