"use client";

import React from "react";
import {Button, Input, Checkbox, Link, Form} from "@heroui/react";
import {Icon} from "@iconify/react";

export default function Component() {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("handleSubmit");
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large px-8 pb-10 pt-6 bg-gray-100">
        <p className="pb-4 text-left text-3xl font-semibold">
          Log In
          <span aria-label="emoji" className="ml-2" role="img">
            👋
          </span>
        </p>
        <Form className="flex flex-col gap-4" validationBehavior="native" onSubmit={handleSubmit}>
                      <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="w-full rounded-md border border-gray-600 bg-white px-4 py-3 text-black 
                        placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 
                        focus:ring-blue-500 transition duration-200"
            />

        {/* Password Field */}
            <input
            type="password"
            id="password"
            placeholder="Enter your password"
            className="w-full rounded-md border border-gray-600 bg-white px-4 py-3 text-black 
                        placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 
                        focus:ring-blue-500 transition duration-200"
            />
          <div className="flex w-full items-center justify-between px-1 py-2">
            <Link className="text-default-500" href="#" size="sm">
              Forgot password?
            </Link>
          </div>
          <Button className="w-full" color="primary" type="submit">
            Log In
          </Button>
        </Form>
        <p className="text-center text-small">
          <Link href="/signup" size="sm">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
