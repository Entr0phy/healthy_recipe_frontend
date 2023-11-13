import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
 
export default function Home({recipe}) {
  return (
    <>
    <h1 className='text-center text-bold bg-white'>Healthy Recipe</h1>
    </>
  )
}

