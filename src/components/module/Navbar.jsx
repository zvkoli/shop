import Menubar from "./Menubar";
import { LiaShoppingCartSolid } from "react-icons/lia";
import { BiLogoFlickr } from "react-icons/bi";
import Searchbox from "../module/Searchbox";
import Link from "next/link";
import { ConfigProvider } from 'antd';
import { useState } from "react";
import { useEffect } from "react";
import AboutMessage from "./AboutMessage";

const Navbar = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetch("/api/customer")
    .then((res) => res.json())
    .then(data => {
      if(data.status === "success")  setIsLoggedIn(true);
    })
  },[isLoggedIn])

  const signOutHandler = async () => {
    const res = await fetch("/api/auth/signout");
    const data = await res.json();

    if(data.status === "success"){
      AboutMessage({ message: data.message });
    }else {
      AboutMessage({ message: data.message });
    }
  }

  return (
    <div className="w-full h-full flex flex-col justify-start items-center">
      <div className="w-full h-4/6 flex flex-row justify-between items-center px-10 bg-[#1A1A1A]">
        <div className="w-3/12 h-full flex flex-row justify-start items-center gap-1">
          <Link href={'/'} className="text-3xl text-[#FBCB07]">
              <BiLogoFlickr />
          </Link>
        </div>
        <div className="w-5/12 h-full flex flex-row justify-start items-center gap-1">
            <Searchbox />
        </div>
        <div className="w-4/12 h-full flex flex-row justify-end items-center gap-1">
              <Link href={'/cart'} className="w-1/3 h-10 flex flex-row justify-center items-center text-3xl text-[#FBCB07] bg-[#242424] p-5 rounded-md">
                <LiaShoppingCartSolid />
              </Link>
              {isLoggedIn === false ? (
              <Link href={'/signup'} className="w-1/3 h-10 flex flex-row justify-center items-center text-[14px] text-[#FBCB07] bg-[#242424] p-5 rounded-md">
              ثبت نام
              </Link>
              ) : (
              <button onClick={signOutHandler} className="w-1/3 h-10 flex flex-row justify-center items-center text-[14px] text-[#FBCB07] bg-[#242424] p-5 rounded-md">
                خروج
              </button>
              )}
        </div>
      </div>
      <div className="w-full h-2/6">
        <ConfigProvider direction="rtl">
          <Menubar />
        </ConfigProvider>
      </div>
    </div>
  );
}

export default Navbar;
