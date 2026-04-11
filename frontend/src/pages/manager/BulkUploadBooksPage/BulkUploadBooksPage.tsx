import { useState } from 'react';
import { Typography } from '@mui/material';
import { PageContainer, PageHeader, HeaderContent } from '@layout/manager/ManagerPageLayout.sc';
import { PageBreadcrumbs } from '@components/manager/common/PageBreadcrumbs/PageBreadcrumbs';
import { UploadSection } from '@components/manager/bulk-upload/UploadSection';
import { UploadResults } from '@components/manager/bulk-upload/UploadResults';
import { ResultsContainer } from './BulkUploadBooksPage.sc';
import { useBulkUploadBooks } from '@hooks/useBulkUploadBooks';
import { ROUTES } from '@router/routes';
import type { BulkBookUploadResult } from '@types';

export const BulkUploadBooksPage = () => {
  const [uploadResult, setUploadResult] = useState<BulkBookUploadResult | null>(null);
  const { mutate: uploadBooks, isPending } = useBulkUploadBooks();

  const handleUpload = (file: File) => {
    uploadBooks(file, {
      onSuccess: (data: BulkBookUploadResult) => {
        setUploadResult(data);
      },
    });
  };

  const handleReset = () => {
    setUploadResult(null);
  };

  const breadcrumbs = [{ label: 'Books', path: ROUTES.MANAGER_BOOKS }, { label: 'Bulk Upload' }];

  return (
    <PageContainer>
      <PageBreadcrumbs items={breadcrumbs} />

      <PageHeader>
        <HeaderContent>
          <div>
            <Typography variant="h4" gutterBottom>
              Bulk Upload Books
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Upload multiple books at once using a CSV file
            </Typography>
          </div>
        </HeaderContent>
      </PageHeader>

      {!uploadResult ? (
        <UploadSection onUpload={handleUpload} isUploading={isPending} />
      ) : (
        <ResultsContainer>
          <UploadResults result={uploadResult} onReset={handleReset} />
        </ResultsContainer>
      )}
    </PageContainer>
  );
};

export default BulkUploadBooksPage;
