import Image from "next/image";
import { HomeIcon, SearchIcon, StarIcon } from "@heroicons/react/solid";
import { signIn, signOut, useSession } from "next-auth/client";
import { useRouter } from "next/router";

const Header = () => {
  const [session] = useSession();
  const router = useRouter();

  return (
    <header className="sticky bg-[#040714] top-0 z-[1000] flex items-center px-10 md:px-12 h-[72px]">
      <Image
        src="/images/logo.svg"
        alt=""
        width={80}
        height={80}
        className="cursor-pointer"
        onClick={() => router.push("/")}
      />
      {session && (
        <div className="hidden ml-10 md:flex items-center space-x-6">
          <a className="header-link" onClick={() => router.push("/")}>
            <HomeIcon className="h-4 group" />
            <span className="span">Home</span>
          </a>
          <a className="header-link group">
            {/* <input type="search" className="" /> */}
            <SearchIcon className="h-4" />
            <span className="span">Search</span>
          </a>
          <a
            className="header-link group"
            onClick={() => router.push("/artist")}
          >
            <StarIcon className="h-4" />
            <span className="span">Artist</span>
          </a>
          {/* <a className="header-link group">
            <StarIcon className="h-4" />
            <span className="span">Originals</span>
          </a>
          <a className="header-link group">
            <img src="/images/movie-icon.svg" alt="" className="h-5" />
            <span className="span">Movies</span>
          </a>
          <a className="header-link group">
            <img src="/images/series-icon.svg" alt="" className="h-5" />
            <span className="span">Series</span>
          </a> */}
        </div>
      )}
      {!session ? (
        <button
          className="ml-auto uppercase border px-4 py-1.5 rounded font-medium tracking-wide hover:bg-white hover:text-black transition duration-200"
          onClick={() => signIn()}
        >
          Login
        </button>
      ) : (
        <img
          src={session?.user?.image as string}
          className="ml-auto h-12 w-12 rounded-full object-cover cursor-pointer"
          onClick={() => signOut()}
          alt="profile"
        />
      )}
    </header>
  );
};

export default Header;
