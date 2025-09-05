export interface Manager {
  id: string;
  name: string;
  department: string;
}

export interface FormData {
  // Step 1: Personal Info
  fullName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: Date;
  profilePicture?: File;
  
  // Step 2: Job Details
  department: string;
  positionTitle: string;
  startDate: Date;
  jobType: 'Full-time' | 'Part-time' | 'Contract';
  salaryExpectation: number;
  manager: string;
  
  // Step 3: Skills & Preferences
  primarySkills: string[];
  skillExperience: Record<string, number>;
  workingHoursStart: string;
  workingHoursEnd: string;
  remoteWorkPreference: number;
  managerApproved?: boolean;
  extraNotes?: string;
  
  // Step 4: Emergency Contact
  emergencyContactName: string;
  emergencyContactRelationship: string;
  emergencyContactPhone: string;
  guardianContactName?: string;
  guardianContactPhone?: string;
  
  // Step 5: Review & Submit
  confirmationChecked: boolean;
}

export type FormStep = 1 | 2 | 3 | 4 | 5;