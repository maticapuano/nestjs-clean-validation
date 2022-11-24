import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  public catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    const error = exception.getResponse() as Record<string, string>;

    response.status(status).json({
      status: error.statusCode,
      error: error.error,
      errors: Array.isArray(error.message) ? error.message : error.message,
    });
  }
}
