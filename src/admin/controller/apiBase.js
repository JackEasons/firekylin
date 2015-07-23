import {ERROR} from '../constants'

export default class extends think.controller.rest {

  init(http) {
    super.init(http);
    http.action = http.method.toLowerCase();
  }
  /**
   * check user is login
   * @return {Promise} []
   */
  async __before(){
    let action = this.http.action;

    if (!['index'].includes(action)) {
      //await this.checkPermission();
    }

    this.assign('base.js')
  }

  async checkPermission() {
    let session = await this.session('userInfo');
    if (think.isEmpty(session)) {
      throw this.error(ERROR.UNAUTHORIZED)
    }
  }

  success(data = '', ext = {}) {
    return this.json({data: data, ...ext})
  }

  fail(statusCode = 400, message = 'Bad Request') {
    if (isNaN(statusCode)) {
      message = statusCode;
      statusCode = 400;
    }
    this.status(statusCode);
    return this.json({error: message})
  }

  error(error) {
    return this.fail(...error);
  }

  /**
   * call
   * @return {Promise} []
   */
  __call(){
    return this.error(ERROR.NOT_IMPLEMENTED);
  }

}