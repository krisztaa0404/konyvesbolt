import {
  Alert,
  AlertTitle,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { SkippedRowsTable } from '../SkippedRowsTable';
import type { BulkBookUploadResult } from '@types';

interface UploadResultsProps {
  result: BulkBookUploadResult;
  onReset: () => void;
}

export const UploadResults = ({ result, onReset }: UploadResultsProps) => {
  const { totalRows, successCount, skippedCount, message, skippedRows } = result;

  const getSeverity = () => {
    if (!successCount) return 'error';
    if (successCount === totalRows) return 'success';
    if (successCount > 0) return 'warning';
    return 'error';
  };

  const severity = getSeverity();

  return (
    <Box>
      <Alert severity={severity}>
        <AlertTitle>
          {severity === 'success' && 'Upload Successful!'}
          {severity === 'warning' && 'Upload Partially Successful'}
          {severity === 'error' && 'Upload Failed'}
        </AlertTitle>
        {message}
      </Alert>

      {skippedRows && skippedRows.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Accordion defaultExpanded={successCount === 0}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="skipped-rows-content"
              id="skipped-rows-header"
            >
              <strong>View Skipped Rows ({skippedCount})</strong>
            </AccordionSummary>
            <AccordionDetails>
              <SkippedRowsTable skippedRows={skippedRows} />
            </AccordionDetails>
          </Accordion>
        </Box>
      )}

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
        <Button variant="contained" onClick={onReset}>
          Upload Another File
        </Button>
      </Box>
    </Box>
  );
};
