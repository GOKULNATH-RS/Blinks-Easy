import Image from 'next/image'
import Header from '@/components/Header'
import heroImg from '../assets/hero-img.png'
import BlinksGeneretor from '@/components/BlinksGeneretor'
import Head from 'next/head'
import Link from 'next/link'
import downArrow from '../assets/icons/arrow-down.svg'

export default function Home() {
  return (
    <>
      <div className='text-white gradient_hero min-h-screen font-powerGrotesk px-40 py-8 max-sm:hidden'>
        <Header />
        <main className='w-full flex-center flex-col gap-4 my-8 '>
          <div className='flex flex-col items-center my-6 z-[2]'>
            <h1 className='text-[70px] leading-[1]'>Blinks ,made Easy</h1>
            <h1 className='text-[26px]'>Generate Blinks with few clicks</h1>
            <div className={` h-max w-max m-4 mt-8 flex gap-1 items-end`}>
              {/* <Link
                href='#generate'
                className={`flex-center h-10 w-52 gradient_600_700 bg-opacity-70 text-xl
                rounded-xl`}
              >
                Generate
              </Link>
               */}
              <p className=''>Scroll down to generate</p>
              <Image
                src={downArrow}
                alt='arrow-down'
                className='h-5 w-5 animate-bounce'
              />
            </div>
          </div>

          <div className='relative'>
            <Image
              src={heroImg}
              height={480}
              width={720}
              alt='hero'
              className='relative z-[3]'
            />
            <div className='absolute top-0 left-1/3  gradient_ball h-[400px] w-[400px] z-[1]' />
          </div>
        </main>

        <div id='generate'>
          <BlinksGeneretor />
        </div>
      </div>
      <div className='hidden max-sm:block h-screen w-screen gradient_hero text-white font-powerGrotesk'>
        <p className='w-full h-full flex-center'>
          Use Desktop for better experience
        </p>
      </div>
    </>
  )
}
