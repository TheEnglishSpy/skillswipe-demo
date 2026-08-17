import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";
const body = DM_Sans({subsets:["latin"],variable:"--font-body"}); const display = Fraunces({subsets:["latin"],variable:"--font-display"});
export const metadata: Metadata = {title:"SkillSwipe — Waar bellen mensen jou voor?",description:"Vraag iemand om erkenning of upload je cv en maak direct je persoonlijke SkillCard."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body className={`${body.variable} ${display.variable} grain`}>{children}</body></html>}
