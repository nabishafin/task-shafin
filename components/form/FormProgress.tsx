"use client";

import { FormStep } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface FormProgressProps {
  currentStep: FormStep;
  completedSteps: FormStep[];
  onStepClick: (step: FormStep) => void;
}

const steps = [
  { number: 1, title: "Personal Info" },
  { number: 2, title: "Job Details" },
  { number: 3, title: "Skills & Preferences" },
  { number: 4, title: "Emergency Contact" },
  { number: 5, title: "Review & Submit" },
];

export function FormProgress({
  currentStep,
  completedSteps,
  onStepClick,
}: FormProgressProps) {
  return (
    <div className="w-full py-6 ">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 ">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <button
              type="button"
              onClick={() => onStepClick(step.number as FormStep)}
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full border-2 font-medium transition-all",
                completedSteps.includes(step.number as FormStep)
                  ? "bg-green-500 border-green-500 text-white hover:bg-green-600"
                  : currentStep === step.number
                  ? "bg-blue-500 border-blue-500 text-white"
                  : currentStep > step.number
                  ? "bg-gray-200 border-gray-200 text-gray-600 hover:bg-gray-300 cursor-pointer"
                  : "bg-white border-gray-300 text-gray-400"
              )}
            >
              {completedSteps.includes(step.number as FormStep) ? (
                <Check className="w-5 h-5" />
              ) : (
                step.number
              )}
            </button>
            <div className="ml-3 hidden sm:block">
              <p
                className={cn(
                  "text-sm font-medium",
                  currentStep === step.number
                    ? "text-blue-600"
                    : "text-gray-500"
                )}
              >
                {step.title}
              </p>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "hidden sm:block w-16 h-0.5 mx-4",
                  completedSteps.includes(step.number as FormStep)
                    ? "bg-green-500"
                    : "bg-gray-300"
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
