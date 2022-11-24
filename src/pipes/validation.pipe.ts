import { ValidationError, ValidationPipe as NestValidationPipe } from '@nestjs/common';
import { CustomValidationError } from '../interfaces/custom-validation-error.interface';
import { iterate } from 'iterare';

export class ValidationPipe extends NestValidationPipe {
  public flattenValidationErrors(errors: ValidationError[]): string[] {
    return iterate(errors)
      .map((error) => this.mapChildrenToValidationErrors(error))
      .flatten()
      .filter((item) => !!item.constraints)
      .map((item) => ({
        errors: Object.values(item.constraints || {}),
        field: (item as CustomValidationError).field || item.property,
      }))
      .filter((errors) => errors.errors.length > 0)
      .flatten()
      .toArray() as unknown as string[];
  }

  public prependConstraintsWithParentProp(
    parentPath: string,
    error: ValidationError,
  ): CustomValidationError {
    return {
      field: `${parentPath}.${error.property}`,
      ...super.prependConstraintsWithParentProp(parentPath, error),
    };
  }
}
