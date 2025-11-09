import { motion, useScroll, useTransform } from 'framer-motion';
import Spline from '@splinetool/react-spline';

export default function Hero() {
  const { scrollYProgress } = useScroll();
  const yTitle = useTransform(scrollYProgress, [0, 0.3], [0, -60]);
  const ySub = useTransform(scrollYProgress, [0, 0.3], [0, -30]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);

  return (
    <section className="relative min-h-[100svh] bg-[#0B0D12] text-white overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_20%,rgba(16,185,129,0.12)_0%,rgba(0,0,0,0)_60%),linear-gradient(180deg,rgba(99,102,241,0.10),rgba(14,165,233,0.10))]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-28 pb-24">
        <motion.h1 style={{ y: yTitle, opacity }} className="text-balance text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
          Automated P2P Transactions — Escrowed. Instant. Composable.
        </motion.h1>
        <motion.p style={{ y: ySub, opacity }} className="mt-4 max-w-2xl text-white/80">
          Trade securely with automated dispute flows, verified on-chain settlement, and gas-lightning execution.
        </motion.p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a href="#launch" className="rounded-md bg-gradient-to-r from-teal-400 via-violet-500 to-sky-500 px-5 py-2.5 font-medium text-white shadow hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300">
            Launch App
          </a>
          <a href="#docs" className="rounded-md border border-white/20 bg-white/5 px-5 py-2.5 font-medium text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20">
            Read Docs
          </a>
        </div>

        <div className="mt-6 flex flex-wrap gap-2 text-xs text-white/70">
          <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1">KYC-optional markets</span>
          <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1">Non-custodial</span>
          <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1">USDC/INR to start</span>
        </div>
      </div>
    </section>
  );
}
