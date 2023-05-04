'use client'
import Image from 'next/image'
import Logo from '../../public/logo.png'
import SalahBanner from '../../public/banner.svg'
import { Poppins } from 'next/font/google'
import SelectDropdown from './components/SelectDropdown'
import { useState } from 'react'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '400', '500', '700', '800'],
})

export default function Home() {
  const [forCaptainUser, setForCaptainUser] = useState('')
  return (
    <>
      {/** MAIN PAGE WRAPPER */}
      <div
        className={`${poppins.className} flex flex-col md:w-screen md:h-screen bg-slate-50`}
      >
        {/** MAIN PAGE HEADER */}
        <div className="flex w-full p-5 space-x-3 justify-center items-center">
          <Image src={Logo} alt="logo" width={50} height={50} className="" />
          <div className="text-xl font-bold">mini leagues</div>
        </div>

        {/** MAIN PAGE */}
        <div className="flex flex-col grow mx-5 md:my-20 bg-white rounded-md justify-start items-center space-y-5">
          <Image
            src={SalahBanner}
            alt="logo"
            width={250}
            height={250}
            className="-mt-12"
          />
          <div className="text-xl">
            Get fastest 🚀 live updates for your head to head match ups against
            your fiercest FPL rivals
          </div>
          <div className="flex flex-col p-5 bg-slate-50 rounded-md">
            {/** FOR VS AGAINST*/}
            <div className="flex p-5 space-x-5 justify-center items-center">
              {/** FOR */}
              <div className=" flex flex-col space-y-5">
                <SelectDropdown
                  labelText={'Captain Team'}
                  optionsList={['Choose a user', 'Starks', 'Targaeryans']}
                  handleSelectChange={setForCaptainUser}
                />
                <SelectDropdown
                  labelText={'Partner Team'}
                  optionsList={['Choose a user', 'Starks', 'Targaeryans']}
                  handleSelectChange={setForCaptainUser}
                />
              </div>

              {/** VS */}
              <span className="p-5 rounded-md bg-white text-xl">Vs</span>

              {/** AGAINST */}
              <div className=" flex flex-col space-y-5">
                <SelectDropdown
                  labelText={'Captain Team'}
                  optionsList={['Choose a user', 'Starks', 'Targaeryans']}
                  handleSelectChange={setForCaptainUser}
                />
                <SelectDropdown
                  labelText={'Partner Team'}
                  optionsList={['Choose a user', 'Starks', 'Targaeryans']}
                  handleSelectChange={setForCaptainUser}
                />
              </div>
            </div>

            {forCaptainUser}
          </div>
        </div>
      </div>
    </>
  )
}
