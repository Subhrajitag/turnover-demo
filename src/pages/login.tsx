import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import Button from '~/components/Button'
import Swal from "sweetalert2";
import { api } from '~/utils/api'
import { setCookie } from 'cookies-next'
import getLoggedInUser from '~/utils/getLoggedInUser'

const Login = () => {
  const router = useRouter();
  const login = api.user.login.useMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Email field can't be empty",
        showConfirmButton: false,
        timer: 1500
      }).catch(() => {
        console.log("Error");
      });
      return;
    } else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(email)) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Enter a valid email!",
        showConfirmButton: false,
        timer: 1500
      }).catch(() => {
        console.log("Error");
      });
      return;
    } else if (!password) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Password field can't be empty",
        showConfirmButton: false,
        timer: 1500
      }).catch(() => {
        console.log("Error");
      });
      return;
    }

    try {
      if (email && password) {
        await login.mutateAsync({ email, password });
        const auth_token = login?.data?.jwtToken;
        setCookie("authorization", `Bearer ${auth_token}`);

        const loggedInUser = getLoggedInUser() as { id: number };

        if (loggedInUser) {
          router.push("/");
        }
      }
    } catch {
      console.log("error occured");

    }
  }

  return (
    <>
      <Head>
        <title>test-t3 | Login</title>
        <meta name="description" content="test-t3 home page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full h-screen">
        <div className="flex items-center justify-center mx-auto my-auto">
          <div className="w-full bg-white rounded-[20px] shadow md:mt-0 sm:max-w-lg xl:p-0 border-[1px] ">
            <div className=" space-y-4 md:space-y-6 p-16 text-[#333333] text-center">
              <h1 className="text-xl font-bold text-center tracking-tight text-black md:text-2xl ">
                Login            </h1>
              <div className='font-medium text-2xl '>
                Welcome back to ECOMMERCE
              </div>
              <div className='font-medium text-base '>
                The next gen business marketplace
              </div>
              <form className="space-y-4 md:space-y-6 " onSubmit={handleLogin}>
                <div>
                  <label className="block mb-2 text-sm font-medium text-black text-left"   >Email</label>
                  <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} name="email" id="email" placeholder="Enter" className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 " />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-black  text-left ">Password</label>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" id="password" placeholder="Enter" className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 " />
                </div>

                <Button className="uppercase" buttonText="Login" />
                <div className="sm:my-4 my-2 text-center">
                  <p className="text-sm font-light ">
                    Don’t have an Account?
                    <Link href="/signup" className="font-medium text-base text-black hover:underline uppercase mx-2">Sign up
                    </Link>
                  </p>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div >
    </>)
}

export default Login