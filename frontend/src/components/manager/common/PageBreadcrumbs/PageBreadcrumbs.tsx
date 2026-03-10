import { Breadcrumbs, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface PageBreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const PageBreadcrumbs = ({ items }: PageBreadcrumbsProps) => {
  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        if (isLast || !item.path) {
          return (
            <Typography key={index} color="text.secondary">
              {item.label}
            </Typography>
          );
        }

        return (
          <Link key={index} component={RouterLink} to={item.path} underline="hover" color="inherit">
            {item.label}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};
