import { Nav, Footer } from '@/components/Nav'
import Link from 'next/link'

export const metadata = {
  title: 'How to Buy a House in Japan — Complete Guide | Akiya Japan',
  description: 'The complete guide to buying property in Japan as a foreigner. Step-by-step process, costs, legal requirements, and tips from real buyers.',
}

const TOC = [
  { id: 'intro',      label: '1. Why Buy in Japan?' },
  { id: 'can-buy',   label: '2. Can Foreigners Buy?' },
  { id: 'types',     label: '3. Property Types' },
  { id: 'process',   label: '4. The Buying Process' },
  { id: 'costs',     label: '5. What It Really Costs' },
  { id: 'finding',   label: '6. Finding Properties' },
  { id: 'agents',    label: '7. Working with Agents' },
  { id: 'diligence', label: '8. Due Diligence' },
  { id: 'remote',    label: '9. Managing from Abroad' },
  { id: 'visa',      label: '10. Visa & Long Stay' },
  { id: 'pitfalls',  label: '11. Common Mistakes' },
]

export default function GuideDownloadPage() {
  return (
    <>
      <Nav lang="en" />

      {/* Header */}
      <div className="bg-stone-900 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-[#e07070] text-sm font-bold uppercase tracking-wider mb-3">Complete Guide</p>
          <h1 className="text-4xl font-bold text-white mb-4">How to Buy a House in Japan</h1>
          <p className="text-stone-400 text-sm">For foreign buyers · Updated 2025 · ~25 min read</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 flex gap-12">

        {/* TOC sidebar */}
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <div className="sticky top-8 bg-[#f9f9f9] rounded-2xl p-5 border border-stone-200">
            <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-4">Contents</p>
            <nav className="space-y-2">
              {TOC.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="block text-sm text-stone-600 hover:text-[#e07070] transition"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <article className="flex-1 prose prose-stone max-w-none">

          {/* ── 1. Why Buy ──────────────────────────────────────────────── */}
          <section id="intro" className="mb-14">
            <h2 className="text-2xl font-bold text-stone-900 mb-4 border-l-4 border-[#e07070] pl-4">
              1. Why Buy a House in Japan?
            </h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              Japan has an extraordinary opportunity hiding in plain sight. With over 9 million vacant homes
              nationwide — roughly 14% of all housing — prices in rural areas have collapsed to levels
              that seem almost unreal by Western standards. Properties that would cost $500,000 in Europe
              or North America sell for $10,000–$50,000 in Japan's countryside.
            </p>
            <div className="bg-[#f9f9f9] border border-stone-200 rounded-xl p-5 mb-4">
              <h4 className="font-bold text-stone-800 mb-3">Why prices are so low</h4>
              <ul className="space-y-2 text-sm text-stone-600">
                <li>🏚️ Rural depopulation — young people move to cities, leaving homes empty</li>
                <li>📉 Japan's overall population is shrinking (peaked in 2008)</li>
                <li>🧱 Old buildings depreciate to zero on paper within 20–30 years</li>
                <li>💸 Inheritance tax discourages heirs from keeping rural properties</li>
                <li>🔧 High renovation costs make many homes unattractive to Japanese buyers</li>
              </ul>
            </div>
            <p className="text-stone-600 leading-relaxed">
              For foreign buyers, this creates a rare window: buy a traditional Japanese farmhouse,
              renovate it to your taste, and own a piece of Japan — all for less than a used car in Tokyo.
            </p>
          </section>

          {/* ── 2. Can Foreigners Buy ─────────────────────────────────── */}
          <section id="can-buy" className="mb-14">
            <h2 className="text-2xl font-bold text-stone-900 mb-4 border-l-4 border-[#e07070] pl-4">
              2. Can Foreigners Buy Property in Japan?
            </h2>
            <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-5">
              <p className="text-green-800 font-bold text-lg mb-1">✅ Yes — with almost no restrictions.</p>
              <p className="text-green-700 text-sm">
                Japan has no laws restricting foreign ownership of residential property.
                You do not need a visa, residency, or even to be present in Japan to buy.
              </p>
            </div>
            <p className="text-stone-600 leading-relaxed mb-4">
              Unlike many countries, Japan welcomes foreign buyers. You can purchase property as a
              non-resident, non-citizen, from overseas, without a Japanese bank account (though it helps).
            </p>
            <h4 className="font-bold text-stone-800 mb-3">What you DO need:</h4>
            <ul className="space-y-2 text-sm text-stone-600 mb-5">
              <li className="flex gap-2"><span className="text-[#e07070]">→</span> A passport (for identity verification)</li>
              <li className="flex gap-2"><span className="text-[#e07070]">→</span> A hanko (personal seal) or signature-based alternative</li>
              <li className="flex gap-2"><span className="text-[#e07070]">→</span> A Japanese bank account <em>or</em> international wire transfer capability</li>
              <li className="flex gap-2"><span className="text-[#e07070]">→</span> A trusted local agent or bilingual representative</li>
            </ul>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
              <strong>Note on agricultural land:</strong> Farmland (農地, nōchi) requires special permits
              under the Agricultural Land Act. Stick to residential or commercial properties — most
              akiya listings are residential.
            </div>
          </section>

          {/* ── 3. Property Types ─────────────────────────────────────── */}
          <section id="types" className="mb-14">
            <h2 className="text-2xl font-bold text-stone-900 mb-4 border-l-4 border-[#e07070] pl-4">
              3. Types of Properties
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  name: 'Kominka 古民家',
                  desc: 'Traditional farmhouses, often 100+ years old. Large, with exposed wood beams, earthen floors, and irori hearths. Cheapest to buy, most expensive to renovate.',
                  price: '¥500k – ¥5M',
                  emoji: '🏯',
                },
                {
                  name: 'Machiya 町家',
                  desc: 'Traditional urban townhouses, especially in Kyoto. Long and narrow floor plan. Often in commercial areas. Higher prices than rural kominka.',
                  price: '¥2M – ¥20M',
                  emoji: '🏘️',
                },
                {
                  name: 'Nōka 農家',
                  desc: 'Working farmhouses with land. Often include outbuildings, wells, and rice paddies. Verify land classification before buying.',
                  price: '¥300k – ¥3M',
                  emoji: '🌾',
                },
                {
                  name: 'Bessō 別荘',
                  desc: 'Japanese-style vacation homes, often in mountain or resort areas (Hakone, Karuizawa, Niseko). Better condition but significantly higher prices.',
                  price: '¥3M – ¥30M',
                  emoji: '⛰️',
                },
              ].map((t) => (
                <div key={t.name} className="bg-[#f9f9f9] border border-stone-200 rounded-xl p-5">
                  <div className="text-3xl mb-3">{t.emoji}</div>
                  <h4 className="font-bold text-stone-800 mb-2">{t.name}</h4>
                  <p className="text-sm text-stone-600 leading-relaxed mb-3">{t.desc}</p>
                  <span className="text-xs font-bold text-[#e07070] bg-[#e07070]/10 px-2 py-1 rounded-full">
                    Typical price: {t.price}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* ── 4. The Buying Process ─────────────────────────────────── */}
          <section id="process" className="mb-14">
            <h2 className="text-2xl font-bold text-stone-900 mb-4 border-l-4 border-[#e07070] pl-4">
              4. The Buying Process: Step by Step
            </h2>
            <div className="space-y-4">
              {[
                {
                  step: '01',
                  title: 'Find a property',
                  desc: 'Browse akiya banks (municipal listings), this site, or use a licensed real estate agent (宅建業者). Visit the property in person if possible.',
                },
                {
                  step: '02',
                  title: 'Hire a bilingual agent or judicial scrivener',
                  desc: 'A licensed real estate agent (仲介業者) handles the transaction. A judicial scrivener (司法書士) handles registration. Many firms now serve foreign clients.',
                },
                {
                  step: '03',
                  title: 'Make an offer and sign a brokerage agreement',
                  desc: 'In Japan, offers are typically made through the agent. Once accepted, you sign a 媒介契約 (brokerage contract).',
                },
                {
                  step: '04',
                  title: 'Receive the Explanation of Important Matters (重要事項説明)',
                  desc: 'This legally required document explains the property\'s legal status, any liens, zoning restrictions, and potential defects. Read it carefully — get it translated.',
                },
                {
                  step: '05',
                  title: 'Sign the Purchase Agreement (売買契約)',
                  desc: 'You pay a deposit (手付金) — typically 10% of the purchase price. The contract becomes legally binding at this point.',
                },
                {
                  step: '06',
                  title: 'Final payment and transfer',
                  desc: 'Pay the remaining balance. The judicial scrivener registers the property transfer at the Legal Affairs Bureau (法務局). You receive the official deed.',
                },
                {
                  step: '07',
                  title: 'Post-purchase registrations',
                  desc: 'Register for fixed asset tax (固定資産税), notify the municipality, and set up utilities. If renting out, register as a landlord.',
                },
              ].map((s) => (
                <div key={s.step} className="flex gap-4 bg-white border border-stone-200 rounded-xl p-5">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#e07070] text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {s.step}
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-800 mb-1">{s.title}</h4>
                    <p className="text-sm text-stone-600 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── 5. Costs ──────────────────────────────────────────────── */}
          <section id="costs" className="mb-14">
            <h2 className="text-2xl font-bold text-stone-900 mb-4 border-l-4 border-[#e07070] pl-4">
              5. What It Really Costs (All-In)
            </h2>
            <p className="text-stone-600 text-sm leading-relaxed mb-5">
              The sticker price is just the beginning. Budget an additional <strong>6–10% of the purchase price</strong> for transaction costs, plus renovation.
            </p>
            <div className="overflow-x-auto mb-5">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-stone-900 text-white">
                    <th className="text-left px-4 py-3 rounded-tl-lg">Cost Item</th>
                    <th className="text-left px-4 py-3">Who Pays</th>
                    <th className="text-left px-4 py-3 rounded-tr-lg">Typical Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Purchase price', 'Buyer', 'The listed price'],
                    ['Agent commission', 'Buyer + Seller', '3% + ¥60,000 + tax (each side)'],
                    ['Registration tax', 'Buyer', '0.4% – 2% of assessed value'],
                    ['Real estate acquisition tax', 'Buyer', '3% of assessed value (one-time)'],
                    ['Judicial scrivener fee', 'Buyer', '¥50,000 – ¥150,000'],
                    ['Stamp duty', 'Buyer', '¥10,000 – ¥60,000'],
                    ['Annual fixed asset tax', 'Owner', '1.4% of assessed value/year'],
                    ['Renovation (kominka)', 'Buyer', '¥1M – ¥10M+ depending on scope'],
                  ].map(([item, who, amount], i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-[#f9f9f9]' : 'bg-white'}>
                      <td className="px-4 py-3 text-stone-800 font-medium">{item}</td>
                      <td className="px-4 py-3 text-stone-500">{who}</td>
                      <td className="px-4 py-3 text-stone-700">{amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-[#e07070]/10 border border-[#e07070]/30 rounded-xl p-4 text-sm text-stone-700">
              <strong>Real example:</strong> A ¥1,500,000 ($10,000) kominka in Nagano will typically cost
              ¥1,800,000–2,000,000 all-in for the transaction, then ¥2M–5M for basic livability renovations.
              Total: ~$25,000–$50,000 for a fully usable traditional Japanese home.
            </div>
          </section>

          {/* ── 6. Finding Properties ─────────────────────────────────── */}
          <section id="finding" className="mb-14">
            <h2 className="text-2xl font-bold text-stone-900 mb-4 border-l-4 border-[#e07070] pl-4">
              6. Finding the Right Property
            </h2>
            <div className="space-y-3 mb-5">
              {[
                {
                  source: 'Municipal Akiya Banks',
                  desc: 'Each municipality maintains a database of vacant homes. Free to browse, but mostly in Japanese. Search "[city name] 空き家バンク" on Google.',
                  tag: '✅ Free & Official',
                },
                {
                  source: 'This Site (Akiya Japan)',
                  desc: 'English-language listings sourced from municipal akiya banks across Japan. Subscribe for full contact details.',
                  tag: '✅ English-friendly',
                },
                {
                  source: 'SUUMO / HOME\'S',
                  desc: 'Japan\'s largest real estate portals. Wide selection including akiya. Mostly Japanese. Use with Google Translate.',
                  tag: '⚠️ Japanese only',
                },
                {
                  source: 'Real Estate Agents',
                  desc: 'Licensed agents (宅建業者) can access listings not published online. Some specialize in serving foreign clients.',
                  tag: '✅ Most access',
                },
              ].map((s) => (
                <div key={s.source} className="flex gap-4 bg-white border border-stone-200 rounded-xl p-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="font-bold text-stone-800 text-sm">{s.source}</h4>
                      <span className="text-xs bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full">{s.tag}</span>
                    </div>
                    <p className="text-sm text-stone-600">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-[#f9f9f9] border border-stone-200 rounded-xl p-5">
              <h4 className="font-bold text-stone-800 mb-2">Pro tips for property hunting</h4>
              <ul className="space-y-2 text-sm text-stone-600">
                <li>→ Visit in person before committing — photos often hide serious issues</li>
                <li>→ Search in autumn/winter when rural properties are easiest to inspect</li>
                <li>→ Ask about the reason for sale — heirs often just want someone to care for the home</li>
                <li>→ Check proximity to train station, hospital, and supermarket for resale value</li>
                <li>→ Look for properties listed 2+ years — more room to negotiate</li>
              </ul>
            </div>
          </section>

          {/* ── 7. Agents ─────────────────────────────────────────────── */}
          <section id="agents" className="mb-14">
            <h2 className="text-2xl font-bold text-stone-900 mb-4 border-l-4 border-[#e07070] pl-4">
              7. Working with Japanese Real Estate Agents
            </h2>
            <p className="text-stone-600 text-sm leading-relaxed mb-4">
              In Japan, real estate agents must be licensed (宅地建物取引業者). The commission is
              legally capped at 3% + ¥60,000 + tax for each side (buyer and seller).
            </p>
            <h4 className="font-bold text-stone-800 mb-3">How to find a good agent:</h4>
            <ul className="space-y-2 text-sm text-stone-600 mb-5">
              <li className="flex gap-2"><span className="text-[#e07070]">→</span> Search for agents specializing in "foreigner real estate Japan" or "外国人 不動産"</li>
              <li className="flex gap-2"><span className="text-[#e07070]">→</span> Many akiya-focused agents are in regional cities — not Tokyo</li>
              <li className="flex gap-2"><span className="text-[#e07070]">→</span> Ask if they have experience with foreign clients and international wire transfers</li>
              <li className="flex gap-2"><span className="text-[#e07070]">→</span> Confirm they can provide all documents in English (or hire a separate translator)</li>
            </ul>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
              <strong>Buyer beware:</strong> Some agents in rural areas are not accustomed to foreign buyers
              and may decline to work with non-Japanese speakers. Having a Japanese contact or interpreter
              dramatically increases your options.
            </div>
          </section>

          {/* ── 8. Due Diligence ──────────────────────────────────────── */}
          <section id="diligence" className="mb-14">
            <h2 className="text-2xl font-bold text-stone-900 mb-4 border-l-4 border-[#e07070] pl-4">
              8. Due Diligence Checklist
            </h2>
            <p className="text-stone-600 text-sm leading-relaxed mb-4">
              Never skip this. Old Japanese homes can hide serious structural issues.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  category: '🏗️ Structural',
                  items: [
                    'Built before or after 1981 (seismic code)',
                    'Evidence of termite (シロアリ) damage',
                    'Roof condition and leak history',
                    'Foundation type (pillar vs slab)',
                  ],
                },
                {
                  category: '📋 Legal',
                  items: [
                    'Clear title with no liens',
                    'Land boundary disputes',
                    'Zoning designation (農地 = farmland restrictions)',
                    'Building coverage ratio limits',
                  ],
                },
                {
                  category: '🔌 Utilities',
                  items: [
                    'Sewer connection or septic tank',
                    'Well water vs municipal water',
                    'Gas type (city gas vs propane)',
                    'Internet availability (fiber?)',
                  ],
                },
                {
                  category: '🌿 Environment',
                  items: [
                    'Flood zone designation',
                    'Landslide risk area',
                    'Distance to active fault lines',
                    'Snow load capacity (for Tohoku/Niigata)',
                  ],
                },
              ].map((cat) => (
                <div key={cat.category} className="bg-white border border-stone-200 rounded-xl p-4">
                  <h4 className="font-bold text-stone-800 mb-3">{cat.category}</h4>
                  <ul className="space-y-1.5">
                    {cat.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-stone-600">
                        <span className="mt-1 w-3 h-3 border-2 border-stone-300 rounded flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* ── 9. Managing from Abroad ───────────────────────────────── */}
          <section id="remote" className="mb-14">
            <h2 className="text-2xl font-bold text-stone-900 mb-4 border-l-4 border-[#e07070] pl-4">
              9. Managing Your Property from Abroad
            </h2>
            <p className="text-stone-600 text-sm leading-relaxed mb-5">
              Many foreign owners rarely visit their Japanese properties. Here's how to handle remote ownership:
            </p>
            <div className="space-y-3">
              {[
                {
                  title: 'Hire a local property manager (管理会社)',
                  desc: 'Costs ¥5,000–¥20,000/month. They handle maintenance checks, tenant management (if renting), and emergency repairs.',
                },
                {
                  title: 'Short-term rental (minpaku)',
                  desc: 'Register for Airbnb/minpaku under the Minpaku Law (民泊). Requires municipal notification and a local manager. Can cover costs in high-traffic areas.',
                },
                {
                  title: 'Set up automatic bill payment',
                  desc: 'Japanese utilities allow automatic bank transfer (自動引き落とし). A Japanese bank account is needed — open one during your visit.',
                },
                {
                  title: 'Tax obligations for non-residents',
                  desc: 'As a non-resident landlord you must file Japanese income tax if renting out. A tax representative (納税管理人) is legally required for non-residents with income.',
                },
              ].map((item) => (
                <div key={item.title} className="bg-[#f9f9f9] border border-stone-200 rounded-xl p-4">
                  <h4 className="font-bold text-stone-800 text-sm mb-1">{item.title}</h4>
                  <p className="text-sm text-stone-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── 10. Visa ──────────────────────────────────────────────── */}
          <section id="visa" className="mb-14">
            <h2 className="text-2xl font-bold text-stone-900 mb-4 border-l-4 border-[#e07070] pl-4">
              10. Visa & Long Stay Options
            </h2>
            <p className="text-stone-600 text-sm leading-relaxed mb-4">
              Owning property in Japan does <strong>not</strong> give you the right to live there.
              You still need a valid visa. Options for long-term stays:
            </p>
            <div className="space-y-3">
              {[
                {
                  visa: 'Tourist Visa (短期滞在)',
                  duration: 'Up to 90 days',
                  notes: 'For most Western countries, no visa required. Can be extended once. Not for working.',
                },
                {
                  visa: 'Digital Nomad Visa (特定活動)',
                  duration: 'Up to 6 months',
                  notes: 'Launched 2024. Requires ¥10M annual income and remote work. Allows accompanying family.',
                },
                {
                  visa: 'Business Manager Visa (経営・管理)',
                  duration: '1–5 years, renewable',
                  notes: 'For those running a Japanese business. Running a minpaku or property company may qualify.',
                },
                {
                  visa: 'Spouse of Japanese National',
                  duration: 'Permanent',
                  notes: 'Married to a Japanese citizen. Provides unlimited work rights and long-term residency.',
                },
              ].map((v) => (
                <div key={v.visa} className="flex gap-4 bg-white border border-stone-200 rounded-xl p-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <h4 className="font-bold text-stone-800 text-sm">{v.visa}</h4>
                      <span className="text-xs bg-[#e07070]/10 text-[#e07070] px-2 py-0.5 rounded-full font-bold">{v.duration}</span>
                    </div>
                    <p className="text-sm text-stone-600">{v.notes}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── 11. Common Mistakes ───────────────────────────────────── */}
          <section id="pitfalls" className="mb-14">
            <h2 className="text-2xl font-bold text-stone-900 mb-4 border-l-4 border-[#e07070] pl-4">
              11. Common Mistakes (and How to Avoid Them)
            </h2>
            <div className="space-y-3">
              {[
                {
                  mistake: 'Underestimating renovation costs',
                  fix: 'Budget ¥1M per room minimum for a kominka. Get 3 quotes before buying. Factor in asbestos removal if pre-1975.',
                },
                {
                  mistake: 'Buying without visiting first',
                  fix: 'Photos hide rot, smells, and neighborhood issues. Visit at least once, ideally in winter to check insulation.',
                },
                {
                  mistake: 'Ignoring the "why is it so cheap?" question',
                  fix: 'Ask directly. Is it next to a highway? Cemetery? Has it been vacant 10+ years? These affect resale and rentability.',
                },
                {
                  mistake: 'Not having a local contact',
                  fix: 'Renovations, maintenance, and emergencies require someone on the ground. Build this relationship before you close.',
                },
                {
                  mistake: 'Buying farmland accidentally',
                  fix: 'Check the land category in the 重要事項説明. 農地 (nōchi) requires permits to build or renovate.',
                },
                {
                  mistake: 'No succession plan',
                  fix: 'In Japan, property without a clear heir creates legal complications. Have a will or trust that explicitly covers the Japanese property.',
                },
              ].map((item) => (
                <div key={item.mistake} className="bg-white border-l-4 border-amber-400 rounded-r-xl p-4">
                  <p className="font-bold text-stone-800 text-sm mb-1">⚠️ {item.mistake}</p>
                  <p className="text-sm text-stone-600">✅ {item.fix}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="bg-stone-900 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">Ready to find your property?</h3>
            <p className="text-stone-400 text-sm mb-6">
              Browse our English-language database of akiya properties across Japan.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/en/akiya"
                className="bg-white hover:bg-stone-100 text-stone-900 font-bold px-6 py-3 rounded-xl text-sm transition"
              >
                Browse Properties
              </Link>
              <Link
                href="/en/subscribe"
                className="bg-[#e07070] hover:bg-[#cc5c5c] text-white font-bold px-6 py-3 rounded-xl text-sm transition"
              >
                Full Access — $7.99/mo
              </Link>
            </div>
          </div>

        </article>
      </div>

      <Footer lang="en" />
    </>
  )
}
