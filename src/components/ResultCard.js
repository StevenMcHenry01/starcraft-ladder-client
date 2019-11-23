import React from 'react'
import {
  FaGlobeAmericas,
  FaBattleNet,
  FaUsers,
  FaCheckCircle,
  FaThumbsDown,
  FaStar,
} from 'react-icons/fa'
import ToolTip from './Tooltip'

function regionName(player) {
  if (player.teamMembers[0].region === 1) {
    return 'America'
  }
  if (player.teamMembers[0].region === 2) {
    return 'Europe'
  }
  if (player.teamMembers[0].region === 3) {
    return 'Asia'
  }
}

export default function ResultCard({ result, other }) {
  return (
    <div className='card bg-light'>
      {result.player ? (
        <>
          {result.score >= other.score ? (
            <h4 className='header-lg center-text'>
              {result.score === other.score ? 'Tie' : 'Winner'}
            </h4>
          ) : (
            <h4 className='header-lg center-text'>
              {result.score === other.score ? 'Tie' : 'Loser'}
            </h4>
          )}
          <img
            className='avatar'
            src={`/app/assets/${result.player.teamMembers[0].favoriteRace}icon.png`}
            alt={`Avatar for ${result.player.teamMembers[0].favoriteRace}`}
          />
          <h4 className='center-text'>Score: {result.score}</h4>
          <h2 className='center-text'>
            <a>{result.player.teamMembers[0].displayName}</a>
          </h2>
          <ul className='card-list'>
            <li>
              <ToolTip text='Calculated User Score'>
                <FaStar color='rgb(255, 215, 0)' size={22} />
                {result.score}
              </ToolTip>
            </li>
            {result.player.teamMembers[0].clanTag ? (
              <li>
                <ToolTip text="User's Clan Tag">
                  <FaUsers color='rgb(255, 191, 116)' size={22} />
                  {result.player.teamMembers[0].clanTag}
                </ToolTip>
              </li>
            ) : (
              <li>
                <ToolTip text='User Has No Clan'>
                  <FaUsers color='rgb(255, 191, 116)' size={22} />
                  No team
                </ToolTip>
              </li>
            )}
            <li>
              <FaBattleNet color='rgb(0, 180, 255)' size={22} />
              {result.player.mmr} MMR
            </li>
            <li>
              <FaCheckCircle color='rgb(116, 247, 109)' size={22} />
              {result.player.wins} wins
            </li>
            <li>
              <FaThumbsDown color='rgb(245, 64, 64)' size={22} />
              {result.player.losses} losses
            </li>
            <li>
              <FaGlobeAmericas color='rgb(4, 38, 189)' size={22} />
              {regionName(result.player)}
            </li>
          </ul>
          {result.message && (
            <p className='center-text error'>{result.message}</p>
          )}
        </>
      ) : (
        <p className='center-text error'>{result.message}</p>
      )}
    </div>
  )
}
