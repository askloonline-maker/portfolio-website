"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";

// Supabase क्लाइंट इनिशियलाइजेशन (Ensure envs are loaded properly)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export default function Navbar() {
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    async function initWallet() {
      if (typeof window === "undefined") return;

      // 1. LocalStorage से अनोनिमस ID निकालें या नई जनरेट करें
      let storedId = localStorage.getItem("asklo_device_id");
      if (!storedId) {
        storedId = crypto.randomUUID();
        localStorage.setItem("asklo_device_id", storedId);
      }

      // 2. Supabase में इस ID का वॉलेट चेक करें, नहीं मिलने पर नया बनाएं
      const { data: wallet, error } = await supabase
        .from("wallets")
        .select("balance")
        .eq("device_id", storedId)
        .single();

      if (error && error.code === "PGRST116") {
        // अगर डेटाबेस में वॉलेट नहीं मिला, तो नया रिकॉर्ड इन्सर्ट करें
        const { data: newWallet } = await supabase
          .from("wallets")
          .insert([{ device_id: storedId, balance: 0.00 }])
          .select()
          .single();
        if (newWallet) setBalance(Number(newWallet.balance));
      } else if (wallet) {
        setBalance(Number(wallet.balance));
      }
    }

    initWallet();
  }, []);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-blue-100 bg-white/95 shadow-sm shadow-blue-950/5 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center gap-4 px-4 py-3">
        
        {/* LOGO LINK CONTAINER */}
        <Link href="/" className="group flex items-center gap-2">
          <div className="relative h-10 w-10 overflow-hidden rounded-xl">
            <Image
              src="/LOGO.png"
              alt="Asklo Logo"
              width={40}
              height={40}
              className="object-contain"
              priority
            />
          </div>

          <div className="flex flex-col justify-center">
            <span className="text-2xl font-black tracking-tight text-[#123c9c] leading-none">
              Asklo
            </span>
            <span className="text-[9px] font-black uppercase tracking-[0.18em] text-blue-600 pt-1 leading-none">
              The World's Living Room
            </span>
          </div>
        </Link>

        {/* SEARCH BAR */}
        <div className="hidden flex-1 md:block">
          <label className="relative block">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-blue-500">⌕</span>
            <input
              type="text"
              placeholder="Search questions, answers, topics..."
              className="w-full rounded-full border border-blue-100 bg-blue-50/70 py-3 pl-10 pr-4 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />
          </label>
        </div>

        {/* ACTIONS & WALLET DISPLAY */}
        <div className="ml-auto flex items-center gap-2">
          
          {/* 🪙 लाइव अनोनिमस बैलेंस जो आपके वॉलेट टेबल से रीफ्रेश होता है */}
          <div className="flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200 px-3 py-1.5 text-xs font-black text-amber-700 shadow-sm">
            <span>🪙</span>
            <span>₹{balance.toFixed(2)}</span>
          </div>

          <Link href="/ask" className="hidden rounded-full border border-blue-200 px-4 py-2 text-xs font-black text-blue-700 transition hover:bg-blue-50 sm:inline-flex">
            Ask
          </Link>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#0f2f88] px-4 py-2 text-xs font-black text-white shadow-lg shadow-blue-950/20">
            <span className="h-2 w-2 rounded-full bg-[#10b981] shadow-[0_0_6px_#10b981]" />
            Anonymous On
          </span>
        </div>
      </div>
    </nav>
  );
}
