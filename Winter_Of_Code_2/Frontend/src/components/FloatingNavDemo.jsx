import React, { useContext } from "react";
import { FloatingNav } from "./ui/floating-navbar";
import { IconHome, IconMessage, IconUser, IconVector } from "@tabler/icons-react";


import { Link, useNavigate } from "react-router-dom";
import { AppContent } from "../context/Appcontex";
import axios from "axios";


export function FloatingNavDemo() {

  const {userData, setuserData, isLoggedin} = useContext(AppContent)
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "About",
      link: "/about",
      icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Contact",
      link: "/contact",
      icon: (
        <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
    ...(!userData.isAccountVerified && isLoggedin
      ? [
          {
            name: "VerifyEmail",
            link: "/email-verify",
            icon: <IconVector className="h-4 w-4 text-neutral-500 dark:text-white" />,
          },
        ]
      : [])
  ];
  return (
    (<div className="relative  w-full">
      <FloatingNav navItems={navItems} />
    </div>)
  );
}
