"use client";

import Link from "next/link";

interface NavBarMenuItem {
  img: string;
  title: string;
  path: string;
}

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
            <img src={item.img} className="w-10 h-10" />
            <div>{item.title}</div>
          </Link>
        );
      })}
    </div>
  );
};
export default NavBar;
