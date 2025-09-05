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
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface PersonalInfoStepProps {
  form: UseFormReturn<FormData>;
  trackFieldFocus: (fieldName: string) => void;
  trackFieldBlur: (fieldName: string) => void;
}

export function PersonalInfoStep({ form, trackFieldFocus, trackFieldBlur }: PersonalInfoStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
        <p className="text-gray-600 mt-2">Let's start with your basic information</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Full Name *</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your full name"
                  {...field}
                  onFocus={() => trackFieldFocus('fullName')}
                  onBlur={(e) => {
                    trackFieldBlur('fullName');
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address *</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  {...field}
                  onFocus={() => trackFieldFocus('email')}
                  onBlur={(e) => {
                    trackFieldBlur('email');
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
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number *</FormLabel>
              <FormControl>
                <Input
                  placeholder="+1-123-456-7890"
                  {...field}
                  onFocus={() => trackFieldFocus('phoneNumber')}
                  onBlur={(e) => {
                    trackFieldBlur('phoneNumber');
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
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Birth *</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full h-12 pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="profilePicture"
          render={({ field: { value, onChange, ...field } }) => (
            <FormItem>
              <FormLabel>Profile Picture (Optional)</FormLabel>
              <FormControl>
                <div className="flex items-center space-x-4">
                  <Input
                    type="file"
                    accept="image/jpeg,image/png"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      onChange(file);
                    }}
                    className="h-12"
                    {...field}
                  />
                  <Upload className="h-5 w-5 text-gray-400" />
                </div>
              </FormControl>
              <FormMessage />
              <p className="text-sm text-gray-500">JPG or PNG, max 2MB</p>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}