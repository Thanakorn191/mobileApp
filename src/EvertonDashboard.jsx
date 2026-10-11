import { useState, useEffect } from 'react';
import { Shield, Calendar, Trophy, Users, Megaphone, Newspaper, MapPin, ShoppingBag, ShoppingCart, Plus, Minus, X, Menu } from 'lucide-react';

const links = [['Home', 'home'], ['Fixtures', 'fixtures'], ['Squad', 'squad'], ['Fan Zone', 'fanzone'], ['Store', 'store']];

const products = [
  { id: 1, n: 'Home Shirt 25/26', p: 69.99, e: '👕', tag: 'New' },
  { id: 2, n: 'Away Shirt 25/26', p: 69.99, e: '👕' },
  { id: 3, n: 'Royal Blue Scarf', p: 19.99, e: '🧣' },
  { id: 4, n: 'Bucket Hat', p: 22.0, e: '🧢' },
  { id: 5, n: 'Matchday Mug', p: 9.99, e: '☕', tag: 'Sale' },
  { id: 6, n: 'Mini Football', p: 14.5, e: '⚽' },
];

const results = [
  { opp: 'Brighton', home: true, score: '2-1', date: '28 Sep', comp: 'Premier League', res: 'W' },
  { opp: 'Fulham', home: false, score: '1-1', date: '21 Sep', comp: 'Premier League', res: 'D' },
  { opp: 'Wolves', home: true, score: '0-1', date: '14 Sep', comp: 'Carabao Cup', res: 'L' },
  { opp: 'Arsenal', home: false, score: '3-0', date: '30 Nov', comp: 'Premier League', res: 'W', next: true },
];

const squad = [
  { n: 'Jordan Pickford', pos: 'GK', no: 1, s: ['Clean sheets 9', 'Saves 84'] },
  { n: 'James Tarkowski', pos: 'DEF', no: 6, s: ['Tackles 41', 'Clearances 96'] },
  { n: 'Idrissa Gueye', pos: 'MID', no: 27, s: ['Passes 1,120', 'Interceptions 38'] },
  { n: 'Dwight McNeil', pos: 'MID', no: 7, s: ['Assists 6', 'Key passes 52'] },
  { n: 'Iliman Ndiaye', pos: 'FWD', no: 10, s: ['Goals 8', 'Dribbles 64'] },
  { n: 'Beto', pos: 'FWD', no: 14, s: ['Goals 10', 'Shots 71'] },
];

const news = [
  ['Club', 'Hill Dickinson Stadium sells out for the Merseyside derby'],
  ['Team', 'Ndiaye named Player of the Month by supporters'],
  ['Fans', 'Blue Army away allocation confirmed for December trip'],
];

const resColor = { W: 'bg-emerald-500', D: 'bg-slate-400', L: 'bg-red-500' };
const posColor = { GK: 'bg-amber-400', DEF: 'bg-sky-400', MID: 'bg-emerald-400', FWD: 'bg-rose-400' };

function useCountdown(target) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const d = Math.max(0, target - now);
  return [['Days', 864e5], ['Hrs', 36e5], ['Min', 6e4], ['Sec', 1e3]].map(([l, u]) => [
    l,
    String(Math.floor(d / u) % (l === 'Days' ? 1e4 : l === 'Hrs' ? 24 : 60)).padStart(2, '0'),
  ]);
}

const Section = ({ id, icon: Icon, title, children }) => (
  <section id={id} className="scroll-mt-20">
    <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-blue-900">
      <Icon size={20} className="text-amber-500" /> {title}
    </h2>
    {children}
  </section>
);

