'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { UserAPI } from '../../service/api'
import { toast } from 'sonner'
// import { Checkbox } from '@/components/ui/checkbox' // Make sure you have this component

// Available programming skills
const PROGRAMMING_SKILLS = [
  'React',
  'Angular',
  'C#',
  'Java',
  'Ruby',
  'Python'
] as const

const userSchema = z.object({
  fullName: z.string().min(1, 'Full name is required').max(50, 'Name must be less than 50 characters'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  preferredLocation: z.string().min(1, 'Preferred location is required'),
  programmingSkills: z.array(z.string())
    .refine((value) => value.length >= 1, {
      message: 'Select at least one programming skill',
    }),
  resumeSummary: z.string()
    .min(1, 'Resume summary is required')
    .max(250, 'Resume summary must be less than 250 characters')
})

type FormData = z.infer<typeof userSchema>

export default function NewUser() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<FormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      programmingSkills: [], // Initialize as empty array
      fullName: '',
      dateOfBirth: '',
      preferredLocation: '',
      resumeSummary: ''
    }
  })

  // Watch programming skills for real-time validation feedback
  const selectedSkills = watch('programmingSkills')

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true)
      await UserAPI.createUser(data)
      toast.success('User created successfully')
      router.push('/view-users')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to create user')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Card className="bg-white shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">New User Registration</CardTitle>
            <CardDescription className="text-center">
              Please fill in your information below to register
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <Input
                  {...register('fullName')}
                  className="w-full"
                  maxLength={50}
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
                )}
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth
                </label>
                <Input
                  type="date"
                  {...register('dateOfBirth')}
                  className="w-full"
                />
                {errors.dateOfBirth && (
                  <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth.message}</p>
                )}
              </div>

              {/* Preferred Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Location
                </label>
                <select 
                  {...register('preferredLocation')}
                  className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Location</option>
                  <option value="Sydney">Sydney</option>
                  <option value="Melbourne">Melbourne</option>
                  <option value="Brisbane">Brisbane</option>
                  <option value="Adelaide">Adelaide</option>
                  <option value="Perth">Perth</option>
                </select>
                {errors.preferredLocation && (
                  <p className="text-red-500 text-sm mt-1">{errors.preferredLocation.message}</p>
                )}
              </div>

              {/* Programming Skills */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Programming Skills
                  <span className="text-sm text-gray-500 ml-1">
                    (Select at least one)
                  </span>
                </label>
                <div className="grid grid-cols-2 gap-4 p-4 border rounded-md bg-gray-50">
                  <Controller
                    name="programmingSkills"
                    control={control}
                    render={({ field }) => (
                      <>
                        {PROGRAMMING_SKILLS.map((skill) => (
                          <label key={skill} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              value={skill}
                              checked={field.value.includes(skill)}
                              onChange={(e) => {
                                const updatedSkills = e.target.checked
                                  ? [...field.value, skill]
                                  : field.value.filter((s: string) => s !== skill);
                                field.onChange(updatedSkills);
                              }}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span>{skill}</span>
                          </label>
                        ))}
                      </>
                    )}
                  />
                </div>
                {errors.programmingSkills && (
                  <p className="text-red-500 text-sm mt-1">{errors.programmingSkills.message}</p>
                )}
                <p className="text-sm text-gray-500 mt-1">
                  Selected skills: {selectedSkills.length}
                </p>
              </div>

              {/* Resume Summary */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Resume Summary
                </label>
                <textarea
                  {...register('resumeSummary')}
                  className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  maxLength={250}
                  placeholder="Brief summary of your work experience"
                />
                {errors.resumeSummary && (
                  <p className="text-red-500 text-sm mt-1">{errors.resumeSummary.message}</p>
                )}
                <p className="text-sm text-gray-500 mt-1">
                  {watch('resumeSummary')?.length || 0}/250 characters
                </p>
              </div>

              {/* Form Actions */}
              <CardFooter className="flex justify-end gap-4 px-0">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => router.push('/')}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}