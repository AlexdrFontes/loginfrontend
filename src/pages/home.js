import React, { Component } from "react"

import ImagesComponent from '../app/ImagesComponent'

class Home extends Component {
  render() {
    return (
       <ImagesComponent/>
    )
  }

  onClick = () => {
    this.setState({ createPageModalOpen: true })
  }
}

export default Home
