const addPlaceholderImage = require('../../.././assets/images/add_image.png')

function getInfoFormInitialState(user) {
  return {
    name: user.name,
    email: user.email,
    password: null,
    passwordConfirm: null,
    nicknameInputError: false,
    firstNameInputError: false,
    lastNameInputError: false,
    emailInputError: false,
  }
}

export {
  getInfoFormInitialState,
  addPlaceholderImage
}
