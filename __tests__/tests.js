const { calculateLeaderboardPlaces } = require('../solution.js')

// helper function from the test assignment
function checkResult (answer, correctAnswer) {
  if (!answer) return false
  if (!Array.isArray(answer)) return false
  if (answer.length !== correctAnswer.length) return false

  for (let i = 0; i < correctAnswer.length; i++) {
    const correctAnswerElement = correctAnswer[i]

    const answerElement = answer.find(
      (x) => x.userId === correctAnswerElement.userId
    )
    if (!answerElement) return false

    if (String(answerElement.place) !== String(correctAnswerElement.place))
      return false
  }

  return true
}

const minScores = {
  firstPlaceMinScore: 100,
  secondPlaceMinScore: 50,
  thirdPlaceMinScore: 10,
}

describe('Try to cover various use cases', () => {
  test('None is a winner', () => {
    expect(checkResult(calculateLeaderboardPlaces([
      { userId: 'id1', score: 3 },
      { userId: 'id2', score: 2 },
      { userId: 'id3', score: 1 },
    ], minScores), [
      { userId: 'id1', place: 4 },
      { userId: 'id2', place: 5 },
      { userId: 'id3', place: 6 },
    ])).toBe(true)
  })

  test('First user qualifies', () => {
    expect(checkResult(calculateLeaderboardPlaces([
      { userId: 'id1', score: 100 },
      { userId: 'id2', score: 3 },
      { userId: 'id3', score: 2 },
      { userId: 'id4', score: 1 },
    ], minScores), [
      { userId: 'id1', place: 1 },
      { userId: 'id2', place: 4 },
      { userId: 'id3', place: 5 },
      { userId: 'id4', place: 6 },
    ])).toBe(true)
  })

  test('First two users qualify', () => {
    expect(checkResult(calculateLeaderboardPlaces([
      { userId: 'id1', score: 100 },
      { userId: 'id2', score: 50 },
      { userId: 'id3', score: 2 },
      { userId: 'id4', score: 1 },
    ], minScores), [
      { userId: 'id1', place: 1 },
      { userId: 'id2', place: 2 },
      { userId: 'id3', place: 4 },
      { userId: 'id4', place: 5 },
    ])).toBe(true)
  })

  test('Only second place user qualifies', () => {
    expect(checkResult(calculateLeaderboardPlaces([
      { userId: 'id1', score: 55 },
      { userId: 'id2', score: 3 },
      { userId: 'id3', score: 2 },
      { userId: 'id4', score: 1 },
    ], minScores), [
      { userId: 'id1', place: 2 },
      { userId: 'id2', place: 4 },
      { userId: 'id3', place: 5 },
      { userId: 'id4', place: 6 },
    ])).toBe(true)
  })

  test('First three users qualify', () => {
    expect(checkResult(calculateLeaderboardPlaces([
      { userId: 'id1', score: 100 },
      { userId: 'id2', score: 50 },
      { userId: 'id3', score: 10 },
      { userId: 'id4', score: 1 },
    ], minScores), [
      { userId: 'id1', place: 1 },
      { userId: 'id2', place: 2 },
      { userId: 'id3', place: 3 },
      { userId: 'id4', place: 4 },
    ])).toBe(true)
  })

  test('First three users qualify with score enough for place 1', () => {
    expect(checkResult(calculateLeaderboardPlaces([
      { userId: 'id1', score: 103 },
      { userId: 'id2', score: 102 },
      { userId: 'id3', score: 101 },
      { userId: 'id4', score: 1 },
    ], minScores), [
      { userId: 'id1', place: 1 },
      { userId: 'id2', place: 2 },
      { userId: 'id3', place: 3 },
      { userId: 'id4', place: 4 },
    ])).toBe(true)
  })

  test('2 users qualify for place 1, one for place 3', () => {
    expect(checkResult(calculateLeaderboardPlaces([
      { userId: 'id1', score: 33 },
      { userId: 'id2', score: 102 },
      { userId: 'id3', score: 101 },
      { userId: 'id4', score: 1 },
    ], minScores), [
      { userId: 'id1', place: 3 },
      { userId: 'id2', place: 1 },
      { userId: 'id3', place: 2 },
      { userId: 'id4', place: 4 },
    ])).toBe(true)
  })

  test('Everyone qualifies, but we can only distribute 3 places', () => {
    expect(checkResult(calculateLeaderboardPlaces([
      { userId: 'id1', score: 100 },
      { userId: 'id2', score: 50 },
      { userId: 'id3', score: 12 },
      { userId: 'id4', score: 11 },
    ], minScores), [
      { userId: 'id1', place: 1 },
      { userId: 'id2', place: 2 },
      { userId: 'id3', place: 3 },
      { userId: 'id4', place: 4 },
    ])).toBe(true)
  })

  test('Short input', () => {
    expect(checkResult(calculateLeaderboardPlaces([
      { userId: 'id1', score: 55 },
    ], minScores), [
      { userId: 'id1', place: 2 },
    ])).toBe(true)
  })

  test('Assure sorting worked', () => {
    expect(checkResult(calculateLeaderboardPlaces([
      { userId: 'id3', score: 2 },
      { userId: 'id1', score: 100 },
      { userId: 'id2', score: 3 },
      { userId: 'id4', score: 1 }
    ], minScores), [
      { userId: 'id1', place: 1 },
      { userId: 'id2', place: 4 },
      { userId: 'id3', place: 5 },
      { userId: 'id4', place: 6 },
    ])).toBe(true)
  })
})
