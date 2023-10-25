"use client"

import { SickLogo } from '@/assets/SickLogo'
import { Hero } from '@/components/Hero/Hero'
import { useState } from 'react'
import Search from '@/components/search'
import ShowReel from '@/components/showreel'
import Image from 'next/image'


export default function Home() {
  const [open, setOpen] = useState(false)
  return (

    <main onClick={() => setOpen(true)} className="flex min-h-screen flex-col items-center bg-gradient-to-t from-blue-700/40 to-blue-300/40">
      
      {open && <Hero />}
    </main>
  )
}
