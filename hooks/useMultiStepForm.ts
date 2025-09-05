"use client";

import { useState, useEffect } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormData, FormStep } from '@/lib/types';
import { personalInfoSchema } from '@/lib/validation';

export function useMultiStepForm() {
  const [currentStep, setCurrentStep] = useState<FormStep>(1);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [stepStartTimes, setStepStartTimes] = useState<Record<number, number>>({});
  const [fieldFocusTimes, setFieldFocusTimes] = useState<Record<string, number>>({});

  const form = useForm<FormData>({
    resolver: zodResolver(personalInfoSchema),
    mode: 'onChange',
    defaultValues: {
      primarySkills: [],
      skillExperience: {},
      remoteWorkPreference: 0,
      confirmationChecked: false,
    },
  });

  // Track step timing
  useEffect(() => {
    setStepStartTimes(prev => ({
      ...prev,
      [currentStep]: Date.now(),
    }));
  }, [currentStep]);

  // Track unsaved changes
  useEffect(() => {
    const subscription = form.watch(() => {
      setHasUnsavedChanges(true);
    });
    return () => subscription.unsubscribe();
  }, [form]);

  // Warn before leaving with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const trackFieldFocus = (fieldName: string) => {
    setFieldFocusTimes(prev => ({
      ...prev,
      [fieldName]: Date.now(),
    }));
  };

  const trackFieldBlur = (fieldName: string) => {
    const startTime = fieldFocusTimes[fieldName];
    if (startTime) {
      const timeSpent = Date.now() - startTime;
      console.log(`Time spent on ${fieldName}: ${timeSpent}ms`);
    }
  };

  const goToStep = (step: FormStep) => {
    setCurrentStep(step);
  };

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep((prev) => (prev + 1) as FormStep);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as FormStep);
    }
  };

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
    console.log('Step timings:', stepStartTimes);
    setHasUnsavedChanges(false);
    // Here you would normally send the data to your backend
    alert('Form submitted successfully!');
  };

  return {
    form,
    currentStep,
    goToStep,
    nextStep,
    prevStep,
    onSubmit,
    hasUnsavedChanges,
    trackFieldFocus,
    trackFieldBlur,
  };
}