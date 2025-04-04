class HttpException extends Error {
  constructor(status, message, path) {
    super(message, path);
    this.status = status;
    this.message = message;
    this.path = path;
  }
}

module.exports = HttpException;