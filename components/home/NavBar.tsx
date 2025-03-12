"use client";

import { NavBarMenuItem } from "@/types/column";
import Link from "next/link";

const NavBar = (props: { NavBarMenuItems: NavBarMenuItem[] }) => {
  return (
    <div className="w-full flex justify-around items-center py-5 bg-white">
      {props.NavBarMenuItems.map((item, index) => {
        return (
          <Link
            key={index}
            className="flex flex-col items-center"
            href={item.path}
          >
            <img src={item.bgPic} className="w-10 h-10" />
            <div>{item.name}</div>
          </Link>
        );
      })}
    </div>
  );
};
export default NavBar;
