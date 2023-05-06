export const getPlayingComboPicks = (comboPicks: Object) => {
  return Object.fromEntries(
    Object.entries(comboPicks).filter(
      ([playerID, pick]) => pick['total_multiplier'] > 0
    )
  )
}

export const getPlayingPlayerIDs = (playingComboPicks: Object) => {
  return Object.keys(playingComboPicks)
}

export const getCombinedPlayerIDs = (
  forPlayingPlayerIDs: any,
  againstPlayingPlayerIDs: any
) => {
  return Array.from(
    new Set([...forPlayingPlayerIDs, ...againstPlayingPlayerIDs])
  )
}

export const getSortedCombinedHeadToHeadPicksStats = (
  allPlayerIDs: any,
  forPlayingComboPicks: any,
  againstPlayingComboPicks: any
) => {
  const combinedHeadToHeadPickStats = allPlayerIDs.reduce(
    (acc: any, playerID: any) => {
      acc[playerID] = {
        playerID: playerID,
        forMultiplier: forPlayingComboPicks[playerID]
          ? forPlayingComboPicks[playerID]['total_multiplier']
          : 0,
        againstMultiplier: againstPlayingComboPicks[playerID]
          ? againstPlayingComboPicks[playerID]['total_multiplier']
          : 0,
        pickInfo: forPlayingComboPicks[playerID]
          ? forPlayingComboPicks[playerID]['pickInfo']
          : againstPlayingComboPicks[playerID]['pickInfo'],
      }
      return acc
    },
    {}
  )
  let combinedHeadToHeadPickStatsValues = Object.values(
    combinedHeadToHeadPickStats
  )

  combinedHeadToHeadPickStatsValues.sort((a: any, b: any) => {
    return b['pickInfo']['playerType'] - a['pickInfo']['playerType']
  })
  return combinedHeadToHeadPickStatsValues
}

export const getFinalSortedCombinedHeadToHeadPicksStats = (
  forComboPicks: any,
  againstComboPicks: any
) => {
  const forPlayingComboPicks = getPlayingComboPicks(forComboPicks)
  const forPlayingPlayerIDs = getPlayingPlayerIDs(forPlayingComboPicks)

  const againstPlayingComboPicks = getPlayingComboPicks(againstComboPicks)
  const againstPlayingPlayerIDs = getPlayingPlayerIDs(againstPlayingComboPicks)

  const combinedPlayerIDs = getCombinedPlayerIDs(
    forPlayingPlayerIDs,
    againstPlayingPlayerIDs
  )

  return getSortedCombinedHeadToHeadPicksStats(
    combinedPlayerIDs,
    forPlayingComboPicks,
    againstPlayingComboPicks
  )
}
