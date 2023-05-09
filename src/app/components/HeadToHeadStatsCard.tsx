'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
interface HeadToHeadStatsCardProps {
  curRef: any
  forTeamComboData: any
  forCaptainUserData: any
  forPartnerUserData: any
  againstTeamComboData: any
  againstCaptainUserData: any
  againstPartnerUserData: any
  finalSortedCombinedHeadToHeadPicksStats: any
}
const HeadToHeadStatsCard = ({
  curRef,
  forTeamComboData,
  forCaptainUserData,
  forPartnerUserData,
  againstTeamComboData,
  againstCaptainUserData,
  againstPartnerUserData,
  finalSortedCombinedHeadToHeadPicksStats,
}: HeadToHeadStatsCardProps) => {
  const [forTotalPoints, setForTotalPoints] = useState(0)
  const [againstTotalPoints, setAgainstTotalPoints] = useState(0)

  useEffect(() => {
    setForTotalPoints(
      forTeamComboData['captainUserGameweekData']['points'] * 2 +
        forTeamComboData['partnerUserGameweekData']['points']
    )

    setAgainstTotalPoints(
      againstTeamComboData['captainUserGameweekData']['points'] * 2 +
        againstTeamComboData['partnerUserGameweekData']['points']
    )

    console.log(
      'forTeamComboData',
      forTeamComboData,
      'forCaptainUserData',
      forCaptainUserData,
      'forPartnerUserData',
      forPartnerUserData,
      'againstTeamComboData',
      againstTeamComboData,
      'againstCaptainUserData',
      againstCaptainUserData,
      'againstPartnerUserData',
      againstPartnerUserData,
      'finalSortedCombinedHeadToHeadPicksStats',
      finalSortedCombinedHeadToHeadPicksStats
    )
  }, [
    forTeamComboData,
    forCaptainUserData,
    forPartnerUserData,
    againstTeamComboData,
    againstCaptainUserData,
    againstPartnerUserData,
    finalSortedCombinedHeadToHeadPicksStats,
  ])
  return (
    <>
      <div
        ref={curRef}
        className="w-full p-5 bg-white flex flex-col items-center"
      >
        <div className="flex bg-slate-100 rounded-lg -mt-10 w-full md:w-2/3 text-xs md:text-lg">
          <div
            className={`flex w-1/2 h-full py-5 rounded-l-lg ${
              forTotalPoints > againstTotalPoints ? 'bg-green-50' : 'bg-red-50'
            } justify-between items-center`}
          >
            <div className="flex flex-col font-medium text-left text-black p-2 justify-start">
              <div>{forCaptainUserData['player_name']}</div>
              <div>{forPartnerUserData['player_name']}</div>
            </div>
            <div className="flex justify-center items-center bg-white w-20 h-20 rounded-l-md font-bold text-xl">
              {forTotalPoints}
            </div>
          </div>
          <div
            className={`flex w-1/2 h-full py-5 rounded-r-lg ${
              againstTotalPoints > forTotalPoints ? 'bg-green-50' : 'bg-red-50'
            } justify-between items-center`}
          >
            <div className="flex justify-center items-center bg-white w-20 h-20 rounded-r-md font-bold text-xl">
              {againstTotalPoints}
            </div>
            <div className="flex flex-col text-right font-medium text-black p-2 justify-end">
              <div>{againstCaptainUserData['player_name']}</div>
              <div>{againstPartnerUserData['player_name']}</div>
            </div>
          </div>
        </div>

        {/** ALL PLAYERS STATS */}

        <div className="flex flex-col w-full space-y-3 justify-center items-center">
          {Object.entries(finalSortedCombinedHeadToHeadPicksStats).map(
            (eachCategoryStats: any, index: any) => {
              return (
                <div
                  className=" flex flex-col w-full md:w-2/3 space-y-3 my-5"
                  key={index}
                >
                  {/** CATEGORY HEADER*/}
                  <div className="flex justify-center items-center font-semibold text-black text-lg capitalize">
                    {eachCategoryStats[0]}
                  </div>

                  {/** EACH CATEGORY */}

                  {eachCategoryStats[1].map((categoryPick: any, index: any) => (
                    <div
                      className="flex flex-col w-full bg-slate-50 rounded-md items-center justify-start"
                      key={index}
                    >
                      <div className="flex justify-center items-center space-x-3 rounded-t-md bg-slate-100 p-2 w-full text-slate-600 font-medium">
                        {/** TEAM NAME */}
                        <div>{categoryPick['pickInfo']['teamName']}</div>

                        {/** TEAM LOGO */}
                        <div className="flex p-2 rounded-md bg-white">
                          <Image
                            src={`/${categoryPick['pickInfo']['teamName']}.png`}
                            alt="logo"
                            width={25}
                            height={25}
                          />
                        </div>

                        {/** PLAYER NAME */}
                        <div>{categoryPick['pickInfo']['displayName']}</div>
                      </div>
                      <div className="flex w-full text-xs text-center">
                        {/** FOR TEAM STATS */}
                        <div className="flex justify-between items-center w-1/2 p-3">
                          {/** EACH PARAMETER */}
                          <div className="flex flex-col space-y-3">
                            <div className="text-slate-600">Count</div>
                            <div className="flex p-2 rounded-md bg-white text-black justify-center items-center">
                              {categoryPick['forMultiplier']}
                            </div>
                          </div>

                          {/** EACH PARAMETER */}
                          <div className="flex flex-col space-y-3">
                            <div className="text-slate-600">Points</div>
                            <div className="flex p-2 rounded-md bg-white text-black justify-center items-center">
                              {categoryPick['pickInfo']['points']}
                            </div>
                          </div>

                          {/** EACH PARAMETER */}
                          <div className="flex flex-col space-y-3">
                            <div className="text-slate-600">Total Points</div>
                            <div
                              className={`flex p-2 rounded-md ${
                                categoryPick['forMultiplier'] >=
                                categoryPick['againstMultiplier']
                                  ? 'bg-green-50'
                                  : 'bg-red-50'
                              } text-black justify-center items-center`}
                            >
                              {categoryPick['forMultiplier'] *
                                categoryPick['pickInfo']['points']}
                            </div>
                          </div>
                        </div>

                        {/** AGAINST TEAM STATS */}
                        <div className="flex justify-between items-center w-1/2 p-3">
                          {/** EACH PARAMETER */}
                          <div className="flex flex-col space-y-3">
                            <div className="text-slate-600">Total Points</div>
                            <div
                              className={`flex p-2 rounded-md ${
                                categoryPick['againstMultiplier'] >=
                                categoryPick['forMultiplier']
                                  ? 'bg-green-50'
                                  : 'bg-red-50'
                              } text-black justify-center items-center`}
                            >
                              {categoryPick['againstMultiplier'] *
                                categoryPick['pickInfo']['points']}
                            </div>
                          </div>

                          {/** EACH PARAMETER */}
                          <div className="flex flex-col space-y-3">
                            <div className="text-slate-600 ">Points</div>
                            <div className="flex p-2 rounded-md bg-white text-black justify-center items-center">
                              {categoryPick['pickInfo']['points']}
                            </div>
                          </div>

                          {/** EACH PARAMETER */}
                          <div className="flex flex-col space-y-3">
                            <div className="text-slate-600">Count</div>
                            <div className="flex p-2 rounded-md bg-white text-black justify-center items-center">
                              {categoryPick['againstMultiplier']}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            }
          )}
        </div>
      </div>
    </>
  )
}

export default HeadToHeadStatsCard
