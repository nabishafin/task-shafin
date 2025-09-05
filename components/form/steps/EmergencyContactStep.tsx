"use client";

import { UseFormReturn } from 'react-hook-form';
import { FormData } from '@/lib/types';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { relationshipOptions } from '@/lib/mock-data';

interface EmergencyContactStepProps {
  form: UseFormReturn<FormData>;
  isUnder21: boolean;
  trackFieldFocus: (fieldName: string) => void;
  trackFieldBlur: (fieldName: string) => void;
}

export function EmergencyContactStep({ form, isUnder21, trackFieldFocus, trackFieldBlur }: EmergencyContactStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Emergency Contact</h2>
        <p className="text-gray-600 mt-2">Provide emergency contact information</p>
      </div>

      <div className="space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Emergency Contact</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="emergencyContactName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Name *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter contact name"
                      {...field}
                      onFocus={() => trackFieldFocus('emergencyContactName')}
                      onBlur={(e) => {
                        trackFieldBlur('emergencyContactName');
                        field.onBlur();
                      }}
                      className="h-12"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="emergencyContactRelationship"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Relationship *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select relationship" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {relationshipOptions.map((relationship) => (
                        <SelectItem key={relationship} value={relationship}>
                          {relationship}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="emergencyContactPhone"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Phone Number *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="+1-123-456-7890"
                      {...field}
                      onFocus={() => trackFieldFocus('emergencyContactPhone')}
                      onBlur={(e) => {
                        trackFieldBlur('emergencyContactPhone');
                        field.onBlur();
                      }}
                      className="h-12"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {isUnder21 && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-orange-900 mb-4">Guardian Contact</h3>
            <p className="text-orange-700 text-sm mb-4">
              Since you are under 21, we need guardian contact information.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="guardianContactName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Guardian Name *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter guardian name"
                        {...field}
                        onFocus={() => trackFieldFocus('guardianContactName')}
                        onBlur={(e) => {
                          trackFieldBlur('guardianContactName');
                          field.onBlur();
                        }}
                        className="h-12"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="guardianContactPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Guardian Phone *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="+1-123-456-7890"
                        {...field}
                        onFocus={() => trackFieldFocus('guardianContactPhone')}
                        onBlur={(e) => {
                          trackFieldBlur('guardianContactPhone');
                          field.onBlur();
                        }}
                        className="h-12"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}