export type ApiFieldError = {
  field: string;
  message: string;
};

export type ApiErrorResponse = {
  code?: string;
  message: string;
  errors?: ApiFieldError[];
};

export class FetchError extends Error {
  status: number;
  code?: string;
  fields?: ApiFieldError[];

  constructor(
    message: string,
    status: number,
    options?: {
      code?: string;
      fields?: ApiFieldError[];
    }
  ) {
    super(message);
    this.name = "FetchError";
    this.status = status;
    this.code = options?.code;
    this.fields = options?.fields;
  }
}
