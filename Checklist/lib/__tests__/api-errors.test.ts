import { describe, it, expect, vi } from 'vitest';
import { APIErrorResponse, withErrorHandling } from '../api-errors';

describe('APIErrorResponse', () => {
  describe('badRequest', () => {
    it('returns 400 status with error message', async () => {
      const response = APIErrorResponse.badRequest('Invalid input');
      const json = await response.json();

      expect(response.status).toBe(400);
      expect(json.error).toBe('Bad Request');
      expect(json.message).toBe('Invalid input');
    });

    it('includes details when provided', async () => {
      const details = { field: 'email', issue: 'invalid format' };
      const response = APIErrorResponse.badRequest('Invalid input', details);
      const json = await response.json();

      expect(json.details).toEqual(details);
    });
  });

  describe('unauthorized', () => {
    it('returns 401 status with default message', async () => {
      const response = APIErrorResponse.unauthorized();
      const json = await response.json();

      expect(response.status).toBe(401);
      expect(json.error).toBe('Unauthorized');
      expect(json.message).toBe('Unauthorized. Please sign in.');
    });

    it('accepts custom message', async () => {
      const response = APIErrorResponse.unauthorized('Invalid token');
      const json = await response.json();

      expect(json.message).toBe('Invalid token');
    });
  });

  describe('forbidden', () => {
    it('returns 403 status with default message', async () => {
      const response = APIErrorResponse.forbidden();
      const json = await response.json();

      expect(response.status).toBe(403);
      expect(json.error).toBe('Forbidden');
      expect(json.message).toBe('You do not have permission to access this resource.');
    });
  });

  describe('notFound', () => {
    it('returns 404 status with resource name', async () => {
      const response = APIErrorResponse.notFound('Template');
      const json = await response.json();

      expect(response.status).toBe(404);
      expect(json.error).toBe('Not Found');
      expect(json.message).toBe('Template not found');
    });

    it('uses default resource name', async () => {
      const response = APIErrorResponse.notFound();
      const json = await response.json();

      expect(json.message).toBe('Resource not found');
    });
  });

  describe('conflict', () => {
    it('returns 409 status with conflict message', async () => {
      const response = APIErrorResponse.conflict('Email already exists');
      const json = await response.json();

      expect(response.status).toBe(409);
      expect(json.error).toBe('Conflict');
      expect(json.message).toBe('Email already exists');
    });
  });

  describe('validationError', () => {
    it('returns 422 status with validation message', async () => {
      const details = { email: 'Invalid email format' };
      const response = APIErrorResponse.validationError('Validation failed', details);
      const json = await response.json();

      expect(response.status).toBe(422);
      expect(json.error).toBe('Validation Error');
      expect(json.message).toBe('Validation failed');
      expect(json.details).toEqual(details);
    });
  });

  describe('internalError', () => {
    it('returns 500 status with default message', async () => {
      const response = APIErrorResponse.internalError();
      const json = await response.json();

      expect(response.status).toBe(500);
      expect(json.error).toBe('Internal Server Error');
      expect(json.message).toBe('An unexpected error occurred. Please try again later.');
    });

    it('includes details in development mode', async () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';

      const details = { stack: 'error stack trace' };
      const response = APIErrorResponse.internalError('Something went wrong', details);
      const json = await response.json();

      expect(json.details).toEqual(details);

      process.env.NODE_ENV = originalEnv;
    });
  });

  describe('serviceUnavailable', () => {
    it('returns 503 status', async () => {
      const response = APIErrorResponse.serviceUnavailable();
      const json = await response.json();

      expect(response.status).toBe(503);
      expect(json.error).toBe('Service Unavailable');
    });
  });
});

describe('withErrorHandling', () => {
  it('returns handler result when successful', async () => {
    const handler = vi.fn().mockResolvedValue('success');
    const wrappedHandler = withErrorHandling(handler);

    const result = await wrappedHandler('arg1', 'arg2');

    expect(handler).toHaveBeenCalledWith('arg1', 'arg2');
    expect(result).toBe('success');
  });

  it('catches errors and returns internal error response', async () => {
    const error = new Error('Test error');
    const handler = vi.fn().mockRejectedValue(error);
    const wrappedHandler = withErrorHandling(handler);

    const result = await wrappedHandler();

    expect(result).toBeDefined();
    const json = await (result as Response).json();
    expect(json.error).toBe('Internal Server Error');
    expect(json.message).toBe('Test error');
  });

  it('handles non-Error throws', async () => {
    const handler = vi.fn().mockRejectedValue('string error');
    const wrappedHandler = withErrorHandling(handler);

    const result = await wrappedHandler();

    const json = await (result as Response).json();
    expect(json.error).toBe('Internal Server Error');
  });
});
