import { Card, CardActionArea, Typography, Box, Chip } from '@mui/material';
import { formatDateRange } from '@utils/formatters';
import type { SeasonalDiscount } from '@types';

interface PromotionCardProps {
  discount: SeasonalDiscount;
  onClick: () => void;
}

export const PromotionCard = ({ discount, onClick }: PromotionCardProps) => {
  const getScopeLabel = (scopeType?: string) => {
    if (scopeType === 'ALL_BOOKS') {
      return 'All Books';
    }
    return 'Selected Books';
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardActionArea onClick={onClick} sx={{ height: '100%', p: 2 }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
              {discount.name}
            </Typography>
            <Chip
              label={`${discount.percentage}% OFF`}
              color="primary"
              size="small"
              sx={{ fontWeight: 600 }}
            />
          </Box>

          {discount.description && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 1.5,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {discount.description}
            </Typography>
          )}

          <Typography variant="caption" color="text.secondary" display="block">
            {formatDateRange(discount.validFrom, discount.validTo)}
          </Typography>

          <Chip
            label={getScopeLabel(discount.scopeType)}
            size="small"
            variant="outlined"
            sx={{ mt: 1 }}
          />
        </Box>
      </CardActionArea>
    </Card>
  );
};
