export class AppException extends Error {
  constructor(public message: string, public statusCode = 500) {
    super(message);
  }
}

export class ValidationException extends AppException {
  constructor(message: string, public details?: Record<string, any>) {
    super(message, 400);
  }
}

export class UnauthorizedException extends AppException {
  constructor(message: string = "Unauthorized") {
    super(message, 401);
  }
}

export class NotFoundException extends AppException {
  constructor(message: string = "Resource not found") {
    super(message, 404);
  }
}

export class ConflictException extends AppException {
  constructor(message: string) {
    super(message, 409);
  }
}
