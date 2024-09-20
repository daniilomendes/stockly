"use client";

import Link from "next/link";
import { Button } from "./ui/button";

import { usePathname } from "next/navigation";
import React from "react";

interface SidebarButtonProps {
  children: React.ReactNode;
  href: string;
}

const SideBarButton = ({ href, children }: SidebarButtonProps) => {
  const pathName = usePathname();

  return (
    <Button
      variant={pathName === `${href}` ? "secondary" : "ghost"}
      className="justify-start gap-2"
      asChild
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
};

export default SideBarButton;
