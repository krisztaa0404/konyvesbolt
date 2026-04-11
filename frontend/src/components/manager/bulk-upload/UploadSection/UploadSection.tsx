import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Typography,
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DownloadIcon from '@mui/icons-material/Download';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ErrorIcon from '@mui/icons-material/Error';
import { csvUploadSchema, type CsvUploadFormData } from '@schemas/csvUploadSchemas';
import { managerApi } from '@services/api/managerApi';
import {
  UploadContainer,
  InstructionsBox,
} from '@pages/manager/BulkUploadBooksPage/BulkUploadBooksPage.sc';
import { VisuallyHiddenInput, FileDropZone } from './UploadSection.sc';

interface UploadSectionProps {
  onUpload: (file: File) => void;
  isUploading: boolean;
}

export const UploadSection = ({ onUpload, isUploading }: UploadSectionProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<CsvUploadFormData>({
    resolver: zodResolver(csvUploadSchema),
    mode: 'onChange',
  });

  const selectedFile = watch('file');

  const onSubmit = (data: CsvUploadFormData) => {
    onUpload(data.file);
  };

  const handleDownloadTemplate = async () => {
    try {
      await managerApi.downloadBookTemplate();
    } catch (error) {
      console.error('Failed to download template:', error);
    }
  };

  return (
    <UploadContainer>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Upload Books CSV File</Typography>
        <Button
          variant="outlined"
          startIcon={<DownloadIcon />}
          onClick={handleDownloadTemplate}
          disabled={isUploading}
        >
          Download Template
        </Button>
      </Box>

      <InstructionsBox>
        <Typography variant="subtitle2" gutterBottom>
          Instructions:
        </Typography>
        <List dense>
          <ListItem disablePadding>
            <ListItemIcon sx={{ minWidth: 32 }}>
              <CheckCircleIcon fontSize="small" color="primary" />
            </ListItemIcon>
            <ListItemText primary="Download the template CSV file to see the required format" />
          </ListItem>
          <ListItem disablePadding>
            <ListItemIcon sx={{ minWidth: 32 }}>
              <CheckCircleIcon fontSize="small" color="primary" />
            </ListItemIcon>
            <ListItemText primary="Fill in your book data following the example format" />
          </ListItem>
          <ListItem disablePadding>
            <ListItemIcon sx={{ minWidth: 32 }}>
              <CheckCircleIcon fontSize="small" color="primary" />
            </ListItemIcon>
            <ListItemText primary="Ensure all required fields are filled (title, authors, ISBN, publisher, etc.)" />
          </ListItem>
          <ListItem disablePadding>
            <ListItemIcon sx={{ minWidth: 32 }}>
              <CheckCircleIcon fontSize="small" color="primary" />
            </ListItemIcon>
            <ListItemText primary="Make sure genres exist in the system before uploading" />
          </ListItem>
          <ListItem disablePadding>
            <ListItemIcon sx={{ minWidth: 32 }}>
              <CheckCircleIcon fontSize="small" color="primary" />
            </ListItemIcon>
            <ListItemText primary="File size must be less than 5MB" />
          </ListItem>
        </List>
      </InstructionsBox>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Controller
            name="file"
            control={control}
            render={({ field: { onChange, value: _, ...field } }) => (
              <Box>
                <FileDropZone error={!!errors.file} hasFile={!!selectedFile} as="label">
                  <Box
                    sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}
                  >
                    {errors.file ? (
                      <ErrorIcon sx={{ fontSize: 48, color: 'error.main' }} />
                    ) : selectedFile ? (
                      <AttachFileIcon sx={{ fontSize: 48, color: 'success.main' }} />
                    ) : (
                      <CloudUploadIcon sx={{ fontSize: 48, color: 'action.active' }} />
                    )}

                    <Box>
                      <Typography variant="h6" gutterBottom>
                        {selectedFile ? selectedFile.name : 'Choose CSV file'}
                      </Typography>
                      {selectedFile && (
                        <Typography variant="body2" color="text.secondary">
                          {(selectedFile.size / 1024).toFixed(2)} KB
                        </Typography>
                      )}
                      {!selectedFile && (
                        <Typography variant="body2" color="text.secondary">
                          Click to browse or drag and drop your CSV file here
                        </Typography>
                      )}
                    </Box>

                    <Button variant="outlined" component="span" disabled={isUploading}>
                      Browse Files
                    </Button>
                  </Box>

                  <VisuallyHiddenInput
                    {...field}
                    type="file"
                    accept=".csv,text/csv"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        onChange(file);
                      }
                    }}
                    disabled={isUploading}
                  />
                </FileDropZone>

                {errors.file && (
                  <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                    {errors.file.message}
                  </Typography>
                )}
              </Box>
            )}
          />

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              startIcon={isUploading ? <CircularProgress size={20} /> : <CloudUploadIcon />}
              disabled={isUploading || !selectedFile}
              sx={{ minWidth: 200 }}
            >
              {isUploading ? 'Uploading...' : 'Upload Books'}
            </Button>
          </Box>
        </Box>
      </form>
    </UploadContainer>
  );
};
