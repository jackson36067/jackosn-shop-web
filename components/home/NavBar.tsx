"use client";

import Link from "next/link";

interface NavBarMenuItem {
  img: string;
  alt: string;
  path: string;
}

const NavBar = (props: { NavBarMenuItems: NavBarMenuItem[] }) => {
  return (
    <div className="w-full flex justify-around items-center py-5 bg-white">
      {props.NavBarMenuItems.map((item, index) => {
        return (
          <Link key={index} className="flex flex-col" href={item.path}>
            <img src={item.img} alt={item.alt} />
          </Link>
        );
      })}
    </div>
  );
};
export default NavBar;
