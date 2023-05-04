'use client'
import Image from 'next/image'
import Logo from '../../public/logo.png'
import SalahBanner from '../../public/banner.svg'
import { Poppins } from 'next/font/google'
import SelectDropdown from './components/SelectDropdown'
import { useEffect, useState } from 'react'
import Button from './components/Button'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '400', '500', '700', '800'],
})

export default function Home() {
  const [forCaptainUserData, setForCaptainUserData] = useState({})
  const [forPartnerUserData, setForPartnerUserData] = useState({})
  const [againstCaptainUserData, setAgainstCaptainUserData] = useState({})
  const [againstPartnerUserData, setAgainstPartnerUserData] = useState({})
  const [usersList, setUsersList] = useState([])

  const fetchUsersList = async () => {
    try {
      const res = await fetch(
        `https://mini-leagues-api.onrender.com/api/leagues/tvtleague`,
        {
          method: 'GET',
        }
      )
      const tvtLeagueData = await res.json()
      const curUsersList = tvtLeagueData['standings']['results']
      setUsersList(curUsersList)
      setForCaptainUserData(curUsersList[0])
      setForPartnerUserData(curUsersList[0])
      setAgainstCaptainUserData(curUsersList[0])
      setAgainstPartnerUserData(curUsersList[0])
    } catch (err) {
      console.log(err)
    }
  }

  const handleGetLiveScoresOnClick = (event: any) => {}

  const fetchComboData = async () => {}

  useEffect(() => {
    fetchUsersList()
  }, [])

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
                  labelText={'For Captain Team'}
                  optionsList={usersList}
                  valueKey="player_name"
                  handleSelectChange={setForCaptainUserData}
                />
                <SelectDropdown
                  labelText={'For Partner Team'}
                  optionsList={usersList}
                  valueKey="player_name"
                  handleSelectChange={setForPartnerUserData}
                />
              </div>

              {/** VS */}
              <span className="p-5 rounded-md bg-white text-xl">Vs</span>

              {/** AGAINST */}
              <div className=" flex flex-col space-y-5">
                <SelectDropdown
                  labelText={'Against Captain Team'}
                  optionsList={usersList}
                  valueKey="player_name"
                  handleSelectChange={setAgainstCaptainUserData}
                />
                <SelectDropdown
                  labelText={'Against Partner Team'}
                  optionsList={usersList}
                  valueKey="player_name"
                  handleSelectChange={setAgainstPartnerUserData}
                />
              </div>
            </div>

            <Button
              buttonText={'Get Live Scores 🚀'}
              handleOnClick={handleGetLiveScoresOnClick}
            />
          </div>
        </div>
      </div>
    </>
  )
}
