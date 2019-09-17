import React, { Component } from "react"
import PropTypes from "prop-types"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {
  actions as authActions
} from '../../store/reducers/auth'
import {
  actions as imagesActions
} from '../../store/reducers/images'

import { addPlaceholderImage } from '../shared/utils/user'

import UploadImageButton from '../shared/buttons/UploadImageButton'

class ImagesComponent extends Component {
  state = {
    imagePreview: null,
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const nextObject = nextProps.Object
    const nextUrl = nextObject && nextProps.Object.url
    const Url = this.props.Object && this.props.Object.url

    if (nextObject && this.state.file && Url !== nextUrl) {
      this.uploadToS3(nextObject, this.state.file)
    }
  }

  render() {
    const { imagePreview } = this.state
    const { user, fileUploading } = this.props

    return (
      <div className="images-component-wrapper col___gb col___gb9">
        <div className="component-buttons">
          <div id="button-upload-image">
            <div className="image-preview">
              <div
                className={`user-form-profile-image ${!imagePreview ? 'before' : 'after'}`}
                style={{ backgroundImage: `url(${addPlaceholderImage})` }}
              />
            </div>
            <input
              type="file"
              name="file"
              onChange={(e) => this.handleImageUpload(e)} />
              <UploadImageButton
            />
          </div>
        </div>
        <div className={`user-uploaded-images ${fileUploading && 'uploading'}`}>
          { 
            user.images.map((image, index) => (
                  this.renderUploadedImageThumbail(image, index)
            ))
          }
        </div>
      </div>
    )
  }

  renderUploadedImageThumbail = (image, index) => {
    //For production
    const urlPrefix = "https://login-upload-images.herokuapp.com/"
    //For development
    // const urlPrefix = "http://localhost:3001/"
    
    const thumbnailImageUrl = image

    return (
      <a target='_blank' rel="noopener noreferrer" href={image.url} key={index}>
        <div className='card-image-container'>
          <div className="card-image" style={{ backgroundImage: `url(${urlPrefix}${thumbnailImageUrl})` }} />
        </div>
      </a>
    )
  }

  handleImageUpload(e) {
    
    if (e.target.files[0]) {
      const reader = new FileReader()
      const reader2 = new FileReader()
      let file = e.target.files[0]

      reader.readAsDataURL(file)
      reader2.readAsArrayBuffer(file)

      reader.onload = (event) => {
        this.setState({
          imagePreview: [reader.result],
        })

        this.props.createImage({
          file: file
        })
      }
      if (this.state.error) {
        this.setState({ error: null })
      }
    }
  }
}

ImagesComponent.propTypes = {
  history: PropTypes.object,
  user: PropTypes.object,
}

const mapStateToProps = state => ({
  user: state.auth.user,
  Object: state.images.Object
})

const mapDispatchToProps = dispatch => bindActionCreators({
  destroyUser: authActions.destroyUser,
  createImage: imagesActions.createImage,
  uploadFileToS3: imagesActions.uploadToS3
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ImagesComponent)
