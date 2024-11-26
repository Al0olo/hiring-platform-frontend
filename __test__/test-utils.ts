import { Response } from 'node-fetch'

export const createMockResponse = (data: unknown) => ({
  ok: true,
  json: async () => data
}) as Response

export const createMockErrorResponse = (status: number = 400, message: string = 'Error') => ({
  ok: false,
  status,
  statusText: message,
  json: async () => ({ message })
}) as Response

export const mockFetchResponse = (data: unknown) => {
  const mockFetch = jest.fn() as jest.Mock<Promise<Response>>
  mockFetch.mockResolvedValue(createMockResponse(data))
  return mockFetch
}

export const mockFetchError = (status: number = 400, message: string = 'Error') => {
  const mockFetch = jest.fn() as jest.Mock<Promise<Response>>
  mockFetch.mockRejectedValue(new Error(message))
  return mockFetch
}