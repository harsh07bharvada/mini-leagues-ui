'use client'
import Image from 'next/image'
import Logo from '../../public/logo.png'
import SalahBanner from '../../public/banner.svg'
import { Poppins } from 'next/font/google'
import SelectDropdown from './components/SelectDropdown'
import { useEffect, useState } from 'react'
import Button from './components/Button'
import { getFinalSortedCombinedHeadToHeadPicksStats } from './utils/commonUtils'
import HeadToHeadStatsCard from './components/HeadToHeadStatsCard'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '400', '500', '700', '800'],
})

export default function Home() {
  const [forCaptainUserData, setForCaptainUserData] = useState(null)
  const [forPartnerUserData, setForPartnerUserData] = useState(null)
  const [againstCaptainUserData, setAgainstCaptainUserData] = useState(null)
  const [againstPartnerUserData, setAgainstPartnerUserData] = useState(null)
  const [usersList, setUsersList] = useState([])
  const [activeGameweekID, setActiveGameweekID] = useState(0)
  const [forComboTeamData, setForComboTeamData] = useState(null)
  const [againstComboTeamData, setAgainstComboTeamData] = useState(null)
  const [
    finalSortedCombinedHeadToHeadPicksStats,
    setFinalSortedCombinedHeadToHeadPicksStats,
  ] = useState(null)

  const fetchUsersList = async () => {
    try {
      const activeGameweekResult = await fetch(
        `https://mini-leagues-api.onrender.com/api/gameweek/active`
      )
      const activeGameweekData = await activeGameweekResult.json()
      setActiveGameweekID(activeGameweekData['gameweekID'])
      const tvtLeagueResult = await fetch(
        `https://mini-leagues-api.onrender.com/api/leagues/tvtleague`
      )
      const tvtLeagueData = await tvtLeagueResult.json()
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

  const handleGetLiveScoresOnClick = async (event: any) => {
    await fetchComboData()
  }

  const fetchComboData = async () => {
    const forCaptainUserEntry = forCaptainUserData
      ? forCaptainUserData['entry']
      : ''
    const forPartnerUserEntry = forPartnerUserData
      ? forPartnerUserData['entry']
      : ''
    const forTeamComboResult = await fetch(
      `https://mini-leagues-api.onrender.com/api/leagues/tvtleague/combodata?gameweekID=${activeGameweekID}&captainUserID=${forCaptainUserEntry}&partnerUserID=${forPartnerUserEntry}`
    )

    const forTeamComboData = await forTeamComboResult.json()
    console.log('for combo data', forTeamComboData)
    const againstCaptainUserEntry = againstCaptainUserData
      ? againstCaptainUserData['entry']
      : ''
    const againstPartnerUserEntry = againstPartnerUserData
      ? againstPartnerUserData['entry']
      : ''
    const againstTeamComboResult = await fetch(
      `https://mini-leagues-api.onrender.com/api/leagues/tvtleague/combodata?gameweekID=${activeGameweekID}&captainUserID=${againstCaptainUserEntry}&partnerUserID=${againstPartnerUserEntry}`
    )

    const againstTeamComboData = await againstTeamComboResult.json()
    console.log('against combo data', againstTeamComboData)

    const forComboPicks = forTeamComboData['comboPicks']
    const againstComboPicks = againstTeamComboData['comboPicks']

    const finalSortedCombinedHeadToHeadPicksStats: any =
      getFinalSortedCombinedHeadToHeadPicksStats(
        forComboPicks,
        againstComboPicks
      )

    setForComboTeamData(forComboTeamData)
    setAgainstComboTeamData(againstComboTeamData)
    setFinalSortedCombinedHeadToHeadPicksStats(
      finalSortedCombinedHeadToHeadPicksStats
    )
    console.log(finalSortedCombinedHeadToHeadPicksStats)
  }

  useEffect(() => {
    fetchUsersList()
  }, [])

  return (
    <>
      <div className="whole-page-wrapper flex flex-col">
        {/** MAIN PAGE WRAPPER */}
        <div className={` flex flex-col bg-slate-50`}>
          {/** MAIN PAGE HEADER */}
          <div className="flex w-full p-5 space-x-3 justify-center items-center">
            <Image src={Logo} alt="logo" width={50} height={50} className="" />
            <div className="text-xl font-bold">mini leagues</div>
          </div>

          {/** MAIN PAGE */}
          <div className="flex flex-col grow mx-5 my-16 md:mx-20 p-5 bg-white rounded-md justify-start items-center space-y-5">
            <Image
              src={SalahBanner}
              alt="logo"
              width={200}
              height={200}
              className="-mt-24 md:w-72 md:h-72"
            />
            <div className="text-xl text-center">
              Get fastest 🚀 live updates for your head to head match ups
              against your fiercest FPL rivals
            </div>
            <div className="flex flex-col w-full md:w-auto md:p-5 bg-slate-50 rounded-md">
              {/** FOR VS AGAINST*/}
              <div className="flex flex-col md:flex-row md:p-5 space-y-3 md:space-x-5 justify-center items-center">
                {/** FOR */}
                <div className=" flex flex-col w-full space-y-3">
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
                <span className="p-2 md:p-5 rounded-md bg-white text-lg md:text-xl">
                  Vs
                </span>

                {/** AGAINST */}
                <div className=" flex flex-col w-full space-y-5">
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

        {/** HEAD TO HEAD WRAPPER */}
        <div className="flex w-full">
          <HeadToHeadStatsCard
            forTeamComboData={forComboTeamData}
            againstTeamComboData={againstComboTeamData}
            finalSortedCombinedHeadToHeadPicksStats={
              finalSortedCombinedHeadToHeadPicksStats
            }
          />
        </div>
      </div>
    </>
  )
}