export default function EvertonDashboard() {
  const [target] = useState(() => Date.now() + 9 * 864e5 + 3 * 36e5);
  const time = useCountdown(target);
  const [sel, setSel] = useState(null);
  const [cheers, setCheers] = useState(0);
  const [burst, setBurst] = useState(false);
  const [menu, setMenu] = useState(false);
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState({});

  const qty = (id, d) =>
    setCart((c) => {
      const q = (c[id] || 0) + d;
      const { [id]: _, ...rest } = c;
      return q > 0 ? { ...rest, [id]: q } : rest;
    });
  const items = products.filter((p) => cart[p.id]);
  const count = items.reduce((s, p) => s + cart[p.id], 0);
  const total = items.reduce((s, p) => s + cart[p.id] * p.p, 0);

  const cheer = () => {
    setCheers((c) => c + 1);
    setBurst(true);
    setTimeout(() => setBurst(false), 200);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <nav className="sticky top-0 z-30 bg-blue-950 text-white shadow-lg">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-2">
          <a href="#home" className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-full border-2 border-white bg-blue-800">
              <Shield size={20} />
            </div>
            <div className="leading-tight">
              <p className="font-extrabold">Everton F.C.</p>
              <p className="text-[10px] text-blue-300">Nil Satis Nisi Optimum</p>
            </div>
          </a>
          <div className="hidden gap-1 md:flex">
            {links.map(([l, id]) => (
              <a key={id} href={`#${id}`} className="rounded-md px-3 py-2 text-sm font-medium hover:bg-white/10 hover:text-amber-300">{l}</a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setOpen(true)} className="relative rounded-full p-2 hover:bg-white/10" aria-label="Cart">
              <ShoppingCart size={22} />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-amber-400 px-1 text-xs font-bold text-blue-900">{count}</span>
              )}
            </button>
            <button onClick={() => setMenu(!menu)} className="rounded-full p-2 hover:bg-white/10 md:hidden" aria-label="Menu">
              {menu ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        {menu && (
          <div className="border-t border-white/10 px-4 py-2 md:hidden">
            {links.map(([l, id]) => (
              <a key={id} href={`#${id}`} onClick={() => setMenu(false)} className="block rounded-md px-3 py-2 text-sm hover:bg-white/10">{l}</a>
            ))}
          </div>
        )}
      </nav>

      <header id="home" className="scroll-mt-20 bg-gradient-to-br from-blue-900 to-[#003399] pt-6 text-white">
        <div className="mx-auto flex max-w-5xl justify-end px-4 pb-4">
          <span className="rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-blue-900">The Toffees</span>
        </div>

        <div className="mx-auto max-w-5xl px-4 pb-8">
          <div className="rounded-2xl bg-white/10 p-5 text-center ring-1 ring-white/20 backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-300">Next Match · Merseyside Derby</p>
            <h2 className="my-2 text-2xl font-extrabold sm:text-3xl">Everton vs Liverpool</h2>
            <p className="mb-4 flex items-center justify-center gap-1 text-sm text-blue-100">
              <MapPin size={14} /> Hill Dickinson Stadium · Premier League
            </p>
            <div className="mx-auto grid max-w-sm grid-cols-4 gap-2">
              {time.map(([l, v]) => (
                <div key={l} className="rounded-lg bg-white py-2 text-blue-900">
                  <div className="text-2xl font-black tabular-nums">{v}</div>
                  <div className="text-[10px] font-semibold uppercase text-slate-500">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-8 px-4 py-8">
        <Section id="fixtures" icon={Calendar} title="Results & Fixtures">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {results.map((m) => (
              <div key={m.opp} className="rounded-xl border-l-4 border-blue-900 bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>{m.date}</span>
                  {m.next ? (
                    <span className="rounded bg-amber-100 px-1.5 font-semibold text-amber-700">Fixture</span>
                  ) : (
                    <span className={`grid h-5 w-5 place-items-center rounded-full font-bold text-white ${resColor[m.res]}`}>{m.res}</span>
                  )}
                </div>
                <p className="mt-2 font-semibold">{m.home ? `Everton v ${m.opp}` : `${m.opp} v Everton`}</p>
                <p className="text-2xl font-black text-blue-900">{m.next ? 'vs' : m.score}</p>
                <p className="text-xs text-slate-500">{m.comp}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="squad" icon={Users} title="Squad Showcase">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {squad.map((p, i) => (
              <button
                key={p.n}
                onClick={() => setSel(sel === i ? null : i)}
                className={`rounded-xl p-4 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md ${
                  sel === i ? 'bg-blue-900 text-white' : 'bg-white'
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className={`text-4xl font-black ${sel === i ? 'text-amber-300' : 'text-blue-900/20'}`}>{p.no}</span>
                  <span className={`rounded px-1.5 py-0.5 text-xs font-bold text-slate-900 ${posColor[p.pos]}`}>{p.pos}</span>
                </div>
                <p className="mt-2 font-bold">{p.n}</p>
                {sel === i && (
                  <ul className="mt-2 space-y-0.5 text-sm text-blue-100">
                    {p.s.map((s) => <li key={s}>• {s}</li>)}
                  </ul>
                )}
              </button>
            ))}
          </div>
        </Section>

        <Section id="fanzone" icon={Megaphone} title="Fan Zone">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl bg-white p-4 shadow-sm">
              <h3 className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-500"><Newspaper size={16} /> Latest News</h3>
              <ul className="divide-y">
                {news.map(([tag, t]) => (
                  <li key={t} className="flex gap-3 py-2 text-sm">
                    <span className="h-fit rounded bg-blue-100 px-1.5 text-xs font-bold text-blue-900">{tag}</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col items-center justify-center rounded-xl bg-blue-900 p-6 text-center text-white shadow-sm">
              <p className="text-sm text-blue-200">Blue Army cheers</p>
              <p className="text-5xl font-black tabular-nums text-amber-300">{cheers.toLocaleString()}</p>
              <button
                onClick={cheer}
                className={`mt-4 flex items-center gap-2 rounded-full bg-amber-400 px-6 py-3 font-bold text-blue-900 transition active:scale-95 ${burst ? 'scale-110' : ''}`}
              >
                <Trophy size={18} /> Up the Toffees!
              </button>
            </div>
          </div>
        </Section>

        <Section id="store" icon={ShoppingBag} title="Official Store">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {products.map((p) => (
              <div key={p.id} className="relative overflow-hidden rounded-xl bg-white shadow-sm transition hover:shadow-md">
                {p.tag && (
                  <span className="absolute left-2 top-2 rounded bg-amber-400 px-1.5 text-xs font-bold text-blue-900">{p.tag}</span>
                )}
                <div className="grid h-28 place-items-center bg-gradient-to-br from-blue-100 to-blue-50 text-5xl">{p.e}</div>
                <div className="p-3">
                  <p className="text-sm font-semibold">{p.n}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-black text-blue-900">£{p.p.toFixed(2)}</span>
                    <button onClick={() => qty(p.id, 1)} className="flex items-center gap-1 rounded-full bg-blue-900 px-3 py-1 text-xs font-bold text-white hover:bg-blue-800 active:scale-95">
                      <Plus size={14} /> Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </main>

      {open && (
        <div className="fixed inset-0 z-40 flex justify-end bg-black/50" onClick={() => setOpen(false)}>
          <aside className="flex h-full w-full max-w-sm flex-col bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between bg-blue-900 p-4 text-white">
              <h3 className="flex items-center gap-2 font-bold"><ShoppingCart size={18} /> Your Basket</h3>
              <button onClick={() => setOpen(false)} aria-label="Close"><X /></button>
            </div>
            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {!items.length && <p className="mt-10 text-center text-slate-400">Your basket is empty</p>}
              {items.map((p) => (
                <div key={p.id} className="flex items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-lg bg-blue-50 text-2xl">{p.e}</span>
                  <div className="flex-1 text-sm">
                    <p className="font-semibold">{p.n}</p>
                    <p className="text-slate-500">£{(p.p * cart[p.id]).toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => qty(p.id, -1)} className="rounded-full bg-slate-100 p-1"><Minus size={14} /></button>
                    <span className="w-4 text-center text-sm font-bold">{cart[p.id]}</span>
                    <button onClick={() => qty(p.id, 1)} className="rounded-full bg-slate-100 p-1"><Plus size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t p-4">
              <div className="mb-3 flex justify-between font-bold">
                <span>Total</span>
                <span className="text-blue-900">£{total.toFixed(2)}</span>
              </div>
              <button
                disabled={!count}
                onClick={() => { setCart({}); setOpen(false); }}
                className="w-full rounded-full bg-amber-400 py-3 font-bold text-blue-900 disabled:opacity-40"
              >
                Checkout (demo)
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
