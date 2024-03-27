import Head from 'next/head';
import React, { useRef, useState } from 'react'
import Button from '~/components/Button';
import { api } from '~/utils/api';
import { useSignUp } from '../context/SignUpContext';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';


const EmailConfirmation = () => {
  const { signUpData, setSignUpData }: any = useSignUp();

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const otpInputs = Array.from({ length: 6 }, () => useRef<HTMLInputElement>(null));
  const confirmSignup = api.user.confirmSignup.useMutation();
  const router = useRouter();
  console.log({ ...signUpData });

  const handleInputChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value !== '' && index < 5) {
      otpInputs[index + 1]?.current?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const sentOtp: number | undefined = signUpData?.otp;
      const otpValue = +(otp.join(''));
      if (sentOtp == otpValue) {
        confirmSignup.mutateAsync({ ...signUpData });
        const { name, email, password, otp }: any = confirmSignup?.data?.result;
        console.log(name);

        setSignUpData({ name, email, password, otp });

        router.push("/");

      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Otp not verified.",
          showConfirmButton: false,
          timer: 1500
        });
        router.push("/signup");
      }
    } catch (error) {
      console.error('Error confirming signup:', error);
    }
  };

  return (
    <>
      <Head>
        <title>Turnover | Email Confirmation</title>
        <meta name="description" content="Turnover home page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full h-screen">
        <div className="flex items-center justify-center mx-auto my-auto">
          <div className="w-full bg-white rounded-[20px] shadow md:mt-0 sm:max-w-xl xl:p-0 border-[1px] ">
            <div className=" space-y-4 md:space-y-6 p-16 text-[#333333] mx-auto flex w-full max-w-xl flex-col xl:space-y-16">

              <div className="flex flex-col items-center justify-center text-center space-y-2 max-w-md ">
                <div className="font-semibold text-3xl">
                  <p>Verify your email</p>
                </div>
                <div className="flex flex-row text-sm font-medium text-gray-400">
                  <p>Enter the 8 digit code you have received on {signUpData?.email}</p>
                </div>
              </div>

              <div>
                <form action="" >
                  <div className="flex flex-col w-full">
                    <label className="block mb-2 text-sm font-medium text-gray-900  text-left px-3">Code</label>

                    <div className="flex flex-row items-center gap-2 justify-around mx-auto">
                      {otpInputs.map((inputRef, index) => {
                        return (
                          <div className="w-16 h-16 " key={index}>
                            <input
                              ref={inputRef}
                              type="text"
                              value={otp[index]}
                              maxLength={1}
                              onChange={(e) => handleInputChange(index, e.target.value)}
                              className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-gray-700"
                            />
                          </div>
                        )

                      })}
                    </div>
                    <Button className="uppercase my-8" buttonText="Verify" handleClick={() => handleSubmit} />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  )
}

export default EmailConfirmation;