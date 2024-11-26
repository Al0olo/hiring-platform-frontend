import '@testing-library/jest-dom'
import 'whatwg-fetch'
import { TextEncoder, TextDecoder } from 'util'

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/',
}))

beforeEach(() => {
  jest.clearAllMocks()
})

afterEach(() => {
  jest.resetAllMocks()
})