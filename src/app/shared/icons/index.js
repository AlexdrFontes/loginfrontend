import React from 'react'
import PropTypes from 'prop-types'

const Icon = ({ name, className }) => (
  <span className={`font-icon icon-${name}${className ? ` ${className}` : ''}`} />
)

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
}

export default Icon
