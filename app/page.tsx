import Image from 'next/image'
import Hero from './components/hero'
import Hero2 from './components/hero2'
import { getSlider, getRadials } from './lib/api'
import Slider from './components/slider'
import RadialProgresses from './components/radialProgress'


export default async function Home() {
  const sliderData = await getSlider()
  const radialProgresses = await getRadials();
  return (
    <main className="flex min-h-screen flex-col justify-between pt-24">
      <Slider data={sliderData} />
      <Hero2 />
      <Hero />
      <RadialProgresses radialProgresses={radialProgresses} />
    </main>
  )
}
