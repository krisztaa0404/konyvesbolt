import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPE = 'text/csv';
const ACCEPTED_EXTENSION = '.csv';

export const csvUploadSchema = z.object({
  file: z
    .instanceof(File, { message: 'Please select a file' })
    .refine(file => file.size > 0, 'File cannot be empty')
    .refine(file => file.size <= MAX_FILE_SIZE, 'File size must be less than 5MB')
    .refine(file => file.type === ACCEPTED_FILE_TYPE, 'File must be a CSV file')
    .refine(
      file => file.name.toLowerCase().endsWith(ACCEPTED_EXTENSION),
      'File must have .csv extension'
    ),
});

export type CsvUploadFormData = z.infer<typeof csvUploadSchema>;
