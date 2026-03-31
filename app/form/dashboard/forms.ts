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
    sheetId: process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID ?? "",
    gid: "0",
  },
  // Add more forms here as needed:
  // { id: "another-form", label: "Another Form", sheetId: process.env.NEXT_PUBLIC_ANOTHER_SHEET_ID ?? "", gid: "0" },
];
