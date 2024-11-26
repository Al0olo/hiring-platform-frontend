import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto pt-20 px-4">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">
          Welcome to CW Careers
        </h1>
        <p className="text-xl text-center text-gray-600 mb-12">
          Join our team and be part of something great
        </p>
        
        <div className="flex justify-center gap-4">
          <Link href="/new-user">
            <Button className="bg-blue-600 hover:bg-blue-700">
              New User
            </Button>
          </Link>
          <Link href="/view-users">
            <Button className="bg-gray-600 hover:bg-gray-700">
              View Users
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}