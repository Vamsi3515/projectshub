import { min } from "drizzle-orm";
import * as z from "zod";

export const signUpSchema = z.object({
    email: z.string().min(1, {message: "Email is required"}).email({message: "Please enter a valid email"}),
    password: z.string().min(1, {message: "Password is required"}).min(8, {message: "Password should be atleast 8 characters"}),
    confirmPassword: z.string().min(1, {message: "Confirm Password is Required"})
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Password and Confirm Password should match",
    path: ["confirmPassword"],
});