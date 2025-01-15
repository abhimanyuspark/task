import React from "react";
import { FaEllipsisV } from "./Icons";
import { Menu, MenuButton, MenuItems } from "@headlessui/react";

const MenuOptions = ({ children }) => {
  return (
    <div className="text-black flex justify-end">
      <Menu>
        <MenuButton className="inline-flex items-center gap-2 rounded-sm bg-white p-2 text-sm/6 font-semibold shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-300 data-[open]:bg-white data-[focus]:outline-1 data-[focus]:outline-white border border-slate-300">
          <FaEllipsisV className="size-4" />
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="w-40 origin-top-right rounded-sm border border-slate-300 bg-white p-1 text-sm/6 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          {children}
        </MenuItems>
      </Menu>
    </div>
  );
};

export default MenuOptions;
