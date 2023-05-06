'use client'

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
            <div className="flex flex-col font-medium text-left text-slate-500 p-2 justify-start">
              <div className="flex p-2 rounded-md bg-white border border-emerald-100 justify-start items-center">
                <div className="flex justify-center items-center rounded-l-lg  font-semibold bg-green-200 text-white">
                  C
                </div>
                Harsh Bharvada - ST
              </div>
              <div> Angad S Varder</div>
            </div>
            <div className="flex justify-center items-center bg-white w-20 h-20 rounded-l-md font-bold text-xl">
              298
            </div>
          </div>
          <div className="flex w-1/2 h-full py-5 rounded-r-lg bg-red-50 justify-between items-center">
            <div className="flex justify-center items-center bg-white w-20 h-20 rounded-r-md font-bold text-xl">
              298
            </div>
            <div className="flex flex-col text-right font-medium text-slate-500 p-2 justify-end">
              <div className="p-2 rounded-md bg-slate-50 border border-rose-100">
                Harsh Bharvada - ST
              </div>
              <div> Angad S Varder</div>
            </div>
          </div>
        </div>
        Other parts
      </div>
    </>
  )
}

export default HeadToHeadStatsCard
