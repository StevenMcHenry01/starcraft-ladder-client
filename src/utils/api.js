import axios from 'axios'

let players = null
const apiEndpoint = 'https://starcraft-ladder-api.herokuapp.com/ladder'

export function fetchStarcraftLadder(region) {
  region = region.toLowerCase()
  const endpoint = `${apiEndpoint}/${region}`

  return axios.get(endpoint).then(res => {
    if (!res.data.ladderTeams) {
      throw new Error(res.message)
    }
    return res.data.ladderTeams
  })
}

function fetchStarcraftPlayers() {
  const americanEndpoint = `${apiEndpoint}/americas`
  const europeanEndpoint = `${apiEndpoint}/europe`
  const asianEndpoint = `${apiEndpoint}/asia`

  const americanPlayers = axios.get(americanEndpoint).then(res => {
    if (!res.data.ladderTeams) {
      throw new Error(res.message)
    }
    return res.data.ladderTeams
  })

  const europeanPlayers = axios.get(europeanEndpoint).then(res => {
    if (!res.data.ladderTeams) {
      throw new Error(res.message)
    }
    return res.data.ladderTeams
  })

  const asianPlayers = axios.get(asianEndpoint).then(res => {
    if (!res.data.ladderTeams) {
      throw new Error(res.message)
    }
    return res.data.ladderTeams
  })

  return Promise.all([americanPlayers, europeanPlayers, asianPlayers]).then(
    values => {
      return values
    }
  )
}

async function getPlayer(username) {
  let player = null

  if (players === null) {
    players = await fetchStarcraftPlayers()
      .then(playersArray => {
        return playersArray[0].concat(playersArray[1]).concat(playersArray[2])
      })
      .catch(err => {
        throw new Error(err)
      })
  }
  player = players.filter(val => {
    return (
      val.teamMembers[0].displayName.toLowerCase() === username.toLowerCase()
    )
  })
  if (player.length === 0) {
    return {
      player: null,
      message: `player ${username} does not exist`,
      score: 0,
    }
  }
  if (player.length > 1) {
    return {
      player: player[0],
      message: `multiple users were found with the name ${username}`,
      score: getScore(player[0]),
    }
  }
  return {
    player: player[0],
    message: null,
    score: getScore(player[0]),
  }
}

function getScore(player) {
  return (
    player.mmr / 2 + player.points * 2 + player.wins * 20 - player.losses * 30
  )
}

function sortPlayers(players) {
  return players.sort((a, b) => b.score - a.score)
}

export function battle(players) {
  return Promise.all([getPlayer(players[0]), getPlayer(players[1])]).then(
    results => {
      return sortPlayers(results)
    }
  )
}
