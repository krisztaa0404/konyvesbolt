import { RadioGroup, Radio, Typography, Box } from '@mui/material';
import { formatCurrency } from '@utils/formatters';
import type { SeasonalDiscount } from '@types';
import { DiscountOption, DiscountDetails, SavingsPreview } from './DiscountSelector.sc';

interface DiscountSelectorProps {
  selectedType: 'loyalty' | 'seasonal' | 'none';
  onTypeChange: (type: 'loyalty' | 'seasonal' | 'none') => void;
  loyaltyDiscountPercent?: number;
  seasonalDiscount?: SeasonalDiscount;
  cartSubtotal: number;
}

export const DiscountSelector = ({
  selectedType,
  onTypeChange,
  loyaltyDiscountPercent,
  seasonalDiscount,
  cartSubtotal,
}: DiscountSelectorProps) => {
  const calculateSavings = (percent: number) => {
    return (cartSubtotal * percent) / 100;
  };

  const hasLoyaltyDiscount = loyaltyDiscountPercent && loyaltyDiscountPercent > 0;
  const hasSeasonalDiscount = seasonalDiscount && seasonalDiscount.percentage;

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mb: 2 }}>
        Choose which discount to apply to your order. Only one discount can be used at a time.
      </Typography>

      <RadioGroup
        value={selectedType}
        onChange={e => onTypeChange(e.target.value as 'loyalty' | 'seasonal' | 'none')}
      >
        <DiscountOption
          value="seasonal"
          control={<Radio />}
          disabled={!hasSeasonalDiscount}
          label={
            <DiscountDetails>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body1" fontWeight={600}>
                  Seasonal Discount
                </Typography>
                {hasSeasonalDiscount && (
                  <Typography variant="body2" color="primary" fontWeight={600}>
                    ({seasonalDiscount.percentage}% off)
                  </Typography>
                )}
              </Box>
              {hasSeasonalDiscount ? (
                <>
                  <Typography variant="body2" color="text.secondary">
                    {seasonalDiscount.name}
                  </Typography>
                  <SavingsPreview>
                    Save {formatCurrency(calculateSavings(seasonalDiscount.percentage || 0))}
                  </SavingsPreview>
                </>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No seasonal discount available
                </Typography>
              )}
            </DiscountDetails>
          }
        />

        <DiscountOption
          value="loyalty"
          control={<Radio />}
          disabled={!hasLoyaltyDiscount}
          label={
            <DiscountDetails>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body1" fontWeight={600}>
                  Loyalty Discount
                </Typography>
                {hasLoyaltyDiscount && (
                  <Typography variant="body2" color="primary" fontWeight={600}>
                    ({loyaltyDiscountPercent}% off)
                  </Typography>
                )}
              </Box>
              {hasLoyaltyDiscount ? (
                <>
                  <Typography variant="body2" color="text.secondary">
                    Your loyalty member discount
                  </Typography>
                  <SavingsPreview>
                    Save {formatCurrency(calculateSavings(loyaltyDiscountPercent || 0))}
                  </SavingsPreview>
                </>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No loyalty discount available
                </Typography>
              )}
            </DiscountDetails>
          }
        />

        <DiscountOption
          value="none"
          control={<Radio />}
          label={
            <DiscountDetails>
              <Typography variant="body1" fontWeight={600}>
                No Discount
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Pay full price
              </Typography>
            </DiscountDetails>
          }
        />
      </RadioGroup>
    </Box>
  );
};
