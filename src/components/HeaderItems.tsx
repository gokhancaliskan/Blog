import Link from "next/link";
import React from "react";

const HeaderItems = () => {
  return (
    <div className="bg-base-300 flex flex-col gap-4 sm:text-lg h-full justify-center">
      <div>
        <Link href={"/blog"}>BLOG</Link>
      </div>
      <div>
        <Link href={"/projects"}>PROJELER</Link>
      </div>
      <div>
        <Link href={"/cv"}>ÖZGEÇMİŞ</Link>
      </div>
      <div>
        <Link href={"/contact"}>İLETİŞİM</Link>
      </div>
    </div>
  );
};

export default HeaderItems;
