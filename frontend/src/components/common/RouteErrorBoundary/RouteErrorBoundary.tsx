import { Component, type ReactNode } from 'react';
import { Typography, Button } from '@mui/material';
import { Refresh as RefreshIcon, ErrorOutline as ErrorIcon, Home as HomeIcon } from '@mui/icons-material';
import { ErrorContainer, ErrorActions } from './RouteErrorBoundary.sc';

interface RouteErrorBoundaryProps {
  children: ReactNode;
}

interface RouteErrorBoundaryState {
  hasError: boolean;
}

export class RouteErrorBoundary extends Component<
  RouteErrorBoundaryProps,
  RouteErrorBoundaryState
> {
  constructor(props: RouteErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(): RouteErrorBoundaryState {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Route error boundary caught error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <ErrorIcon sx={{ fontSize: 80, color: 'error.main', opacity: 0.8 }} />
          <Typography variant="h4" gutterBottom>
            Something Went Wrong
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            We encountered an unexpected error. Please try reloading the page or return to the
            homepage.
          </Typography>
          <ErrorActions>
            <Button
              variant="contained"
              size="large"
              onClick={this.handleReload}
              startIcon={<RefreshIcon />}
            >
              Reload Page
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={this.handleGoHome}
              startIcon={<HomeIcon />}
            >
              Go to Home
            </Button>
          </ErrorActions>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}
