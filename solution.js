// since we have 100 users max I see no value in any specific optimization
// however if had unlimited amount of users I would probably try to solve things in a single loop

function calculateLeaderboardPlaces(users, minScores) {
  // sort users by score, top to bottom
  users.sort((a, b) => b.score - a.score)

  // start from the first place
  let place = 1

  for (let i = 0; i < users.length; i++) {
    const user = users[i]

    // assign the place based on the score and the minimum scores for the top-3 places
    if (user.score >= minScores.firstPlaceMinScore) {
      user.place = place
    } else if (user.score >= minScores.secondPlaceMinScore) {
      user.place = place + 1
    } else if (user.score >= minScores.thirdPlaceMinScore) {
      user.place = place + 2
    } else {
      user.place = place + 3
      // only increase the place if the user is not in the top-3
      place++
    }
  }

  // iterate over users and if any of two users in array have the same place, shift the place of the second user down and restart the search

  let i = 0
  for (let i = 0; i < users.length; i++) {
    const user = users[i]

    for (let j = i + 1; j < users.length; j++) {
      const otherUser = users[j]

      if (user.place === otherUser.place) {
        users[j].place++
        i = -1
      }
    }
  }

  return users.map(({ userId, place }) => ({ userId, place }))
}

module.exports = { calculateLeaderboardPlaces }
