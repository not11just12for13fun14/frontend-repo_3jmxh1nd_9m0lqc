import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Phone } from 'lucide-react'

export default function StatsAndContact() {
  const stats = useMemo(() => ([
    { label: 'Durchschnittliche Investition', value: '10.500 €' },
    { label: 'Jährliche Ersparnis', value: '1.550 €' },
    { label: 'Autarkiegrad', value: '65 %' },
    { label: 'Amortisationszeit', value: '6–8 Jahre' },
  ]), [])

  return (
    <section className="bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-6 py-24">
        <div className="inline-flex mb-6 items-center gap-2 rounded-full bg-gradient-to-r from-orange-500/20 to-amber-400/20 px-3 py-1 text-sm text-orange-300 border border-orange-500/30">DE · Orientierungswerte</div>
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Dein Vorteil mit Photovoltaik</h2>
        <p className="text-slate-300 mb-12">Beispielwerte für Deutschland – genaue Zahlen hängen von Dach, Ausrichtung und Verbrauch ab.</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              className="bg-slate-900 border border-slate-800 rounded-xl p-6"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20% 0px -20% 0px' }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="text-slate-400 text-sm mb-2">{s.label}</div>
              <div className="text-2xl font-semibold">{s.value}</div>
            </motion.div>
          ))}
        </div>

        {/* WhatsApp CTA as a tappable surface that opens the chat */}
        <div className="bg-gradient-to-br from-orange-500 to-amber-400 p-[1px] rounded-2xl">
          <div className="bg-slate-950 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-semibold mb-1">Kostenlose Beratung über WhatsApp</h3>
              <p className="text-slate-300">Tippe einfach auf die Fläche, schick Fotos vom Dach und deinen Jahresverbrauch – wir melden uns schnell.</p>
            </div>
            <a
              href="https://wa.me/?text=Hallo%2C%20ich%20interessiere%20mich%20f%C3%BCr%20eine%20PV-Anlage.%20K%C3%B6nnt%20ihr%20mich%20beraten%3F"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 bg-gradient-to-r from-orange-400 to-amber-300 text-slate-950 font-semibold px-6 py-3 rounded-xl hover:brightness-110 transition shadow-[0_0_20px_rgba(251,146,60,0.25)]"
            >
              <Phone className="w-5 h-5 group-hover:scale-110 transition" /> WhatsApp öffnen
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
