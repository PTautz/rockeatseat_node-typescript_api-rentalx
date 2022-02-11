class CustomError extends Error {
  public readonly statusCode: number;
  constructor(status: number, message?: string) {
    super(message);
    this.statusCode = status;
    this.name = 'CustomError';
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
  }
}

export { CustomError };
