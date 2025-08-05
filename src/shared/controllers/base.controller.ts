import { plainToInstance } from "class-transformer";
import { IApiResponse, IPaginatedResponse } from "../types/api.types";
import { validate } from "class-validator";
import { ValidationException } from "../exceptions/app.exceptions";
import { Controller } from "tsoa";

export abstract class BaseController extends Controller {
  protected success<T>(data: T, message?: string): IApiResponse<T> {
    const response: IApiResponse<T> = {
      success: true,
      data,
    };

    if (message !== undefined) {
      response.message = message;
    }

    return response;
  }

  protected error(message?: string): IApiResponse<any> {
    const response: IApiResponse<any> = {
      success: false,
    };

    if (message !== undefined) {
      response.message = message;
    }

    return response;
  }

  protected paginate<T>(
    data: T[],
    total: number,
    limit: number,
    page: number
  ): IPaginatedResponse<T> {
    return {
      success: true,
      data,
      pagination: {
        total,
        limit,
        page,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  protected async validateDto<T extends Object>(
    dtoClass: new () => T,
    body: any
  ): Promise<T> {
    const dto = plainToInstance(dtoClass, body);
    const errors = await validate(dto, { whitelist: true });

    if (errors.length) {
      const errorsObject: Record<string, any> = {};
      for (const err of errors) {
        if (err.constraints) {
          errorsObject[err.property] = Object.values(err.constraints);
        }
      }
      throw new ValidationException("Validation error", errorsObject);
    }

    return dto;
  }
}
