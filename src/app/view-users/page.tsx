// app/view-users/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { UserAPI } from '../../service/api'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Search, Eye } from 'lucide-react'
import { toast } from 'sonner'

interface User {
  id: number
  fullName: string
  dateOfBirth: string
  preferredLocation: string
  programmingSkills: string[]
  resumeSummary: string
}

export default function ViewUsers() {
  // State Management
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Fetch Users
  const fetchUsers = async () => {
    try {
      setLoading(true)
      const data = await UserAPI.getUsers()
      setUsers(data)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to fetch users')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  // Filter Users
  const filteredUsers = users.filter(user => 
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.preferredLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.programmingSkills.some(skill => 
      skill.toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  // Render Skills Tags
  const renderSkillTags = (skills: string[]) => (
    <div className="flex flex-wrap gap-1">
      {skills.map((skill) => (
        <span
          key={skill}
          className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
        >
          {skill}
        </span>
      ))}
    </div>
  )

  // User Details Modal
  const UserDetailsModal = () => (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
        </DialogHeader>
        {selectedUser && (
          <div className="space-y-4">
            {/* Personal Info */}
            <div>
              <h4 className="font-medium text-sm text-gray-500">Full Name</h4>
              <p>{selectedUser.fullName}</p>
            </div>
            <div>
              <h4 className="font-medium text-sm text-gray-500">Date of Birth</h4>
              <p>{new Date(selectedUser.dateOfBirth).toLocaleDateString()}</p>
            </div>
            <div>
              <h4 className="font-medium text-sm text-gray-500">Location</h4>
              <p>{selectedUser.preferredLocation}</p>
            </div>
            
            {/* Skills */}
            <div>
              <h4 className="font-medium text-sm text-gray-500">Programming Skills</h4>
              {renderSkillTags(selectedUser.programmingSkills)}
            </div>
            
            {/* Resume Summary */}
            <div>
              <h4 className="font-medium text-sm text-gray-500">Resume Summary</h4>
              <p className="text-sm">{selectedUser.resumeSummary}</p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )

  // Main Content
  const renderContent = () => {
    if (loading) {
      return <div className="text-center py-8">Loading...</div>
    }

    if (filteredUsers.length === 0) {
      return <div className="text-center py-8">No users found</div>
    }

    return (
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Full Name</TableHead>
              <TableHead>Date of Birth</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Programming Skills</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.fullName}</TableCell>
                <TableCell>
                  {new Date(user.dateOfBirth).toLocaleDateString()}
                </TableCell>
                <TableCell>{user.preferredLocation}</TableCell>
                <TableCell>{renderSkillTags(user.programmingSkills)}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedUser(user)
                      setIsModalOpen(true)
                    }}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Card>
          {/* Header */}
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl">Registered Users</CardTitle>
                <CardDescription>
                  View and manage all registered user profiles
                </CardDescription>
              </div>
              
              {/* Search and Refresh */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search users..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button onClick={fetchUsers} disabled={loading}>
                  Refresh
                </Button>
              </div>
            </div>
          </CardHeader>

          {/* Content */}
          <CardContent>
            {renderContent()}
          </CardContent>
        </Card>

        {/* Modal */}
        <UserDetailsModal />
      </div>
    </div>
  )
}