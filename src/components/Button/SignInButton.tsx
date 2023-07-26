"use client";

import React, { FC } from "react";

import { signIn } from "next-auth/react";

import { Button } from "./Button";

type SignInButtonProps = {
  className?: string;
};

export const SignInButton: FC<SignInButtonProps> = ({ className }) => {
  return (
    <Button onClick={() => signIn()} className={className}>
      Sign In
    </Button>
  );
};
