import { SpinnerContainer, StyledCircularProgress } from './LoadingSpinner.sc';

interface LoadingSpinnerProps {
  fullPage?: boolean;
  size?: number;
}

export const LoadingSpinner = ({ fullPage = false, size = 40 }: LoadingSpinnerProps) => {
  return (
    <SpinnerContainer $fullPage={fullPage}>
      <StyledCircularProgress size={size} />
    </SpinnerContainer>
  );
};
