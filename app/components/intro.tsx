import { CMS_NAME, CMS_URL } from '../lib/constants'
import Navbar from './navbar'
import { getAllProducts, getNavbar } from '../lib/api'
export default function Intro(navbar) {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        Blog.
      </h1>

    </section>
  )
}