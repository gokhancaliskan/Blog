import Link from "next/link";
import HeaderItems from "./HeaderItems";

export const Header = () => {
  return (
    <>
      <div className="sm:hidden navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">
            GÖKHAN ÇALIŞKAN
          </a>
        </div>
        <div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <Link href="/admin">
                  <img
                    alt="Profile image"
                    src="https://lh3.googleusercontent.com/a/ACg8ocITytoUvJ5E2jAnKhg2L9G4kVqeHWN2SUETsIMXbpNJPGXCBqA=s389-c-no"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden sm:flex rounded-right h-screen">
        <div className="bg-base-200 min-w-52 flex flex-col gap-4 items-center">
          <div className="">
            <img
              className="w-52"
              src="https://pbs.twimg.com/profile_images/1632151472174505984/csJmSR7__400x400.jpg"
              alt="ben"
            />
          </div>
          <HeaderItems />
        </div>
        <div>aaaa</div>
      </div>
    </>
  );
};
