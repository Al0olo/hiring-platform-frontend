import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import ViewUsers from '@/app/view-users/page'

interface User {
  id: number
  fullName: string
  dateOfBirth: string
  preferredLocation: string
  programmingSkills: string[]
  resumeSummary: string
}

const mockUsers: User[] = [
  {
    id: 1,
    fullName: 'John Doe',
    dateOfBirth: '1990-01-01',
    preferredLocation: 'Sydney',
    programmingSkills: ['React', 'TypeScript'],
    resumeSummary: 'Experienced developer'
  },
  {
    id: 2,
    fullName: 'Jane Smith',
    dateOfBirth: '1995-05-05',
    preferredLocation: 'Melbourne',
    programmingSkills: ['Angular', 'Java'],
    resumeSummary: 'Senior engineer'
  }
]

// Mock fetch using type assertion
const mockFetch = jest.fn() as jest.Mock<Promise<Response>>
global.fetch = mockFetch

describe('ViewUsers Page', () => {
  beforeEach(() => {
    mockFetch.mockClear()
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => mockUsers
    } as Response)
  })

  it('renders the users table with headers', async () => {
    render(<ViewUsers />)
    
    expect(screen.getByText('Registered Users')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Search users...')).toBeInTheDocument()
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument()
    })
  })

  it('filters users based on search term', async () => {
    render(<ViewUsers />)
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument()
    })

    const searchInput = screen.getByPlaceholderText('Search users...')
    await act(async () => {
      fireEvent.change(searchInput, { target: { value: 'John' } })
    })

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument()
  })

  it('shows error state when fetch fails', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Failed to fetch'))
    
    render(<ViewUsers />)
    
    await waitFor(() => {
      expect(screen.getByText('Failed to fetch')).toBeInTheDocument()
    })
  })
})