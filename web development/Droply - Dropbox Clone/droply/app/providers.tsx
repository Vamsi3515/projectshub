"use client"

import type  { ThemeProviderProps } from "next-themes";
import { ImageKitProvider } from "imagekitio-next";
import {HeroUIProvider} from '@heroui/react'

const authenticator = async () => {
    try {
        const response = await fetch("/api/imagekit-auth");
        const data = response.json();
        return data;
    } catch (error) {
        console.log("Authentication Error: ", error);
        throw error;
    }
}

export interface ProviderProps{
    children: React.ReactNode,
    themeProps?: ThemeProviderProps,
}

export function Providers({children, themeProps}: ProviderProps){
    return(
        <h1>
            <ImageKitProvider authenticator={authenticator} publicKey={process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || ""} urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || ""}>
                <HeroUIProvider>
                    {children}
                </HeroUIProvider>
            </ImageKitProvider>
        </h1>
    )
}