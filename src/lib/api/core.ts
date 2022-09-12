import { z } from "zod";

/**
 * A generic error that can be thrown when an API code was not
 * expected from a particular action and the client is unsure
 * what to do.
 *
 * This generally is the result of the client not being compliant
 * with the API schema. Throwing this error does not mean that the
 * code may not be recognised by a different action.
 */
export class ApiCodeError extends Error {
  constructor(public code: string, message = "Unexpected API code: " + code) {
    super(message);
  }
}

/** The type validation schema for a `User`. */
export const userSchema = z.object({
  uid: z.string(),
  email: z.string(),
  username: z.union([z.string(), z.null()]),
  first_name: z.union([z.string(), z.null()]),
  last_name: z.union([z.string(), z.null()]),
  unit: z.union([z.string(), z.null()]),
});

/** The generated type of a `User` schema. */
export type User = z.infer<typeof userSchema>;
