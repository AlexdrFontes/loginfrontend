import superagent from 'superagent'
import Cookies from 'universal-cookie'
import Config from '../config'

const cookies = new Cookies()

const methods = ['get', 'post', 'put', 'patch', 'delete']

const formatUrl = (path) => (
  path.search(/^https?:\/\/(.*)/) === -1 ?
    { url: `${Config.API_BASE_URL}/${path}`, external: false }
    :
    { url: path, external: true }
)

export default class client {
  constructor(req) {
    methods.forEach(method => {
      this[method] = (path, { params, data, headers, files, fields, type } = {}) => new Promise((resolve, reject) => {
        const urlData = formatUrl(path)

        const request = superagent[method](urlData.url);


        if (params) {
          request.query(params);
        }

        if (headers) {
          request.set(headers);
        }

        if (cookies && cookies.get('AuthToken') && !urlData.external) {
          request.set('Authorization', `Bearer ${cookies.get('AuthToken')}`);
        }

        if (files) {
          files.forEach(file => request.attach("images", file.file, file.name));
        }

        if (fields) {
          fields.forEach(item => request.field(item.key, item.value));
        }

        if (data) {
          request.send(data);
        }
        request.end((err, { body } = {}) => (err ? reject(body || err) : resolve(body)));
      });
    }
  )};
}
