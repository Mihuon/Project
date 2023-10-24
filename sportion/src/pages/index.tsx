import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })


import ReservationTile from '@/components/reservationTile'
import IndexGrid from '@/components/indexGrid'
import PrimaryAppBar from '@/components/primaryAppbar'

export default function Home() {
  return (
    <>
      <PrimaryAppBar />
<IndexGrid/>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe accusamus dignissimos obcaecati reiciendis dolore voluptatibus illum itaque, aspernatur officia, quo ad assumenda architecto maxime possimus dolorum, vero deserunt? Eveniet, expedita!</p>
    </>
  )
}
