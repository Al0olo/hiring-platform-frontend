import '@testing-library/jest-dom'

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R
      toHaveStyle(style: Record<string, unknown>): R
    }
  }
}

declare module '*.module.css' {
  const classes: { [key: string]: string }
  export default classes
}