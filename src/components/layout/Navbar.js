
import Link from "next/link";
import { getLoggedIn } from "@/actions/cookie";
import RightItem from "./subComponent/RightItem";

const Navbar = () => {
  const user = getLoggedIn()
  
  return (
    <nav className="flex items-center  shadow-navbar  py-3 sticky top-0 w-full bg-white z-[50]">
      <div className="container">
        <div className="flex items-center justify-between">
          <div className="">
            <Link href="/" className="font-extrabold text-3xl text-amber-600">
              Ashish AK47
            </Link>
          </div>
          <RightItem user={user}/>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
