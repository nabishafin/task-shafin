import { z } from 'zod';

const phoneRegex = /^\+\d{1,3}-\d{3}-\d{3}-\d{4}$/;

// Utility functions
const isAtLeast18YearsOld = (date: Date) => {
  const today = new Date();
  const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
  return date <= eighteenYearsAgo;
};

const isWeekend = (date: Date) => {
  const day = date.getDay();
  return day === 5 || day === 6; // Friday or Saturday
};

const isWithin90Days = (date: Date) => {
  const today = new Date();
  const ninetyDaysFromNow = new Date(today.getTime() + (90 * 24 * 60 * 60 * 1000));
  return date >= today && date <= ninetyDaysFromNow;
};

// Step 1: Personal Info
export const personalInfoSchema = z.object({
  fullName: z.string()
    .min(1, 'Full name is required')
    .refine((val) => val.trim().split(' ').length >= 2, 'Full name must contain at least 2 words'),
  email: z.string().email('Please enter a valid email address'),
  phoneNumber: z.string()
    .regex(phoneRegex, 'Phone number must be in format: +1-123-456-7890'),
  dateOfBirth: z.date()
    .refine(isAtLeast18YearsOld, 'You must be at least 18 years old'),
  profilePicture: z.instanceof(File)
    .optional()
    .refine(
      (file) => !file || (file.type === 'image/jpeg' || file.type === 'image/png'),
      'Profile picture must be JPG or PNG'
    )
    .refine(
      (file) => !file || file.size <= 2 * 1024 * 1024,
      'Profile picture must be less than 2MB'
    ),
});

// Step 2: Job Details
export const createJobDetailsSchema = (department: string) => z.object({
  department: z.enum(['Engineering', 'Marketing', 'Sales', 'HR', 'Finance'], {
    required_error: 'Please select a department',
  }),
  positionTitle: z.string()
    .min(3, 'Position title must be at least 3 characters'),
  startDate: z.date()
    .refine((date) => date >= new Date(), 'Start date cannot be in the past')
    .refine(isWithin90Days, 'Start date must be within 90 days from today')
    .refine((date) => {
      if (department === 'HR' || department === 'Finance') {
        return !isWeekend(date);
      }
      return true;
    }, 'HR and Finance positions cannot start on weekends'),
  jobType: z.enum(['Full-time', 'Part-time', 'Contract'], {
    required_error: 'Please select a job type',
  }),
  salaryExpectation: z.number()
    .positive('Salary expectation must be positive'),
  manager: z.string().min(1, 'Please select a manager'),
});

// Step 3: Skills & Preferences
export const createSkillsSchema = (remoteWorkPreference: number) => z.object({
  primarySkills: z.array(z.string())
    .min(3, 'Please select at least 3 primary skills'),
  skillExperience: z.record(z.string(), z.number().min(0).max(20)),
  workingHoursStart: z.string()
    .regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter a valid time format'),
  workingHoursEnd: z.string()
    .regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter a valid time format'),
  remoteWorkPreference: z.number().min(0).max(100),
  managerApproved: remoteWorkPreference > 50 ? 
    z.boolean().refine(val => val === true, 'Manager approval required for >50% remote work') :
    z.boolean().optional(),
  extraNotes: z.string().max(500, 'Extra notes cannot exceed 500 characters').optional(),
});

// Step 4: Emergency Contact
export const createEmergencyContactSchema = (isUnder21: boolean) => z.object({
  emergencyContactName: z.string().min(1, 'Emergency contact name is required'),
  emergencyContactRelationship: z.string().min(1, 'Please select a relationship'),
  emergencyContactPhone: z.string()
    .regex(phoneRegex, 'Phone number must be in format: +1-123-456-7890'),
  guardianContactName: isUnder21 ? 
    z.string().min(1, 'Guardian contact name is required') : 
    z.string().optional(),
  guardianContactPhone: isUnder21 ? 
    z.string().regex(phoneRegex, 'Phone number must be in format: +1-123-456-7890') : 
    z.string().optional(),
});

// Step 5: Review & Submit
export const reviewSubmitSchema = z.object({
  confirmationChecked: z.boolean().refine(val => val === true, 'You must confirm that all information is correct'),
});