"use client";

import { UseFormReturn } from 'react-hook-form';
import { FormData } from '@/lib/types';
import {
  FormField,
  FormItem,
  FormControl,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { mockManagers } from '@/lib/mock-data';

interface ReviewStepProps {
  form: UseFormReturn<FormData>;
}

export function ReviewStep({ form }: ReviewStepProps) {
  const formData = form.getValues();
  const selectedManager = mockManagers.find(m => m.id === formData.manager);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Review & Submit</h2>
        <p className="text-gray-600 mt-2">Please review all information before submitting</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Full Name</p>
                <p className="font-medium">{formData.fullName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{formData.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium">{formData.phoneNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Date of Birth</p>
                <p className="font-medium">
                  {formData.dateOfBirth && format(formData.dateOfBirth, "PPP")}
                </p>
              </div>
            </div>
            {formData.profilePicture && (
              <div>
                <p className="text-sm text-gray-600">Profile Picture</p>
                <p className="font-medium">{formData.profilePicture.name}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Job Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Department</p>
                <p className="font-medium">{formData.department}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Position</p>
                <p className="font-medium">{formData.positionTitle}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Start Date</p>
                <p className="font-medium">
                  {formData.startDate && format(formData.startDate, "PPP")}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Job Type</p>
                <p className="font-medium">{formData.jobType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  {formData.jobType === 'Contract' ? 'Hourly Rate' : 'Annual Salary'}
                </p>
                <p className="font-medium">
                  ${formData.salaryExpectation?.toLocaleString()}
                  {formData.jobType === 'Contract' ? '/hour' : '/year'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Manager</p>
                <p className="font-medium">{selectedManager?.name}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Skills & Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-2">Primary Skills</p>
              <div className="flex flex-wrap gap-2">
                {formData.primarySkills?.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill} ({formData.skillExperience?.[skill]} years)
                  </Badge>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Working Hours</p>
                <p className="font-medium">
                  {formData.workingHoursStart} - {formData.workingHoursEnd}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Remote Work Preference</p>
                <p className="font-medium">{formData.remoteWorkPreference}%</p>
              </div>
            </div>
            {formData.managerApproved && (
              <div>
                <p className="text-sm text-green-600">✓ Manager approved for remote work</p>
              </div>
            )}
            {formData.extraNotes && (
              <div>
                <p className="text-sm text-gray-600">Extra Notes</p>
                <p className="font-medium">{formData.extraNotes}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Emergency Contact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Contact Name</p>
                <p className="font-medium">{formData.emergencyContactName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Relationship</p>
                <p className="font-medium">{formData.emergencyContactRelationship}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone Number</p>
                <p className="font-medium">{formData.emergencyContactPhone}</p>
              </div>
            </div>
            {formData.guardianContactName && (
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm text-gray-600 mb-2">Guardian Contact</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Guardian Name</p>
                    <p className="font-medium">{formData.guardianContactName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Guardian Phone</p>
                    <p className="font-medium">{formData.guardianContactPhone}</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <FormField
          control={form.control}
          name="confirmationChecked"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <p className="font-medium">
                  I confirm that all information provided is accurate and complete *
                </p>
                <p className="text-sm text-gray-600">
                  By checking this box, you acknowledge that you have reviewed all information
                  and that it is correct to the best of your knowledge.
                </p>
              </div>
            </FormItem>
          )}
        />
        {form.formState.errors.confirmationChecked && (
          <p className="text-sm text-red-600 mt-2">
            {form.formState.errors.confirmationChecked.message}
          </p>
        )}
      </div>
    </div>
  );
}