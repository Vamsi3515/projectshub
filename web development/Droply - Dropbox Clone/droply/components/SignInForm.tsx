"use client"

import { SignIn, useSignIn } from "@clerk/nextjs";
import { signInSchema } from "@/schemas/signInSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/router";
import { Button, Form } from "@heroui/react";
import Link from "next/link";

export default function SignInForm () {

    const router = useRouter();
    const { signIn, setActive, isLoaded } = useSignIn();
    const [isSubmiting, setIsSubmiting] = useState(false);
    const [authErrMsg, setAuthErrMsg] = useState<string | null>(null);

    const { register, handleSubmit } = useForm({
        resolver : zodResolver(signInSchema),
        defaultValues: {
            identifier: "",
            password: "",
        }
    });

    const onSubmit = async (data: z.infer<typeof signInSchema>) => {
        if(!isLoaded) return;

        setIsSubmiting(true);
        setAuthErrMsg(null);

        try {
            const result = await signIn.create({
                identifier: data.identifier,
                password: data.password
            });

            if (result.status==="complete") {
                await setActive({
                    session: result.createdSessionId,
                })
                router.push("/");
            } else {
                console.log("Sign In Error: ", result);
                setAuthErrMsg("Invalid Credintials");
            }

        } catch (error: any) {
            console.log("SignIn Error : ",error);
            setAuthErrMsg(error.errors?.[0]?.message || "An error occured while sign in. Try again")
        }finally{
            setIsSubmiting(false);
        }
    }

    return (
        <div className="flex h-screen w-full items-center justify-center">
            <div className="flex w-full max-w-sm flex-col gap-4 rounded-large px-8 pb-10 pt-6 bg-gray-100">
                <p className="pb-4 text-left text-3xl font-semibold">
                Log In
                <span aria-label="emoji" className="ml-2" role="img">
                    👋
                </span>
                </p>
                <Form className="flex flex-col gap-4" validationBehavior="native" onSubmit={handleSubmit(onSubmit)}>
                            <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    {...register("identifier")}
                    className="w-full rounded-md border border-gray-600 bg-white px-4 py-3 text-black 
                                placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 
                                focus:ring-blue-500 transition duration-200"
                    />

                {/* Password Field */}
                    <input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    {...register("password")}
                    className="w-full rounded-md border border-gray-600 bg-white px-4 py-3 text-black 
                                placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 
                                focus:ring-blue-500 transition duration-200"
                    />
                <div className="flex w-full items-center justify-between px-1 py-2">
                    <Link className="text-default-500" href="#">
                    Forgot password?
                    </Link>
                </div>
                <Button className="w-full" color="primary" type="submit">
                    Log In
                </Button>
                </Form>
                <p className="text-center text-small">
                <Link href="/signup">
                    Create an account
                </Link>
                </p>
            </div>
        </div>
    );
}