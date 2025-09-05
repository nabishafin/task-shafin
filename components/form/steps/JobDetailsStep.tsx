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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { mockManagers } from '@/lib/mock-data';
import { useMemo } from 'react';

interface JobDetailsStepProps {
  form: UseFormReturn<FormData>;
  trackFieldFocus: (fieldName: string) => void;
  trackFieldBlur: (fieldName: string) => void;
}

export function JobDetailsStep({ form, trackFieldFocus, trackFieldBlur }: JobDetailsStepProps) {
  const watchedDepartment = form.watch('department');
  const watchedJobType = form.watch('jobType');

  const filteredManagers = useMemo(() => {
    return mockManagers.filter(manager => manager.department === watchedDepartment);
  }, [watchedDepartment]);

  const getSalaryLabel = () => {
    switch (watchedJobType) {
      case 'Contract':
        return 'Hourly Rate ($50 - $150) *';
      case 'Full-time':
        return 'Annual Salary ($30,000 - $200,000) *';
      case 'Part-time':
        return 'Annual Salary ($30,000 - $200,000) *';
      default:
        return 'Salary Expectation *';
    }
  };

  const getSalaryPlaceholder = () => {
    switch (watchedJobType) {
      case 'Contract':
        return 'Enter hourly rate';
      default:
        return 'Enter annual salary';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Job Details</h2>
        <p className="text-gray-600 mt-2">Tell us about your role</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="department"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Department *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Sales">Sales</SelectItem>
                  <SelectItem value="HR">HR</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="positionTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position Title *</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter position title"
                  {...field}
                  onFocus={() => trackFieldFocus('positionTitle')}
                  onBlur={(e) => {
                    trackFieldBlur('positionTitle');
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
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date *</FormLabel>
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
                        <span>Pick a start date</span>
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
                    disabled={(date) => {
                      const today = new Date();
                      const ninetyDaysFromNow = new Date(today.getTime() + (90 * 24 * 60 * 60 * 1000));
                      return date < today || date > ninetyDaysFromNow;
                    }}
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
          name="jobType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Type *</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Full-time" id="fulltime" />
                    <Label htmlFor="fulltime">Full-time</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Part-time" id="parttime" />
                    <Label htmlFor="parttime">Part-time</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Contract" id="contract" />
                    <Label htmlFor="contract">Contract</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="salaryExpectation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{getSalaryLabel()}</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder={getSalaryPlaceholder()}
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  onFocus={() => trackFieldFocus('salaryExpectation')}
                  onBlur={(e) => {
                    trackFieldBlur('salaryExpectation');
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
          name="manager"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Manager *</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
                disabled={!watchedDepartment}
              >
                <FormControl>
                  <SelectTrigger className="h-12">
                    <SelectValue 
                      placeholder={
                        !watchedDepartment 
                          ? "Select department first" 
                          : "Select manager"
                      } 
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {filteredManagers.map((manager) => (
                    <SelectItem key={manager.id} value={manager.id}>
                      {manager.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}