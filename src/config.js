const currentEnvironment = !process.env.NODE_ENV ? 'development' : process.env.NODE_ENV

const defaultEnvironments = {
  development: {
    BASE_URL: 'https://login-upload-images.herokuapp.com/',
    API_BASE_URL: 'https://login-upload-images.herokuapp.com//v1',
  },

  production: {
    BASE_URL: 'https://login-upload-images.herokuapp.com/',
    API_BASE_URL: 'https://login-upload-images.herokuapp.com/v1',
  },
}

const environments = {
  ...defaultEnvironments,
}

const globalConfig = {
  environment: currentEnvironment,
}
const environmentConfig = environments[currentEnvironment]

export default {...globalConfig, ...environmentConfig}
