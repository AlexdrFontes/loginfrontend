import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export default class CustomButton extends Component {
  render() {
    const { children, color, disabled, inactive, id, height, onClick, route, stateObject, text, type, width} = this.props

    const buttonStyle = this.buttonStyle(type, color, disabled, inactive)
    const textStyle = this.textStyle(type, color ? color : 'white')
    const customMeasures = this.customMeasures(width, height)

    return (
      <div className={buttonStyle} id={id} style={customMeasures} onClick={onClick}>
          { (route && (!disabled || !inactive)) ?
            route.charAt(0) === '/' ?
              <Link
                className={textStyle}
                to={{pathname: route, state: stateObject}}>
                {text}
                {children}
              </Link>
              :
              <a className={textStyle} href={route}>
                {text}
                {children}
              </a>
            :
            <h2 className={textStyle}>
              {text}
              {children &&
                <div className="hidden-content">
                  {children}
                </div>
              }
            </h2>
          }
      </div>
    )
  }

  customMeasures = (width, height) => {
    return (
      {
        width: width,
        height: height
      }
    )
  }

  buttonStyle = (style, color, disabled, inactive) => {
    switch (style) {
      case "filled":
        return `custom-button filled ${color || ''} ${disabled || ''} ${inactive || ''}`
      case "empty":
        return `custom-button empty ${disabled || ''} ${inactive || ''}`
      default:
        return 'custom-button'
    }
  }

  textStyle = (style, color, inactive) => {
    switch (style) {
      case "filled":
        return `custom-button-text ${color || ''} ${inactive || ''}`
      case "empty":
        return `custom-button-text ${color || ''} ${inactive || ''}`
      default:
        return 'custom-button-text'
    }
  }
}

CustomButton.propTypes = {
  color: PropTypes.string,
  children: PropTypes.any,
  id: PropTypes.string,
  disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  height: PropTypes.number,
  onClick: PropTypes.func,
  text: PropTypes.string,
  type: PropTypes.string.isRequired,
  route: PropTypes.string,
  stateObject: PropTypes.object,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}
