import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { PrimaryAppbar } from '@/components/primaryAppbar'
import { HomeGrid } from '@/components/homeGrid'

export default function Home() {
  return (
    <>
    <HomeGrid/>
    </>
  )
}
