"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const [providers, setProviders] = useState(null);
  const [dropToggle, setDropToggle] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      // console.log(res);
      setProviders(res);
    })();
  }, []);

  const { data: session } = useSession();
  // console.log();

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href={"/"} className="flex gap-2">
        <Image
          src={"/assets/images/logo.svg"}
          width={30}
          height={30}
          className="object-contain"
          alt="prompt"
        />
        <p className="logo_text">Promptpro</p>
      </Link>

      {/* desktop navication */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link className="black_btn" href={"/create-prompt"}>
              Create post
            </Link>

            <button className="outline_btn " type="button" onClick={signOut}>
              Sign out
            </button>
            <Link href={"/profile"}>
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                alt="profile"
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <div>
            {providers &&
              Object.values(providers).map((provider) => {
                console.log(provider);
                return (
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="black_btn"
                  >
                    Sign In
                  </button>
                );
              })}
          </div>
        )}
      </div>

      {/* mobile  navigation */}

      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={"/assets/icons/copy.svg"}
              width={37}
              height={37}
              alt="profile"
              className="rounded-full"
              onClick={() => {
                setDropToggle((prev) => !prev);
              }}
            />

            {dropToggle && (
              <div className="dropdown">
                <Link
                  href={"/profile"}
                  onClick={() => setDropToggle(false)}
                  className="dropdown_link "
                >
                  My profile
                </Link>
                <Link
                  href={"/create_profile"}
                  onClick={() => setDropToggle(false)}
                  className="dropdown_link "
                >
                  createprofile
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setDropToggle(false);
                    signOut();
                  }}
                  className="mt-2 w-full black_btn "
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        ) : (
          <div>
            {providers &&
              Object.values(providers).map((provider) => {
                return (
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="black_btn"
                  >
                    Sign In
                  </button>
                );
              })}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
