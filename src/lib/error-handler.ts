import { ZodError } from "zod";
import { formatErrorResponse } from "./response";

// Handles different error types
export function routeErrorHandler(error: unknown) {
  if (error instanceof ZodError) {
    // Handling Zod validation errors
    const validationErrors = error.errors.map((err) => err.message).join(", ");
    return formatErrorResponse(validationErrors, 422);
  } else if (error instanceof Error) {
    // Handling generic errors
    return formatErrorResponse(error.message, 500);
  } else {
    // Handling unknown errors
    return formatErrorResponse("An unknown error occurred", 500);
  }
}
