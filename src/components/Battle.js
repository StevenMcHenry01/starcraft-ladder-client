import React from 'react'
import {
  FaUserFriends,
  FaTrophy,
  FaBattleNet,
  FaTimesCircle,
  FaUserCircle,
} from 'react-icons/fa'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { ThemeConsumer } from '../contexts/theme'

function Instructions() {
  return (
    <ThemeConsumer>
      {({ theme }) => (
        <div className='instructions-container'>
          <h1 className='center-text header-lg'>Instructions</h1>
          <ol className='container-sm grid center-text battle-instructions'>
            <li>
              <h3 className='header-sm'>Enter two players</h3>
              <FaUserFriends
                className={`bg-${theme}`}
                color='rgb(255, 191, 116)'
                size={80}
              />
            </li>
            <li>
              <h3 className='header-sm'>Battle</h3>
              <FaBattleNet
                className={`bg-${theme}`}
                color='rgb(0, 180, 255)'
                size={80}
              />
            </li>
            <li>
              <h3 className='header-sm'>See the winner</h3>
              <FaTrophy
                className={`bg-${theme}`}
                color='rgb(255, 215, 0)'
                size={80}
              />
            </li>
          </ol>
        </div>
      )}
    </ThemeConsumer>
  )
}

class PlayerInput extends React.Component {
  state = {
    username: '',
  }

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
  }

  handleChange = event => {
    this.setState({
      username: event.target.value,
    })
  }

  handleSubmit = event => {
    event.preventDefault()

    this.props.onSubmit(this.state.username)
  }

  render() {
    return (
      <ThemeConsumer>
        {({ theme }) => (
          <form className='column player' onSubmit={this.handleSubmit}>
            <label htmlFor='username' className='player-label'>
              {this.props.label}
            </label>
            <div className='row player-inputs'>
              <input
                type='text'
                id='username'
                className={`input-${theme}`}
                placeholder='grandmaster username'
                autoComplete='off'
                value={this.state.username}
                onChange={this.handleChange}
              />
              <button
                className={`btn btn-${theme}`}
                type='submit'
                disabled={!this.state.username}
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </ThemeConsumer>
    )
  }
}

function PlayerPreview({ username, onReset, label }) {
  return (
    <div className='column player'>
      <h3 className='player-label'>{label}</h3>
      <div className='row bg-light'>
        <div className='player-info'>
          <FaUserCircle color='rgb(255, 191, 116)' className='avatar-small' />
          <a href='#' className='link'>
            {username}
          </a>
        </div>
        <button className='btn-clear flex-center' onClick={onReset}>
          <FaTimesCircle color='rgb(194,57, 42' size={26} />
        </button>
      </div>
    </div>
  )
}

PlayerPreview.propTypes = {
  username: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
}

export default class Battle extends React.Component {
  state = {
    playerOne: null,
    playerTwo: null,
  }

  handleSubmit = (id, player) => {
    this.setState({
      [id]: player,
    })
  }

  handleReset = id => {
    this.setState({
      [id]: null,
    })
  }

  componentDidMount() {}

  render() {
    const { playerOne, playerTwo } = this.state

    return (
      <ThemeConsumer>
        {({ theme }) => (
          <>
            <Instructions />
            <div className='player-container'>
              <h1 className='center-text header-lg'>Players</h1>
              <div className='row space-around'>
                {playerOne === null ? (
                  <PlayerInput
                    label='Player One'
                    onSubmit={player => this.handleSubmit('playerOne', player)}
                  />
                ) : (
                  <PlayerPreview
                    username={playerOne}
                    label='Player One'
                    onReset={() => this.handleReset('playerOne')}
                  />
                )}

                {playerTwo === null ? (
                  <PlayerInput
                    label='Player Two'
                    onSubmit={player => this.handleSubmit('playerTwo', player)}
                  />
                ) : (
                  <PlayerPreview
                    username={playerTwo}
                    label='Player Two'
                    onReset={() => this.handleReset('playerTwo')}
                  />
                )}
              </div>
              {playerOne && playerTwo && (
                <Link
                  className={`btn btn-${theme} btn-space`}
                  to={{
                    pathname: '/battle/results',
                    search: `?playerOne=${playerOne}&playerTwo=${playerTwo}`,
                  }}
                >
                  Battle
                </Link>
              )}
            </div>
          </>
        )}
      </ThemeConsumer>
    )
  }
}
