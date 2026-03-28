// Server-side only — do not import in client components
export interface FormConfig {
  id: string;
  label: string;
  sheetId: string;
  gid: string;
}

export const FORMS: FormConfig[] = [
  {
    id: "training-enquiry",
    label: "Training Enquiry Form",
    sheetId: process.env.GOOGLE_SHEET_ID ?? "",
    gid: "0",
  },
  // Add more forms here as needed:
  // { id: "another-form", label: "Another Form", sheetId: process.env.ANOTHER_SHEET_ID ?? "", gid: "0" },
];
