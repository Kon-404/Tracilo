/**
 * API Error Utilities
 *
 * Provides consistent error handling and responses across all API routes.
 */

import { NextResponse } from 'next/server';

export interface APIError {
  error: string;
  message?: string;
  details?: any;
  statusCode: number;
}

/**
 * Standard error responses with consistent structure
 */
export class APIErrorResponse {
  /**
   * 400 Bad Request
   */
  static badRequest(message: string, details?: any) {
    return NextResponse.json(
      {
        error: 'Bad Request',
        message,
        details,
      } as APIError,
      { status: 400 }
    );
  }

  /**
   * 401 Unauthorized
   */
  static unauthorized(message: string = 'Unauthorized. Please sign in.') {
    return NextResponse.json(
      {
        error: 'Unauthorized',
        message,
      } as APIError,
      { status: 401 }
    );
  }

  /**
   * 403 Forbidden
   */
  static forbidden(message: string = 'You do not have permission to access this resource.') {
    return NextResponse.json(
      {
        error: 'Forbidden',
        message,
      } as APIError,
      { status: 403 }
    );
  }

  /**
   * 404 Not Found
   */
  static notFound(resource: string = 'Resource') {
    return NextResponse.json(
      {
        error: 'Not Found',
        message: `${resource} not found`,
      } as APIError,
      { status: 404 }
    );
  }

  /**
   * 409 Conflict
   */
  static conflict(message: string, details?: any) {
    return NextResponse.json(
      {
        error: 'Conflict',
        message,
        details,
      } as APIError,
      { status: 409 }
    );
  }

  /**
   * 422 Unprocessable Entity (Validation Error)
   */
  static validationError(message: string, details?: any) {
    return NextResponse.json(
      {
        error: 'Validation Error',
        message,
        details,
      } as APIError,
      { status: 422 }
    );
  }

  /**
   * 500 Internal Server Error
   */
  static internalError(message: string = 'An unexpected error occurred. Please try again later.', details?: any) {
    // Log the error details for debugging (in production, send to error tracking service)
    if (process.env.NODE_ENV === 'development') {
      console.error('API Error:', message, details);
    }

    return NextResponse.json(
      {
        error: 'Internal Server Error',
        message,
        // Only include details in development
        ...(process.env.NODE_ENV === 'development' && details ? { details } : {}),
      } as APIError,
      { status: 500 }
    );
  }

  /**
   * 503 Service Unavailable
   */
  static serviceUnavailable(message: string = 'Service temporarily unavailable. Please try again later.') {
    return NextResponse.json(
      {
        error: 'Service Unavailable',
        message,
      } as APIError,
      { status: 503 }
    );
  }
}

/**
 * Handle async API route with error catching
 *
 * Wraps API route handlers to catch and handle errors consistently
 */
export function withErrorHandling<T extends any[], R>(
  handler: (...args: T) => Promise<R>
): (...args: T) => Promise<R | NextResponse> {
  return async (...args: T) => {
    try {
      return await handler(...args);
    } catch (error) {
      console.error('Unhandled API error:', error);

      if (error instanceof Error) {
        return APIErrorResponse.internalError(error.message, {
          stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
        });
      }

      return APIErrorResponse.internalError();
    }
  };
}
