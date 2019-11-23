import React from 'react'
import PropTypes from 'prop-types'
import { fetchStarcraftLadder } from '../utils/api'
import { FaUsers, FaCheckCircle, FaThumbsDown, FaStar } from 'react-icons/fa'
import Tooltip from './Tooltip'

function RegionsNav({ selected, onUpdateRegion }) {
  const regions = ['Americas', 'Europe', 'Asia']
  return (
    <ul className='flex-center'>
      {regions.map((region, index) => (
        <li key={index}>
          <button
            style={region === selected ? { color: 'rgb(187, 46, 31)' } : null}
            onClick={() => onUpdateRegion(region)}
            className='btn-clear nav-link'
          >
            {region}
          </button>
        </li>
      ))}
    </ul>
  )
}

RegionsNav.propTypes = {
  selected: PropTypes.string.isRequired,
  onUpdateRegion: PropTypes.func.isRequired,
}

function LadderGrid({ ladderPlayers }) {
  return (
    <ul className='grid space-around'>
      {ladderPlayers.map((player, index) => {
        const { displayName, favoriteRace } = player.teamMembers[0]
        const clanTag = player.teamMembers[0].clanTag
          ? player.teamMembers[0].clanTag
          : 'No Team'
        const { mmr, wins, losses } = player
        const iconSrc = favoriteRace
          ? `/assets/${favoriteRace}icon.png`
          : `/assets/randomicon.png`
        return (
          <li key={index} className='card bg-light'>
            <h4 className='header-lg center-text'>#{index + 1}</h4>
            <img
              className='avatar'
              src={iconSrc}
              alt={`Race icon for ${favoriteRace}`}
            />
            <h2 className='header-md center-text name'>{displayName}</h2>
            <ul className='card-list'>
              <li>
                <Tooltip text="User's Clan Tag">
                  <FaUsers color='rgb(255, 191, 116)' size={22} />
                  <span>{clanTag}</span>
                </Tooltip>
              </li>
              <li>
                <FaStar color='rgb(255, 215, 0)' size={22} />
                <span>{mmr}</span>
              </li>
              <li>
                <FaCheckCircle color='rgb(116, 247, 109)' size={22} />
                <span>{wins}</span>
              </li>
              <li>
                <FaThumbsDown color='rgb(245, 64, 64)' size={22} />
                <span>{losses}</span>
              </li>
            </ul>
          </li>
        )
      })}
    </ul>
  )
}

LadderGrid.propTypes = {
  ladderPlayers: PropTypes.array.isRequired,
}

export default class Regions extends React.Component {
  state = {
    selectedRegion: 'Americas',
    ladderPlayers: {},
    error: null,
  }

  componentDidMount() {
    this.updateRegion(this.state.selectedRegion)
  }

  updateRegion = selectedRegion => {
    this.setState({
      selectedRegion,
      error: null,
    })

    if (!this.state.ladderPlayers[selectedRegion]) {
      fetchStarcraftLadder(selectedRegion)
        .then(data => {
          this.setState(({ ladderPlayers }) => ({
            ladderPlayers: {
              ...ladderPlayers,
              [selectedRegion]: data,
            },
          }))
        })
        .catch(error => {
          console.warn('Error fetching ladder players: ' + error)
          this.setState({
            error: 'There was an error fetching the ladder players',
          })
        })
    }
  }

  isLoading = () => {
    const { selectedRegion, error, ladderPlayers } = this.state

    return !ladderPlayers[selectedRegion] && error === null
  }
  render() {
    const { selectedRegion, error, ladderPlayers } = this.state
    return (
      <div className='center-text'>
        <RegionsNav
          selected={this.state.selectedRegion}
          onUpdateRegion={this.updateRegion}
        />

        {this.isLoading() && <span className='loading' />}
        {error && <p className='center-text error'>error</p>}
        {ladderPlayers[selectedRegion] && (
          <LadderGrid ladderPlayers={ladderPlayers[selectedRegion]} />
        )}
      </div>
    )
  }
}
