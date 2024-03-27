import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Swal from 'sweetalert2'
import Button from '~/components/Button'
import { api } from '~/utils/api'
import { useSignUp } from '../context/SignUpContext';

const Signup = () => {
  const { setSignUpData } = useSignUp();
  const router = useRouter();
  const signup = api.user.signup.useMutation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000);
  };

  const handleSignup = async (event: any) => {
    event.preventDefault();
    if (!name) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Name field can't be empty",
        showConfirmButton: false,
        timer: 1500
      });
      return;
    } else if (!email) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Email field can't be empty",
        showConfirmButton: false,
        timer: 1500
      });
      return;
    } else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(email)) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Enter a valid email!",
        showConfirmButton: false,
        timer: 1500
      });
      return;
    } else if (!password) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Password field can't be empty",
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }

    if (name && email && password) {
      try {
        const otp = generateOTP();
        signup.mutate({ email, otp });
        setSignUpData({ name, email, password, otp });

        router.push("/email-confirmation");
      } catch (error: any) {
        console.error(error.message);
      }
    }
  }

  return (
    <>
      <Head>
        <title>Turnover | Signup</title>
        <meta name="description" content="Turnover home page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full h-screen">
        <div className="flex items-center justify-center mx-auto my-auto">
          <div className="w-full bg-white rounded-[20px] shadow md:mt-0 sm:max-w-lg xl:p-0 border-[1px] ">
            <div className=" space-y-4 md:space-y-6 p-16 text-[#333333]">
              <h1 className="text-xl font-bold text-center tracking-tight text-gray-900 md:text-2xl ">
                Create your account
              </h1>
              <form className="space-y-4 md:space-y-6 ">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                  <input name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 " />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
                  <input type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 " />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                  <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 " />
                </div>

                <Button buttonText="Create an account" className='' handleClick={() => handleSignup} />
                <div className="sm:my-4 my-2 text-center">
                  <p className="text-sm font-light ">
                    Have an Account?
                    <Link href="/login" className="font-medium text-base text-black hover:underline uppercase mx-2">Login </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div >
    </>
  )
}

export default Signup