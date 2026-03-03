import { styled } from '@mui/material/styles';
import { Card, Box } from '@mui/material';

export const AlertStyledCard = styled(Card, {
  shouldForwardProp: prop => prop !== '$severity',
})<{ $severity: 'warning' | 'error' }>(({ theme, $severity }) => {
  const severityColors = {
    warning: {
      bg: theme.palette.warning.light,
      border: theme.palette.warning.main,
    },
    error: {
      bg: theme.palette.error.light,
      border: theme.palette.error.main,
    },
  };

  const colors = severityColors[$severity];

  return {
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(1.5),
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    borderRadius: theme.spacing(2),
    border: `2px solid ${colors.border}`,
    backgroundColor: colors.bg,
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: theme.shadows[8],
      borderColor: colors.border,
    },
    '&:focus': {
      outline: `2px solid ${colors.border}`,
      outlineOffset: '2px',
    },
  };
});

export const IconContainer = styled(Box, {
  shouldForwardProp: prop => prop !== '$severity',
})<{ $severity: 'warning' | 'error' }>(({ theme, $severity }) => {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette[$severity].dark,
    '& svg': {
      fontSize: 40,
    },
  };
});

export const ContentContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 4,
}));
