'use client'
import Image from 'next/image'
interface HeadToHeadStatsCardProps {
  forTeamComboData: any
  againstTeamComboData: any
  finalSortedCombinedHeadToHeadPicksStats: any
}
const HeadToHeadStatsCard = ({
  forTeamComboData,
  againstTeamComboData,
  finalSortedCombinedHeadToHeadPicksStats,
}: HeadToHeadStatsCardProps) => {
  return (
    <>
      <div className="w-full p-5 bg-white flex flex-col items-center">
        <div className="flex bg-slate-100 rounded-lg -mt-10 w-full md:w-2/3 text-xs md:text-lg">
          <div className="flex w-1/2 h-full py-5 rounded-l-lg bg-green-50 justify-between items-center">
            <div className="flex flex-col font-medium text-left text-black p-2 justify-start">
              <div>Harsh Bharvada - ST</div>
              <div>Angad S Varder</div>
            </div>
            <div className="flex justify-center items-center bg-white w-20 h-20 rounded-l-md font-bold text-xl">
              298
            </div>
          </div>
          <div className="flex w-1/2 h-full py-5 rounded-r-lg bg-red-50 justify-between items-center">
            <div className="flex justify-center items-center bg-white w-20 h-20 rounded-r-md font-bold text-xl">
              298
            </div>
            <div className="flex flex-col text-right font-medium text-black p-2 justify-end">
              <div>Harsh Bharvada - ST</div>
              <div>Angad S Varder</div>
            </div>
          </div>
        </div>

        {/** ALL PLAYERS STATS */}

        {/** FORWARDS SECTION */}
        <div className=" flex flex-col w-full md:w-2/3 space-y-3 my-5">
          {/** FORWARDS HEADER*/}
          <div className="flex justify-center items-center font-semibold text-black text-lg">
            Forwards
          </div>

          {/** EACH FORWARD */}

          <div className="flex flex-col w-full bg-slate-50 rounded-md items-center justify-start">
            <div className="flex justify-center items-center space-x-3 rounded-t-md bg-slate-100 p-2 w-full text-slate-600 font-medium">
              {/** TEAM NAME */}
              <div>Spurs</div>

              {/** TEAM LOGO */}
              <div className="flex p-2 rounded-md bg-white">
                <Image src="/spurs.png" alt="logo" width={25} height={25} />
              </div>

              {/** PLAYER NAME */}
              <div>Kane</div>
            </div>
            <div className="flex w-full text-xs text-center">
              {/** FOR TEAM STATS */}
              <div className="flex justify-between items-center w-1/2 p-3">
                {/** EACH PARAMETER */}
                <div className="flex flex-col space-y-3">
                  <div className="text-slate-600">Count</div>
                  <div className="flex p-2 rounded-md bg-white text-black justify-center items-center">
                    1
                  </div>
                </div>

                {/** EACH PARAMETER */}
                <div className="flex flex-col space-y-3">
                  <div className="text-slate-600">Points</div>
                  <div className="flex p-2 rounded-md bg-white text-black justify-center items-center">
                    10
                  </div>
                </div>

                {/** EACH PARAMETER */}
                <div className="flex flex-col space-y-3">
                  <div className="text-slate-600">Total Points</div>
                  <div className="flex p-2 rounded-md bg-white text-black justify-center items-center">
                    10
                  </div>
                </div>
              </div>

              {/** AGAINST TEAM STATS */}
              <div className="flex justify-between items-center w-1/2 p-3">
                {/** EACH PARAMETER */}
                <div className="flex flex-col space-y-3">
                  <div className="text-slate-600">Total Points</div>
                  <div className="flex p-2 rounded-md bg-white text-black justify-center items-center">
                    30
                  </div>
                </div>

                {/** EACH PARAMETER */}
                <div className="flex flex-col space-y-3">
                  <div className="text-slate-600 ">Points</div>
                  <div className="flex p-2 rounded-md bg-white text-black justify-center items-center">
                    10
                  </div>
                </div>

                {/** EACH PARAMETER */}
                <div className="flex flex-col space-y-3">
                  <div className="text-slate-600">Count</div>
                  <div className="flex p-2 rounded-md bg-white text-black justify-center items-center">
                    3
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HeadToHeadStatsCard
