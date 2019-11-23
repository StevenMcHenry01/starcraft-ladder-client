import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Hover from './Hover'

function Tooltip({ text, children }) {
  return (
    <Hover>
      {(hovering) => (
        <StyledContainer>
          {hovering === true && <StyledTooltip>{text}</StyledTooltip>}
          {children}
        </StyledContainer>
      )}
    </Hover>
  )
}

Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
}

export default Tooltip

//////////////
// Styles
//////////////

const StyledContainer = styled.div`
  position: relative;
  display: flex;
`

const StyledTooltip = styled.div`
  box-sizing: border-box;
  position: absolute;
  width: 160px;
  bottom: 100%;
  left: 50%;
  margin-left: -80px;
  border-radius: 3px;
  background-color: hsla(0, 0%, 20%, 0.9);
  padding: 7px;
  margin-bottom: 5px;
  color: #fff;
  text-align: center;
  font-size: 14px;
`
