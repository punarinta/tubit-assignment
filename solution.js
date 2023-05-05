function calculateLeaderboardPlaces(users, minScores) {
  const getLimit = place => {
    switch (place) {
      case 1: return minScores.firstPlaceMinScore
      case 2: return minScores.secondPlaceMinScore
      case 3: return minScores.thirdPlaceMinScore
      default: return 0
    }
  }

  // sort users by score, top to bottom
  users.sort((a, b) => b.score - a.score)

  for (let place = 1, i = 0; i < users.length; ++place) {
    if (getLimit(place) <= users[i].score) {
      users[i++].place = place
    }
  }

  return users
}

module.exports = { calculateLeaderboardPlaces }
