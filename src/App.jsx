import SolarScene from './components/SolarScene'
import StatsAndContact from './components/StatsAndContact'

function App() {
  return (
    <div className="bg-slate-950 text-white">
      {/* Scroll storytelling scene */}
      <SolarScene />

      {/* Business value + WhatsApp contact */}
      <StatsAndContact />

      {/* Footer */}
      <footer className="text-center text-slate-500 text-sm py-10">© {new Date().getFullYear()} Photovoltaik – Beratung & Installation</footer>
    </div>
  )
}

export default App
