import React from 'react'
import PropTypes from 'prop-types'
import { battle } from '../utils/api'
import ResultCard from './ResultCard'
import { ThemeConsumer } from '../contexts/theme'
import {Link} from 'react-router-dom'
import queryString from 'query-string'

export default class Results extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true,
    }
  }
  componentDidMount() {
    const { playerOne, playerTwo } = queryString.parse(this.props.location.search)

    // make api call
    battle([playerOne, playerTwo])
      .then(players => {
        this.setState({
          winner: players[0],
          loser: players[1],
          error: null,
          loading: false,
        })
      })
      .catch(err => {
        this.setState({
          error: err,
          loading: false,
        })
      })
  }

  render() {
    const { winner, loser, error, loading } = this.state

    if (loading === true) {
      return (
        <ThemeConsumer>
          {({ theme }) => (
            <div className='center-text'>
              <span className='loading' />
            </div>
          )}
        </ThemeConsumer>
      )
    }

    if (error) {
      return <p className='center-text error'>{error}</p>
    }
    return (
      <ThemeConsumer>
        {({ theme }) => (
          <>
            <div className='grid space-around container-sm'>
              <ResultCard result={winner} other={loser} />
              <ResultCard result={loser} other={winner} />
            </div>
            <Link
              className={`btn btn-${theme} btn-space`}
              to={'/battle'}
            >
              Reset
            </Link>
          </>
        )}
      </ThemeConsumer>
    )
  }
}
