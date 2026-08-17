"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Copy, FileText, Send, Sparkles, Upload, Users, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "@/components/ui";

type Mode = "choose" | "ask" | "upload" | "card";

export default function Home() {
  const [mode, setMode] = useState<Mode>("choose");
  const [name, setName] = useState("");
  const [reviewer, setReviewer] = useState("");
  const [fileName, setFileName] = useState("");
  const [copied, setCopied] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const firstName = name.trim().split(" ")[0] || "jij";

  function copyInvite() {
    navigator.clipboard?.writeText(`Hi ${reviewer || "daar"}, wil je in 2 minuten delen waar jij mij professioneel voor zou bellen? https://theenglishspy.github.io/skillswipe-demo/review/demo`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <main className="min-h-dvh bg-[var(--paper)] px-4 pb-8 pt-5 sm:px-6">
      <div className="mx-auto max-w-lg">
        <div className="flex items-center justify-between">
          <Logo />
          {mode !== "choose" && <button onClick={() => setMode("choose")} className="grid size-10 place-items-center rounded-full border border-[var(--line)] bg-white" aria-label="Sluiten"><X size={18}/></button>}
        </div>

        <AnimatePresence mode="wait">
          {mode === "choose" && (
            <motion.section key="choose" initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}} className="pt-14">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#dcece5] px-3 py-1.5 text-xs font-bold text-[#285c4c]"><Sparkles size={14}/> Jouw reputatie, met bewijs</span>
              <h1 className="display mt-6 text-[52px] font-semibold leading-[.94]">Waar bellen mensen <em className="font-normal text-[var(--accent)]">jou</em> voor?</h1>
              <p className="mt-5 max-w-md text-lg leading-7 text-[var(--muted)]">Vraag het iemand die jou kent. Of upload je cv en start meteen met je persoonlijke SkillCard.</p>

              <div className="mt-10 space-y-3">
                <button onClick={() => setMode("ask")} className="group flex min-h-24 w-full items-center gap-4 rounded-[26px] bg-[var(--ink)] p-5 text-left text-white shadow-card transition active:scale-[.98]">
                  <span className="grid size-13 shrink-0 place-items-center rounded-2xl bg-[var(--accent)]"><Users size={23}/></span>
                  <span className="flex-1"><b className="block text-lg">Vraag het iemand</b><small className="text-white/60">Deel één link. Kost 2 minuten.</small></span>
                  <ArrowRight className="transition group-hover:translate-x-1"/>
                </button>
                <button onClick={() => setMode("upload")} className="group flex min-h-24 w-full items-center gap-4 rounded-[26px] border border-[var(--line)] bg-[var(--card)] p-5 text-left transition active:scale-[.98]">
                  <span className="grid size-13 shrink-0 place-items-center rounded-2xl bg-[#f6dfd7] text-[var(--accent)]"><Upload size={23}/></span>
                  <span className="flex-1"><b className="block text-lg">Upload je cv</b><small className="text-[var(--muted)]">Krijg direct je eerste SkillCard.</small></span>
                  <ArrowRight className="transition group-hover:translate-x-1"/>
                </button>
              </div>
              <p className="mt-7 text-center text-xs text-[var(--muted)]">Privé by default · Jij kiest wat zichtbaar wordt</p>
              <Link href="/review/demo" className="mt-3 block text-center text-sm font-bold underline decoration-[var(--accent)] underline-offset-4">Eerst zien hoe een swipe werkt</Link>
            </motion.section>
          )}

          {mode === "ask" && (
            <motion.section key="ask" initial={{opacity:0,x:25}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}} className="pt-12">
              <span className="grid size-14 place-items-center rounded-2xl bg-[var(--mint)]"><Send size={23}/></span>
              <h1 className="display mt-6 text-5xl font-semibold leading-none">Vraag één persoon.</h1>
              <p className="mt-4 text-[var(--muted)]">Begin met iemand die jouw werk echt heeft meegemaakt.</p>
              <div className="mt-8 space-y-4 rounded-[28px] bg-[var(--card)] p-5 shadow-card">
                <label className="block text-xs font-bold">Jouw naam<input value={name} onChange={e=>setName(e.target.value)} placeholder="Bijv. Noor van Dijk" className="mt-2 min-h-13 w-full rounded-2xl border border-[var(--line)] bg-white px-4 text-base outline-none focus:border-[var(--ink)]"/></label>
                <label className="block text-xs font-bold">Wie wil je vragen?<input value={reviewer} onChange={e=>setReviewer(e.target.value)} placeholder="Bijv. Sam" className="mt-2 min-h-13 w-full rounded-2xl border border-[var(--line)] bg-white px-4 text-base outline-none focus:border-[var(--ink)]"/></label>
                <button onClick={copyInvite} disabled={!name.trim()} className="flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-5 font-bold text-white disabled:opacity-40">{copied?<><Check size={19}/> Uitnodiging gekopieerd</>:<><Copy size={18}/> Kopieer uitnodiging</>}</button>
              </div>
              <p className="mt-5 text-center text-xs leading-5 text-[var(--muted)]">De ontvanger beoordeelt je niet. Die herkent alleen gedrag dat diegene zelf heeft gezien.</p>
            </motion.section>
          )}

          {mode === "upload" && (
            <motion.section key="upload" initial={{opacity:0,x:25}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}} className="pt-12">
              <span className="grid size-14 place-items-center rounded-2xl bg-[#f6dfd7] text-[var(--accent)]"><FileText size={24}/></span>
              <h1 className="display mt-6 text-5xl font-semibold leading-none">Start met je cv.</h1>
              <p className="mt-4 text-[var(--muted)]">We maken een eerste SkillCard. Daarna vraag je anderen om hem met bewijs sterker te maken.</p>
              <div className="mt-8 rounded-[28px] bg-[var(--card)] p-5 shadow-card">
                <label className="block text-xs font-bold">Jouw naam<input value={name} onChange={e=>setName(e.target.value)} placeholder="Voor- en achternaam" className="mt-2 min-h-13 w-full rounded-2xl border border-[var(--line)] bg-white px-4 text-base outline-none focus:border-[var(--ink)]"/></label>
                <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={e=>setFileName(e.target.files?.[0]?.name || "")}/>
                <button onClick={()=>fileRef.current?.click()} className="mt-4 flex min-h-28 w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[var(--line)] bg-white text-sm font-bold"><Upload className="mb-2 text-[var(--accent)]"/>{fileName || "Kies je cv"}<small className="mt-1 font-normal text-[var(--muted)]">PDF of Word</small></button>
                <button onClick={()=>setMode("card")} disabled={!name.trim()||!fileName} className="mt-4 flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-[var(--ink)] px-5 font-bold text-white disabled:opacity-35">Maak mijn SkillCard <ArrowRight size={18}/></button>
              </div>
            </motion.section>
          )}

          {mode === "card" && (
            <motion.section key="card" initial={{opacity:0,scale:.96}} animate={{opacity:1,scale:1}} className="pt-10">
              <div className="rounded-[32px] bg-[var(--ink)] p-6 text-white shadow-card">
                <div className="flex items-center justify-between"><span className="text-sm font-bold">SkillSwipe</span><span className="rounded-full bg-white/10 px-3 py-1 text-[10px] uppercase tracking-widest">Startkaart</span></div>
                <p className="mt-12 text-sm text-white/55">Mensen kunnen {firstName} bellen voor…</p>
                <h1 className="display mt-2 text-5xl leading-none">Duidelijkheid. Voortgang. Vertrouwen.</h1>
                <div className="mt-8 space-y-2">{["Maakt complexe onderwerpen begrijpelijk","Zet een vaag idee om in een werkbaar plan","Brengt mensen rond een uitkomst bij elkaar"].map(x=><div key={x} className="flex gap-3 rounded-2xl bg-white/8 p-3 text-sm"><Check className="shrink-0 text-[var(--mint)]" size={18}/>{x}</div>)}</div>
                <p className="mt-8 border-t border-white/15 pt-4 text-xs text-white/45">Gebaseerd op cv · Nog niet gevalideerd door anderen</p>
              </div>
              <button onClick={()=>setMode("ask")} className="mt-5 flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-[var(--accent)] font-bold text-white">Vraag iemand om bewijs <Send size={18}/></button>
              <button onClick={()=>setMode("choose")} className="mt-3 w-full py-3 text-sm font-bold">Opnieuw beginnen</button>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
