import React, { Component } from 'react'

import Icon from '../../icons/'

export default class UploadImageButton extends Component {
  render() {
    return (
      <div className="upload-image-button">
        <Icon name="add" />
        <h2 className="button-text">upload</h2>
      </div>
    )
  }
}
