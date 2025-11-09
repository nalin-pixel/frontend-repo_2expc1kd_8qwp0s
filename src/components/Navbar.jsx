import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Rocket } from 'lucide-react';

export default function Navbar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 20, mass: 0.2 });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#product', label: 'Product' },
    { href: '#liquidity', label: 'Liquidity' },
    { href: '#security', label: 'Security' },
    { href: '#fees', label: 'Fees' },
    { href: '#docs', label: 'Docs' },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <nav
        className={
          'backdrop-blur supports-[backdrop-filter]:bg-white/5 transition-colors duration-300 border-b border-white/10 ' +
          (scrolled ? 'bg-[#0B0D12]/60' : 'bg-transparent')
        }
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between text-white">
          <a href="#" className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-teal-400 via-violet-500 to-sky-500">
              <Rocket className="h-4 w-4 text-white" />
            </span>
            <span className="font-semibold tracking-tight">Automated P2P</span>
          </a>

          <div className="hidden md:flex items-center gap-6 text-sm text-white/80">
            {links.map((l) => (
              <a key={l.label} href={l.href} className="hover:text-white transition-colors">
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#launch"
              className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-teal-400 via-violet-500 to-sky-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300"
            >
              Launch App
            </a>
          </div>
        </div>
        <motion.div
          className="h-0.5 origin-left bg-gradient-to-r from-teal-400 via-violet-500 to-sky-500"
          style={{ scaleX }}
        />
      </nav>
    </div>
  );
}
