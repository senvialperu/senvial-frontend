import Hero from './components/hero'
import Hero2 from './components/hero2'
import { getSlider, getRadials, getIconTextDivs, getClients } from './lib/api'
import Slider from './components/slider'
import RadialProgresses from './components/radial-progress'
import IconTextDivs from './components/icon-text-divs'
import TrustedBy from './components/trusted-by'
// floating button whatsapp

export default async function Home() {
  const sliderData = await getSlider()
  const radialProgressesData = await getRadials();
  const iconTextDivsData = await getIconTextDivs();
  const trustedByData = await getClients();
  return (
    <main className="flex min-h-screen flex-col justify-between">
      <Slider data={sliderData} />
      <IconTextDivs data={iconTextDivsData} />
      <Hero />
      <Hero2 />
      <RadialProgresses radialProgresses={radialProgressesData} />
      <TrustedBy data={trustedByData} />
    </main>
  )
}
