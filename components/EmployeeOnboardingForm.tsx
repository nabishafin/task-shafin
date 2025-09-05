"use client";

import { useState, useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { FormProgress } from './form/FormProgress';
import { PersonalInfoStep } from './form/steps/PersonalInfoStep';
import { JobDetailsStep } from './form/steps/JobDetailsStep';
import { SkillsStep } from './form/steps/SkillsStep';
import { EmergencyContactStep } from './form/steps/EmergencyContactStep';
import { ReviewStep } from './form/steps/ReviewStep';
import { useMultiStepForm } from '@/hooks/useMultiStepForm';
import { FormStep } from '@/lib/types';
import { 
  personalInfoSchema, 
  createJobDetailsSchema, 
  createSkillsSchema, 
  createEmergencyContactSchema, 
  reviewSubmitSchema 
} from '@/lib/validation';
import { ArrowLeft, ArrowRight, Send } from 'lucide-react';

export function EmployeeOnboardingForm() {
  const [completedSteps, setCompletedSteps] = useState<FormStep[]>([]);
  const { 
    form, 
    currentStep, 
    goToStep, 
    nextStep, 
    prevStep, 
    onSubmit, 
    hasUnsavedChanges,
    trackFieldFocus,
    trackFieldBlur 
  } = useMultiStepForm();

  // Calculate age for conditional logic
  const dateOfBirth = form.watch('dateOfBirth');
  const isUnder21 = useMemo(() => {
    if (!dateOfBirth) return false;
    const today = new Date();
    const age = today.getFullYear() - dateOfBirth.getFullYear();
    const monthDiff = today.getMonth() - dateOfBirth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())) {
      return age - 1 < 21;
    }
    return age < 21;
  }, [dateOfBirth]);

  // Dynamic schema validation based on current step and form data
  const getCurrentSchema = () => {
    const department = form.watch('department');
    const remoteWorkPreference = form.watch('remoteWorkPreference');
    
    switch (currentStep) {
      case 1:
        return personalInfoSchema;
      case 2:
        return createJobDetailsSchema(department);
      case 3:
        return createSkillsSchema(remoteWorkPreference);
      case 4:
        return createEmergencyContactSchema(isUnder21);
      case 5:
        return reviewSubmitSchema;
      default:
        return personalInfoSchema;
    }
  };

  // Update form resolver when step changes
  const currentSchema = getCurrentSchema();
  form.resolver = zodResolver(currentSchema);

  const validateCurrentStep = async () => {
    const result = await form.trigger();
    if (result && !completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
    return result;
  };

  const handleNext = async () => {
    const isValid = await validateCurrentStep();
    if (isValid) {
      nextStep();
    }
  };

  const handlePrevious = () => {
    prevStep();
  };

  const handleStepClick = async (step: FormStep) => {
    if (step <= currentStep || completedSteps.includes(step - 1)) {
      goToStep(step);
    }
  };

  const handleSubmit = async (data: any) => {
    const isValid = await validateCurrentStep();
    if (isValid) {
      onSubmit(data);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoStep 
            form={form} 
            trackFieldFocus={trackFieldFocus}
            trackFieldBlur={trackFieldBlur}
          />
        );
      case 2:
        return (
          <JobDetailsStep 
            form={form}
            trackFieldFocus={trackFieldFocus}
            trackFieldBlur={trackFieldBlur}
          />
        );
      case 3:
        return (
          <SkillsStep 
            form={form}
            trackFieldFocus={trackFieldFocus}
            trackFieldBlur={trackFieldBlur}
          />
        );
      case 4:
        return (
          <EmergencyContactStep 
            form={form} 
            isUnder21={isUnder21}
            trackFieldFocus={trackFieldFocus}
            trackFieldBlur={trackFieldBlur}
          />
        );
      case 5:
        return <ReviewStep form={form} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Employee Onboarding</h1>
          <p className="text-xl text-gray-600">Welcome! Let's get you set up in just a few steps.</p>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <FormProgress 
              currentStep={currentStep}
              completedSteps={completedSteps}
              onStepClick={handleStepClick}
            />
          </CardHeader>

          <CardContent className="p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)}>
                <div className="min-h-[600px]">
                  {renderCurrentStep()}
                </div>

                <div className="flex justify-between items-center mt-8 pt-6 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStep === 1}
                    className="flex items-center gap-2 h-12 px-6"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Previous
                  </Button>

                  <div className="text-sm text-gray-500">
                    Step {currentStep} of 5
                  </div>

                  {currentStep < 5 ? (
                    <Button
                      type="button"
                      onClick={handleNext}
                      className="flex items-center gap-2 h-12 px-6 bg-blue-600 hover:bg-blue-700"
                    >
                      Next
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={!form.watch('confirmationChecked')}
                      className="flex items-center gap-2 h-12 px-6 bg-green-600 hover:bg-green-700"
                    >
                      <Send className="w-4 h-4" />
                      Submit Application
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {hasUnsavedChanges && (
          <div className="fixed bottom-4 right-4 bg-yellow-100 border border-yellow-300 rounded-lg p-3 shadow-lg">
            <p className="text-yellow-800 text-sm font-medium">You have unsaved changes</p>
          </div>
        )}
      </div>
    </div>
  );
}