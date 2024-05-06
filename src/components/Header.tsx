import Link from "next/link";
import HeaderItems from "./HeaderItems";
import Image from "next/image";

export const Header = () => {
  return (
    <>
      <div className="bg-base-100">
        <div className="flex justify-center">
          <Link href={""}>
            <Image
              src="https://r.resimlink.com/9ZaNyUeMJC.png"
              alt=""
            />
          </Link>
        </div>
        <Image
          src="https://r.resimlink.com/g_VLcYPp.jpeg"
          alt=""
        />
      </div>
    </>
  );
};
