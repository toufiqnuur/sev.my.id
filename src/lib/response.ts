import { NextResponse } from "next/server";

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
};

// Helper function for successful responses
export function formatResponse<T>(
  data: T,
  message = "Operation completed successfully",
  status = 200,
) {
  return NextResponse.json<ApiResponse<T>>(
    {
      success: true,
      message,
      data: JSON.parse(
        JSON.stringify(data, (_, value) =>
          typeof value === "bigint" ? value.toString() : value,
        ),
      ),
    },
    { status },
  );
}

// Helper function for error responses
export function formatErrorResponse(
  message = "An error occurred",
  status = 500,
) {
  return NextResponse.json<ApiResponse<null>>(
    {
      success: false,
      message,
      data: null,
    },
    { status },
  );
}
