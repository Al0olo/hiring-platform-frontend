import { render, screen, fireEvent, waitFor } from 'testing-library/react'
import { act } from 'react-dom/test-utils'
import NewUser from '@/app/new-user/page'

const mockFetch = jest.fn() as jest.Mock<Promise<Response>>

describe('NewUser Page', () => {
  beforeEach(() => {
    global.fetch = mockFetch
    mockFetch.mockClear()
  })

  it('submits form with valid data', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true })
    } as Response)

    render(<NewUser />)

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/full name/i), {
        target: { value: 'Test User' }
      })
      fireEvent.change(screen.getByLabelText(/date of birth/i), {
        target: { value: '1990-01-01' }
      })
      fireEvent.change(screen.getByLabelText(/preferred location/i), {
        target: { value: 'Sydney' }
      })
      fireEvent.click(screen.getByLabelText(/react/i))
      fireEvent.change(screen.getByLabelText(/resume summary/i), {
        target: { value: 'Test summary' }
      })

      fireEvent.click(screen.getByRole('button', { name: /submit/i }))
    })

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: 'Test User',
          dateOfBirth: '1990-01-01',
          preferredLocation: 'Sydney',
          programmingSkills: ['React'],
          resumeSummary: 'Test summary'
        })
      })
    })
  })
})