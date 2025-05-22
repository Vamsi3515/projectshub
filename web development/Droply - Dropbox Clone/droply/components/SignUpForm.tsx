"use client";

import React, { useState } from 'react';
import {z} from "zod";
import { useForm } from "react-hook-form";
import { useSignUp } from "@clerk/nextjs";
import { signUpSchema } from '@/schemas/signUpSchema';
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from 'next/navigation';
import {Card, CardBody} from "@heroui/card";
import { Alert, Button, Link } from '@heroui/react';
import {InputOTP, InputOTPGroup, InputOTPSlot} from "@/components/ui/input-otp";

export default function SignUpForm () {
  const [isVerifying, setIsVerifying] = useState(false);
  const { signUp, setActive, isLoaded } = useSignUp();
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [authErrMsg, setAuthErrMsg] = useState<string | null>(null);
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationErrMsg, setVerificationErrMsg] = useState<string | null>(null);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
        email: "",
        password: "",
        confirmPassword: ""
    }
  });

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    if(!isLoaded) return;
    setIsSubmiting(true);
    setAuthErrMsg(null);
    try {
        await signUp.create({
            emailAddress: data.email,
            password: data.password
        })
        await signUp.prepareEmailAddressVerification({
            strategy: 'email_code'
        })
        setIsVerifying(true);
    } catch (error: any) {
        console.log("Signup Error : ", authErrMsg);
        setAuthErrMsg(error.errors?.[0]?.message || "An error occured during signup. Try again");
    } finally{
        setIsSubmiting(false);
    }
  };

  const handleSubmitAndVerification = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!isLoaded || !signUp) return
    setIsSubmiting(true);

    try {
        const result = await signUp.attemptEmailAddressVerification({
            code: verificationCode
        })
        if(result.status === "complete"){
            await setActive({
                session: result.createdSessionId
            })
            router.push("/dashboard");
        }else{
            console.log("Verification Error : ", result);
            setVerificationErrMsg("Verification Failed. Please enter correct OTP");
        }
    } catch (error: any) {
        console.error("Error : ", error);
        setVerificationErrMsg(error.errors?.[0]?.message || "An error occured during signup. Try again");
    }
  };

  if (isVerifying){
      return (
      <div className="h-screen flex items-center justify-center">
          <form className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded- w-1/2">
              <h2 className="text-2xl text-black font-bold mb-4 text-center">OTP Verification</h2>
              <p className='mt-5 p-5 text-black text-center'>An otp is sent to your email for verification.</p>
              <div className="space-y- flex items-center justify-center">
                <InputOTP
                  id='verificationCode'
                  maxLength={6}
                  value={verificationCode}
                  onChange={(value) => setVerificationCode(value)}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} className="text-black text-2xl p-[25px]" />
                    <InputOTPSlot index={1} className="text-black text-2xl p-[25px]" />
                    <InputOTPSlot index={2} className="text-black text-2xl p-[25px]" />
                    <InputOTPSlot index={3} className="text-black text-2xl p-[25px]" />
                    <InputOTPSlot index={4} className="text-black text-2xl p-[25px]" />
                    <InputOTPSlot index={5} className="text-black text-2xl p-[25px]" />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              {verificationErrMsg && (
                <Alert
                  color="secondary"
                  title={verificationErrMsg}
                  variant="solid"
                />
              )}
              <div className="flex items-center mt-5 justify-center">
                  <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline justify-right">
                      {isSubmiting ? "Verifying..." : "Verify Email"}
                  </button>
              </div>
              <Card>
                <CardBody className="flex-row items-center mt-5 justify-center">
                  <p>Didn't receive the code? </p>
                   <Button 
                    color="primary" 
                    className='p-2 m-2 cursor-pointer'
                    onSubmit={
                      async () => {
                        if(signUp){
                          await signUp.prepareEmailAddressVerification({
                              strategy: 'email_code'
                          });
                        }
                      }
                    }
                    >Resend Code</Button>
                </CardBody>
              </Card>
          </form>
      </div>
    );
  }
    
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large px-8 pb-10 pt-6 bg-gray-100">
        <p className="pb-4 text-left text-3xl font-semibold">
          Sign Up
          <span aria-label="emoji" className="ml-2" role="img">
            👋
          </span>
        </p>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <input
            type="email"
            id="email"
            placeholder="Enter your email"
            {...register("email")}
            className="w-full rounded-md border border-gray-600 bg-white px-4 py-3 text-black 
                        placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 
                        focus:ring-blue-500 transition duration-200"
            />

            <input
            type="password"
            id="password"
            placeholder="Enter your password"
            {...register("password")}
            className="w-full rounded-md border border-gray-600 bg-white px-4 py-3 text-black 
                        placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 
                        focus:ring-blue-500 transition duration-200"
            />

            <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm your password"
            {...register("confirmPassword")}
            className="w-full rounded-md border border-gray-600 bg-white px-4 py-3 text-black 
                        placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 
                        focus:ring-blue-500 transition duration-200"
            />
          {authErrMsg && (
            <Alert
              color="secondary"
              title={authErrMsg}
              variant="solid"
            />
          )}
          <Button 
            color="primary" 
            type="submit"
            className='cursor-pointer'
            isLoading={isSubmiting}
            >
            {isSubmiting? "Creating..." : "Create Account"}
          </Button>
        </form>
        <p className="text-center text-small">
          <Link href="/login" size="sm">
            Already have an account? Log In
          </Link>
        </p>
      </div>
    </div>
  );
};