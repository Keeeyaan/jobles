"use client";

import { TestCasePreview } from "./test-case-preview";

// --- Types ---
export type TestCase = {
  id: string;
  title: string;
  description?: string;
  type: "Happy Path" | "Edge Case" | "Security" | "Performance";
  complexity: "Low" | "Med" | "High";
  preConditions?: string;
  steps: string[];
  expectedResults: string[];
};

// --- Mock Data ---
const MOCK_RESULTS: TestCase[] = [
  {
    id: "TC-001",
    title: "Valid Profile Image Upload",
    description:
      "Ensure that a user can successfully upload a 2MB JPG image. Verify the file is correctly associated with the profile ID.",
    type: "Happy Path",
    preConditions: "User is authenticated, User has a valid profile ID",
    complexity: "Low",
    steps: [
      "Navigate to profile settings",
      "Click on 'Upload Image' and select a malicious file",
    ],
    expectedResults: [
      "Image uploads successfully and is displayed on the profile",
      " System rejects the file and displays an error message about invalid file type",
    ],
  },
  {
    id: "TC-002",
    title: "Maximum File Size Boundary",
    description:
      "Verify system behavior when uploading exactly 5.0MB vs 5.1MB files. Check error message clarity.",
    type: "Edge Case",
    preConditions: "User is authenticated, User has a valid profile ID",
    complexity: "Med",
    steps: [
      "Navigate to profile settings",
      "Click on 'Upload Image' and select a malicious file",
    ],
    expectedResults: [
      "Image uploads successfully and is displayed on the profile",
      " System rejects the file and displays an error message about invalid file type",
    ],
  },
  {
    id: "TC-003",
    title: "Executable Payload Injection",
    description:
      "Attempt to upload a .php file disguised with a .jpg extension. Verify content-type validation.",
    type: "Security",
    preConditions: "User is authenticated, User has a valid profile ID",
    complexity: "High",
    steps: [
      "Navigate to profile settings",
      "Click on 'Upload Image' and select a malicious file",
    ],
    expectedResults: [
      "Image uploads successfully and is displayed on the profile",
      " System rejects the file and displays an error message about invalid file type",
    ],
  },
];

export function TestCaseGeneration() {
  return (
    <div className="flex justify-center flex-wrap gap-4">
      <TestCasePreview results={MOCK_RESULTS} isGenerating={false} />
    </div>
  );
}
