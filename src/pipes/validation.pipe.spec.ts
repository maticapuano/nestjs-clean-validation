import { ValidationPipe } from './validation.pipe';

describe('ValidationPipe', () => {
  it('should be defined', () => {
    expect(new ValidationPipe()).toBeDefined();
  });

  it('should return an array of strings', () => {
    const validationPipe = new ValidationPipe();
    const errors = [
      {
        children: [],
        constraints: {
          isNotEmpty: 'name should not be empty',
          isString: 'name must be a string',
        },
        contexts: {},
        property: 'name',
        target: {},
      },
    ];

    const result = validationPipe.flattenValidationErrors(errors);

    expect(result).toEqual([
      {
        field: 'name',
        errors: ['name should not be empty', 'name must be a string'],
      },
    ]);
  });

  it('should return an array of strings with a nested property', () => {
    const validationPipe = new ValidationPipe();
    const errors = [
      {
        children: [
          {
            children: [],
            constraints: {
              isNotEmpty: 'name should not be empty',
              isString: 'name must be a string',
            },
            contexts: {},
            property: 'name',
            target: {},
          },
        ],
        constraints: {},
        contexts: {},
        property: 'address',
        target: {},
      },
    ];

    const result = validationPipe.flattenValidationErrors(errors);

    expect(result).toEqual([
      {
        field: 'address.name',
        errors: ['address.name should not be empty', 'address.name must be a string'],
      },
    ]);
  });

  it('should return an array of strings with a nested property and multiple errors', () => {
    const validationPipe = new ValidationPipe();
    const errors = [
      {
        children: [
          {
            children: [],
            constraints: {
              isNotEmpty: 'name should not be empty',
              isString: 'name must be a string',
            },
            contexts: {},
            property: 'name',
            target: {},
          },
          {
            children: [],
            constraints: {
              isNotEmpty: 'city should not be empty',
              isString: 'city must be a string',
            },
            contexts: {},
            property: 'city',
            target: {},
          },
        ],
        constraints: {},
        contexts: {},
        property: 'address',
        target: {},
      },
    ];

    const result = validationPipe.flattenValidationErrors(errors);

    expect(result).toEqual([
      {
        field: 'address.name',
        errors: ['address.name should not be empty', 'address.name must be a string'],
      },
      {
        field: 'address.city',
        errors: ['address.city should not be empty', 'address.city must be a string'],
      },
    ]);
  });

  it('should return an array of strings with a nested property and multiple errors and multiple children', () => {
    const validationPipe = new ValidationPipe();
    const errors = [
      {
        children: [
          {
            children: [],
            constraints: {
              isNotEmpty: 'name should not be empty',
              isString: 'name must be a string',
            },
            contexts: {},
            property: 'name',
            target: {},
          },
          {
            children: [],
            constraints: {
              isNotEmpty: 'city should not be empty',
              isString: 'city must be a string',
            },
            contexts: {},
            property: 'city',
            target: {},
          },
        ],
        constraints: {},
        contexts: {},
        property: 'address',
        target: {},
      },
      {
        children: [
          {
            children: [],
            constraints: {
              isNotEmpty: 'name should not be empty',
              isString: 'name must be a string',
            },
            contexts: {},
            property: 'name',
            target: {},
          },
          {
            children: [],
            constraints: {
              isNotEmpty: 'city should not be empty',
              isString: 'city must be a string',
            },
            contexts: {},
            property: 'city',
            target: {},
          },
        ],
        constraints: {},
        contexts: {},
        property: 'address',
        target: {},
      },
    ];

    const result = validationPipe.flattenValidationErrors(errors);

    expect(result).toEqual([
      {
        field: 'address.name',
        errors: ['address.name should not be empty', 'address.name must be a string'],
      },
      {
        field: 'address.city',
        errors: ['address.city should not be empty', 'address.city must be a string'],
      },
      {
        field: 'address.name',
        errors: ['address.name should not be empty', 'address.name must be a string'],
      },
      {
        field: 'address.city',
        errors: ['address.city should not be empty', 'address.city must be a string'],
      },
    ]);
  });

  it('should return empty array if there no errors', () => {
    const validationPipe = new ValidationPipe();

    const result = validationPipe.flattenValidationErrors([]);

    expect(result).toEqual([]);
  });
});
