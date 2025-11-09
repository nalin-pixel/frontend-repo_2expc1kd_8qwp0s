import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ShieldCheck, BarChart3, Lock, FileText, Wallet, Gauge, Activity, Box, HelpCircle } from 'lucide-react';

export function SocialProof() {
  const items = [
    { icon: ShieldCheck, label: 'Audited' },
    { icon: Box, label: 'Proof-of-Reserves style' },
    { icon: Gauge, label: 'Rate-limited Escrow' },
    { icon: Activity, label: 'On-chain SLAs' },
  ];

  return (
    <section className="bg-[#0F1220] text-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {items.map(({ icon: Icon, label }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur flex items-center gap-3"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-tr from-teal-400/20 via-violet-500/20 to-sky-500/20 border border-white/10">
                <Icon className="h-5 w-5 text-teal-300" />
              </span>
              <span className="text-sm text-white/90">{label}</span>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 text-xs text-white/70">
          <div className="overflow-hidden rounded-lg border border-white/10">
            <div className="bg-white/5 px-3 py-2">Recent trades</div>
            <Ticker />
          </div>
        </div>
      </div>
    </section>
  );
}

function Ticker() {
  const rows = [
    { pair: 'USDC/INR', side: 'Buy', amt: '1,200', price: '₹84.1', id: 'TX-9F1A' },
    { pair: 'USDC/INR', side: 'Sell', amt: '540', price: '₹83.9', id: 'TX-9F1B' },
    { pair: 'USDC/INR', side: 'Buy', amt: '3,000', price: '₹84.2', id: 'TX-9F1C' },
    { pair: 'USDC/INR', side: 'Sell', amt: '250', price: '₹83.8', id: 'TX-9F1D' },
  ];
  return (
    <div className="divide-y divide-white/10">
      {rows.map((r, i) => (
        <motion.div
          key={r.id}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ delay: i * 0.05 }}
          className="grid grid-cols-4 md:grid-cols-5 gap-2 px-3 py-2 bg-[#0B0D12] text-white/80"
        >
          <span className="col-span-2 md:col-span-1">{r.pair}</span>
          <span className={r.side === 'Buy' ? 'text-teal-300' : 'text-rose-300'}>{r.side}</span>
          <span>{r.amt}</span>
          <span>{r.price}</span>
          <span className="hidden md:block text-white/50">{r.id}</span>
        </motion.div>
      ))}
    </div>
  );
}

