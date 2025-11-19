import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Phone } from 'lucide-react'

export default function StatsAndContact() {
  const stats = useMemo(() => ([
    { label: 'Durchschnittliche Investition', value: '9.800 €' },
    { label: 'Jährliche Ersparnis', value: '1.450 €' },
    { label: 'Autarkiegrad', value: '62 %' },
    { label: 'Amortisationszeit', value: '6–8 Jahre' },
  ]), [])

  return (
    <section className="bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Dein Vorteil mit Photovoltaik</h2>
        <p className="text-slate-300 mb-12">Beispielwerte – genaue Zahlen hängen von Dach, Ausrichtung und Verbrauch ab.</p>

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

        <div className="bg-gradient-to-br from-emerald-500 to-cyan-500 p-[1px] rounded-2xl">
          <div className="bg-slate-950 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-semibold mb-1">Kostenlose Beratung über WhatsApp</h3>
              <p className="text-slate-300">Schick uns Fotos vom Dach und deinen Jahresverbrauch – wir melden uns schnell.</p>
            </div>
            <a
              href="https://wa.me/491234567890"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-500 text-slate-950 font-semibold px-6 py-3 rounded-xl hover:brightness-110 transition"
            >
              <Phone className="w-5 h-5" /> WhatsApp Kontakt
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
