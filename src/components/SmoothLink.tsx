"use client";
import Link, { LinkProps } from "next/link";
import React, { PropsWithChildren } from "react";

type AnchorProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof LinkProps
>;
type ScrollLinkProps = AnchorProps & LinkProps & PropsWithChildren;

const ScrollLink = ({ children, ...props }: ScrollLinkProps) => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const targetId = e.currentTarget.href.replace(/.*\#/, "");
    const elem = document.getElementById(targetId);
    elem?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };
  return (
    <Link {...props} onClick={handleScroll}>
      {children}
    </Link>
  );
};
export default ScrollLink;
