import { ValidationError } from 'class-validator';

export interface CustomValidationError extends ValidationError {
  field: string;
}
