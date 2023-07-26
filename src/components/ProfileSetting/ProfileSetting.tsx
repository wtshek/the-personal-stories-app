"use client";

import React, { FC, useState } from "react";

import clsx from "clsx";
import { signOut } from "next-auth/react";

import { Button } from "../Button";

type ProfileSettingProps = {
  email: string;
};

export const ProfileSetting: FC<ProfileSettingProps> = ({ email }) => {
  const [isMenuDisplayed, setIsMenuDisplayed] = useState(false);

  const showMenu = () => setIsMenuDisplayed(true);
  const hideMenu = () => setIsMenuDisplayed(false);

  return (
    <div className="relative mt-4 w-full">
      <div
        className={clsx(
          "invisible top-0 absolute z-10 flex flex-col bg-white p-4 -translate-y-full w-full border-gray-300 border-2 rounded-md mb-8 opacity-0 transition-opacity",
          { "!visible !opacity-100": isMenuDisplayed },
        )}
        onMouseDown={showMenu}
        onMouseLeave={hideMenu}
      >
        <div>Logged In as: {email}</div>
        <hr className="my-4" />
        {/* TODO: check if a post has been created already */}
        <button>Create New Story</button>
        <hr className="my-4" />
        <button>Edit Story</button>
        <hr className="my-4" />
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
      <Button className="w-full" onMouseEnter={showMenu}>
        ProfileSetting
      </Button>
    </div>
  );
};
