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
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { skillsByDepartment } from '@/lib/mock-data';
import { useMemo } from 'react';

interface SkillsStepProps {
  form: UseFormReturn<FormData>;
  trackFieldFocus: (fieldName: string) => void;
  trackFieldBlur: (fieldName: string) => void;
}

export function SkillsStep({ form, trackFieldFocus, trackFieldBlur }: SkillsStepProps) {
  const watchedDepartment = form.watch('department');
  const watchedSkills = form.watch('primarySkills') || [];
  const watchedRemotePreference = form.watch('remoteWorkPreference');

  const availableSkills = useMemo(() => {
    return skillsByDepartment[watchedDepartment] || [];
  }, [watchedDepartment]);

  const handleSkillToggle = (skill: string, checked: boolean) => {
    const currentSkills = form.getValues('primarySkills') || [];
    const currentExperience = form.getValues('skillExperience') || {};
    
    if (checked) {
      form.setValue('primarySkills', [...currentSkills, skill]);
      form.setValue('skillExperience', { ...currentExperience, [skill]: 1 });
    } else {
      form.setValue('primarySkills', currentSkills.filter(s => s !== skill));
      const newExperience = { ...currentExperience };
      delete newExperience[skill];
      form.setValue('skillExperience', newExperience);
    }
  };

  const handleExperienceChange = (skill: string, experience: number) => {
    const currentExperience = form.getValues('skillExperience') || {};
    form.setValue('skillExperience', { ...currentExperience, [skill]: experience });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Skills & Preferences</h2>
        <p className="text-gray-600 mt-2">Tell us about your skills and work preferences</p>
      </div>

      <div className="space-y-8">
        <div>
          <FormLabel className="text-base font-semibold">Primary Skills (Select at least 3) *</FormLabel>
          <div className="mt-4 space-y-4">
            {availableSkills.map((skill) => (
              <div key={skill} className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={skill}
                    checked={watchedSkills.includes(skill)}
                    onCheckedChange={(checked) => handleSkillToggle(skill, checked as boolean)}
                  />
                  <Label htmlFor={skill} className="font-medium">{skill}</Label>
                </div>
                
                {watchedSkills.includes(skill) && (
                  <div className="ml-6 space-y-2">
                    <Label className="text-sm text-gray-600">
                      Years of Experience: {form.watch(`skillExperience.${skill}`) || 1}
                    </Label>
                    <Slider
                      value={[form.watch(`skillExperience.${skill}`) || 1]}
                      onValueChange={([value]) => handleExperienceChange(skill, value)}
                      max={20}
                      min={1}
                      step={1}
                      className="w-40"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
          {form.formState.errors.primarySkills && (
            <p className="text-sm text-red-600 mt-2">
              {form.formState.errors.primarySkills.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="workingHoursStart"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Working Hours Start *</FormLabel>
                <FormControl>
                  <Input
                    type="time"
                    {...field}
                    onFocus={() => trackFieldFocus('workingHoursStart')}
                    onBlur={(e) => {
                      trackFieldBlur('workingHoursStart');
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
            name="workingHoursEnd"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Working Hours End *</FormLabel>
                <FormControl>
                  <Input
                    type="time"
                    {...field}
                    onFocus={() => trackFieldFocus('workingHoursEnd')}
                    onBlur={(e) => {
                      trackFieldBlur('workingHoursEnd');
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

        <div>
          <FormField
            control={form.control}
            name="remoteWorkPreference"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">
                  Remote Work Preference: {field.value}%
                </FormLabel>
                <FormControl>
                  <div className="mt-4">
                    <Slider
                      value={[field.value]}
                      onValueChange={([value]) => field.onChange(value)}
                      max={100}
                      min={0}
                      step={10}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-2">
                      <span>0% (Office only)</span>
                      <span>100% (Fully remote)</span>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {watchedRemotePreference > 50 && (
          <FormField
            control={form.control}
            name="managerApproved"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-yellow-50">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="font-medium text-yellow-800">
                    Manager Approved for Remote Work *
                  </FormLabel>
                  <p className="text-sm text-yellow-700">
                    Since you prefer more than 50% remote work, manager approval is required.
                  </p>
                </div>
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="extraNotes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Extra Notes (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Any additional information you'd like to share..."
                  maxLength={500}
                  rows={4}
                  {...field}
                  onFocus={() => trackFieldFocus('extraNotes')}
                  onBlur={(e) => {
                    trackFieldBlur('extraNotes');
                    field.onBlur();
                  }}
                />
              </FormControl>
              <p className="text-sm text-gray-500 mt-1">
                {field.value?.length || 0}/500 characters
              </p>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}