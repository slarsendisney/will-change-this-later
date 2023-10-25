import Search from '@/components/search'
import Image from 'next/image'


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div>HACK SOS - SICK Products Discovery</div>
      <Search />
    </main>
  )
}