export function LiquidityYields() {
  const [tab, setTab] = useState('yields');
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.5, once: true });

  const apr = inView ? 18.4 : 0;
  const alloc = [40, 25, 20, 15];
  const colors = ['from-teal-400', 'from-violet-500', 'from-sky-500', 'from-emerald-400'];

  return (
    <section id="liquidity" className="bg-[#0B0D12] text-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-semibold">Liquidity Pool Yields</h2>
          <div className="inline-flex rounded-lg border border-white/10 p-1 bg-white/5">
            <button onClick={() => setTab('yields')} className={`px-3 py-1.5 text-sm rounded-md ${tab==='yields'?'bg-white/10':'hover:bg-white/10'}`}>LP Yields</button>
            <button onClick={() => setTab('risk')} className={`px-3 py-1.5 text-sm rounded-md ${tab==='risk'?'bg-white/10':'hover:bg-white/10'}`}>Risk Controls</button>
          </div>
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-8 items-center">
          <div>
            {tab === 'yields' ? (
              <div ref={ref} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="text-sm text-white/70">Current APR</div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 text-5xl font-extrabold">
                  {apr.toFixed(1)}%
                </motion.div>
                <p className="mt-3 text-white/70">Auto-compounded with slippage caps and withdrawal cool-downs.</p>
              </div>
            ) : (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-2 text-white/80">
                <div>• Time-weighted deposits</div>
                <div>• Vault rate limits</div>
                <div>• Circuit breaker</div>
                <div>• Oracle sanity checks</div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-center">
            <Donut values={alloc} colors={colors} animate={inView} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Donut({ values, colors, animate }) {
  const total = values.reduce((a, b) => a + b, 0);
  let acc = 0;
  return (
    <svg viewBox="0 0 120 120" className="w-56 h-56">
      <defs>
        <filter id="soft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.6" />
        </filter>
      </defs>
      {values.map((v, i) => {
        const start = (acc / total) * 2 * Math.PI;
        acc += v;
        const end = (acc / total) * 2 * Math.PI;
        const largeArc = end - start > Math.PI ? 1 : 0;
        const r = 45;
        const cx = 60, cy = 60;
        const x1 = cx + r * Math.cos(start);
        const y1 = cy + r * Math.sin(start);
        const x2 = cx + r * Math.cos(end);
        const y2 = cy + r * Math.sin(end);
        const d = `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`;
        return (
          <motion.path
            key={i}
            d={d}
            strokeWidth={14}
            strokeLinecap="round"
            fill="none"
            className={`stroke-1 ${colors[i]} to-transparent`} // gradient-like look
            stroke="url(#grad)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: animate ? 1 : 0 }}
            transition={{ duration: 1 + i * 0.3, ease: 'easeOut' }}
            filter="url(#soft)"
          />
        );
      })}
      <circle cx="60" cy="60" r="32" className="fill-[#0B0D12]" />
      <text x="60" y="64" textAnchor="middle" className="fill-white text-sm">Allocation</text>
    </svg>
  );
}

export function SecurityMechanics() {
  const items = [
    'Time-locks',
    'Rate limits',
    'Slippage caps',
    'Circuit breaker',
    'Audit link',
    'Bug bounty link',
  ];

  return (
    <section id="security" className="bg-[#0F1220] text-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-2xl md:text-3xl font-semibold">Security Mechanics</h2>
        <div className="mt-6 divide-y divide-white/10 rounded-xl border border-white/10 bg-white/5">
          {items.map((it, i) => (
            <details key={it} className="group open:bg-white/5">
              <summary className="marker:content-none flex items-center justify-between cursor-pointer px-4 py-4">
                <span className="text-white/90">{it}</span>
                <span className="text-white/50 group-open:rotate-180 transition">⌄</span>
              </summary>
              <div className="px-4 pb-4 text-white/70 text-sm">
                {it === 'Audit link' ? (
                  <a href="#docs" className="text-teal-300 hover:underline">Read audit</a>
                ) : it === 'Bug bounty link' ? (
                  <a href="#docs" className="text-teal-300 hover:underline">Join bug bounty</a>
                ) : (
                  <code className="block rounded-md bg-black/40 p-3 text-xs">require(invariant, 'Escrow invariant holds');</code>
                )}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FeesSla() {
  const cards = [
    { title: 'Maker/Taker', desc: '0.1% / 0.2%' },
    { title: 'Escrow fee', desc: '0.15%' },
    { title: 'Dispute fee', desc: '$5 refundable if you win' },
    { title: 'Settlement window', desc: '15–45 min' },
  ];

  return (
    <section id="fees" className="bg-[#0B0D12] text-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-2xl md:text-3xl font-semibold">Fees & SLA</h2>
        <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {cards.map((c) => (
            <div key={c.title} className="rounded-xl border border-white/10 bg-white/5 p-5">
              <div className="text-white/70 text-sm">{c.title}</div>
              <div className="mt-2 text-xl font-semibold">{c.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FaqCta() {
  const faqs = [
    { q: 'Is the escrow non-custodial?', a: 'Yes. Funds are locked in contracts with on-chain release conditions.' },
    { q: 'Do I need KYC?', a: 'Markets can be KYC-optional; some liquidity pools may require verification.' },
    { q: 'Which assets are supported?', a: 'USDC at launch with INR rails via UPI/IMPS. More soon.' },
  ];

  return (
    <footer className="bg-[#0F1220] text-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-2xl md:text-3xl font-semibold">FAQ</h2>
        <div className="mt-6 divide-y divide-white/10 rounded-xl border border-white/10 bg-white/5">
          {faqs.map((f) => (
            <details key={f.q} className="group open:bg-white/5">
              <summary className="marker:content-none flex items-center justify-between cursor-pointer px-4 py-4">
                <span className="text-white/90">{f.q}</span>
                <span className="text-white/50 group-open:rotate-180 transition">⌄</span>
              </summary>
              <div className="px-4 pb-4 text-white/70 text-sm">{f.a}</div>
            </details>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <div className="text-white/60 text-sm">© {new Date().getFullYear()} Automated P2P — All rights reserved.</div>
          <div className="flex items-center gap-3">
            <a href="#docs" className="rounded-md border border-white/20 bg-white/5 px-4 py-2 text-sm hover:bg-white/10">Docs</a>
            <a href="#launch" className="rounded-md bg-gradient-to-r from-teal-400 via-violet-500 to-sky-500 px-4 py-2 text-sm font-medium text-white hover:brightness-110">Launch App</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
