import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Wallet, Shield, Landmark, CheckCircle, Gavel, Layers } from 'lucide-react';

const steps = [
  { title: 'Post Offer', desc: 'Set asset, fiat, rate, and limits.', icon: Wallet },
  { title: 'Smart Escrow', desc: 'Funds locked; adversarial-safe.', icon: Shield },
  { title: 'Fiat Settlement', desc: 'UPI/IMPS off-chain proof.', icon: Landmark },
  { title: 'Auto-Release', desc: 'Oracle/attestation triggers.', icon: CheckCircle },
  { title: 'Dispute Engine', desc: 'Bounded arbitration.', icon: Gavel },
  { title: 'Settlement Finality', desc: 'On-chain confirmations.', icon: Layers },
];

export default function HorizontalStory() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], ['0%', `-${(steps.length - 1) * 100}%`]);

  return (
    <section id="product" ref={ref} className="relative h-[600vh] bg-[#0F1220] text-white">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(70%_50%_at_50%_20%,rgba(56,189,248,0.12)_0%,rgba(0,0,0,0)_60%)]" />
        <motion.div style={{ x }} className="will-change-transform h-full flex items-center">
          {steps.map((s, i) => (
            <Card key={s.title} index={i} {...s} />
          ))}
        </motion.div>
        <Progress count={steps.length} progress={scrollYProgress} />
      </div>
    </section>
  );
}

function Card({ title, desc, icon: Icon, index }) {
  return (
    <div className="shrink-0 w-screen h-screen px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ amount: 0.6, once: false }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mx-auto max-w-4xl h-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-8 flex flex-col justify-center shadow-[0_0_0_1px_rgba(255,255,255,0.05)]"
      >
        <div className="flex items-center gap-3 text-teal-300/90">
          <span className="text-xs uppercase tracking-wider">Step {index + 1}</span>
          <span className="h-px w-10 bg-teal-300/30" />
        </div>
        <div className="mt-4 flex items-start gap-4">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr from-teal-400/20 via-violet-500/20 to-sky-500/20 border border-white/10">
            <Icon className="h-6 w-6 text-teal-300" />
          </span>
          <div>
            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h3>
            <p className="mt-2 text-white/80 max-w-prose">{desc}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function Progress({ count, progress }) {
  const activeIndex = useTransform(progress, [0, 1], [0, count - 1]);
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <Dot key={i} index={i} activeIndex={activeIndex} />
      ))}
    </div>
  );
}

function Dot({ index, activeIndex }) {
  const scale = useTransform(activeIndex, [index - 0.49, index, index + 0.49], [1, 1.4, 1]);
  const opacity = useTransform(activeIndex, [index - 0.49, index, index + 0.49], [0.5, 1, 0.5]);
  return (
    <motion.span
      style={{ scale, opacity }}
      className="h-2.5 w-2.5 rounded-full bg-gradient-to-tr from-teal-400 to-sky-500 shadow-[0_0_0_2px_rgba(255,255,255,0.1)_inset]"
    />
  );
}
