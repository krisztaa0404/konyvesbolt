import { Box, Paper, styled } from '@mui/material';

export const UploadContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginBottom: theme.spacing(3),
}));

export const InstructionsBox = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  padding: theme.spacing(2),
  backgroundColor: theme.palette.grey[50],
  borderRadius: theme.shape.borderRadius,
  borderLeft: `4px solid ${theme.palette.primary.main}`,
}));

export const ResultsContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
}));
