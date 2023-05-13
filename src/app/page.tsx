'use client'
import Image from 'next/image'
import Logo from '../../public/logo.png'
import SalahBanner from '../../public/banner.svg'
import SelectDropdown from './components/SelectDropdown'
import { useEffect, useRef, useState } from 'react'
import Button from './components/Button'
import { getFinalSortedCombinedHeadToHeadPicksStats } from './utils/commonUtils'
import HeadToHeadStatsCard from './components/HeadToHeadStatsCard'
import { flushSync } from 'react-dom'
import React from 'react'

export default function Home() {
  const headToHeadStatsCardRef = useRef<null | HTMLDivElement>(null)
  const [forCaptainUserData, setForCaptainUserData] = useState(null)
  const [forPartnerUserData, setForPartnerUserData] = useState(null)
  const [againstCaptainUserData, setAgainstCaptainUserData] = useState(null)
  const [againstPartnerUserData, setAgainstPartnerUserData] = useState(null)
  const [usersList, setUsersList] = useState([])
  const [activeGameweekID, setActiveGameweekID] = useState(0)
  const [forComboTeamStats, setForComboTeamStats] = useState(null)
  const [againstComboTeamStats, setAgainstComboTeamStats] = useState(null)
  const [
    finalSortedCombinedHeadToHeadPicksStats,
    setFinalSortedCombinedHeadToHeadPicksStats,
  ] = useState(null)

  const fetchUsersList = async () => {
    try {
      const activeGameweekResult = await fetch(
        `https://mini-leagues-api.glitch.me/api/gameweek/active`
      )
      const activeGameweekData = await activeGameweekResult.json()
      setActiveGameweekID(activeGameweekData['gameweekID'])
      const tvtLeagueResult = await fetch(
        `https://mini-leagues-api.glitch.me/api/leagues/tvtleague`
      )
      const tvtLeagueData = await tvtLeagueResult.json()
      const curUsersList = tvtLeagueData['standings']['results']
      setUsersList(curUsersList)
    } catch (err) {
      console.log(err)
    }
  }

  const handleGetLiveScoresOnClick = async (event: any) => {
    flushSync(async () => {
      await fetchComboData()
    })
    headToHeadStatsCardRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const fetchComboData = async () => {
    const forCaptainUserEntry = forCaptainUserData
      ? forCaptainUserData['entry']
      : ''
    const forPartnerUserEntry = forPartnerUserData
      ? forPartnerUserData['entry']
      : ''
    const againstCaptainUserEntry = againstCaptainUserData
      ? againstCaptainUserData['entry']
      : ''
    const againstPartnerUserEntry = againstPartnerUserData
      ? againstPartnerUserData['entry']
      : ''
    const forVsAgainstComboResult = await fetch(
      `https://mini-leagues-api.glitch.me/api/leagues/tvtleague/forcombovsagainstcombo?gameweekID=${activeGameweekID}&forCaptainUserID=${forCaptainUserEntry}&forPartnerUserID=${forPartnerUserEntry}&againstCaptainUserID=${againstCaptainUserEntry}&againstPartnerUserID=${againstPartnerUserEntry}`
    )

    const forVsAgainstComboData: any = await forVsAgainstComboResult.json()
    console.log('for vs against combo data', forVsAgainstComboResult)

    const forComboPicks = forVsAgainstComboData['forComboData']['comboPicks']
    const againstComboPicks =
      forVsAgainstComboData['againstComboData']['comboPicks']

    const finalSortedCombinedHeadToHeadPicksStats: any =
      getFinalSortedCombinedHeadToHeadPicksStats(
        forComboPicks,
        againstComboPicks
      )

    setForComboTeamStats(forVsAgainstComboData['forComboData'])
    setAgainstComboTeamStats(forVsAgainstComboData['againstComboData'])
    setFinalSortedCombinedHeadToHeadPicksStats(
      finalSortedCombinedHeadToHeadPicksStats
    )
    console.log(finalSortedCombinedHeadToHeadPicksStats)
  }

  const isButtonDisabled = () => {
    return (
      !forCaptainUserData ||
      !forPartnerUserData ||
      !againstCaptainUserData ||
      !againstPartnerUserData
    )
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
                    defaultOption={'Choose the user'}
                  />
                  <SelectDropdown
                    labelText={'For Partner Team'}
                    optionsList={usersList}
                    valueKey="player_name"
                    handleSelectChange={setForPartnerUserData}
                    defaultOption={'Choose the user'}
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
                    defaultOption={'Choose the user'}
                    valueKey="player_name"
                    handleSelectChange={setAgainstCaptainUserData}
                  />
                  <SelectDropdown
                    labelText={'Against Partner Team'}
                    optionsList={usersList}
                    defaultOption={'Choose the user'}
                    valueKey="player_name"
                    handleSelectChange={setAgainstPartnerUserData}
                  />
                </div>
              </div>

              <div className="flex w-full p-5 grow justify-center items-center">
                <Button
                  buttonText={'Get Live Scores 🚀'}
                  handleOnClick={handleGetLiveScoresOnClick}
                  isDisabled={isButtonDisabled()}
                />
              </div>
            </div>
          </div>
        </div>

        {/** HEAD TO HEAD WRAPPER */}
        <div className="flex w-full">
          {finalSortedCombinedHeadToHeadPicksStats && (
            <HeadToHeadStatsCard
              curRef={headToHeadStatsCardRef}
              forTeamComboData={forComboTeamStats}
              againstTeamComboData={againstComboTeamStats}
              finalSortedCombinedHeadToHeadPicksStats={
                finalSortedCombinedHeadToHeadPicksStats
              }
              forCaptainUserData={forCaptainUserData}
              forPartnerUserData={forPartnerUserData}
              againstCaptainUserData={againstCaptainUserData}
              againstPartnerUserData={againstPartnerUserData}
            />
          )}
        </div>
      </div>
    </>
  )
}
