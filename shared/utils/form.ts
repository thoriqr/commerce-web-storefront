import { FetchError } from "../types/api-error";

import { Path, UseFormReturn } from "react-hook-form";

export function handleFormError<T extends object>(err: unknown, form: UseFormReturn<T>) {
  if (err instanceof FetchError) {
    if (err.fields?.length) {
      const values = form.getValues();

      err.fields.forEach((f) => {
        if (f.field in values) {
          form.setError(f.field as Path<T>, {
            message: f.message
          });
        }
      });
      return;
    }

    form.setError("root", {
      message: err.message
    });
    return;
  }

  form.setError("root", {
    message: "Something went wrong"
  });
}
