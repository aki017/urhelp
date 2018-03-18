import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Main from "../src/main"

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Main />,
    document.body.appendChild(document.createElement('div')),
  )
})
