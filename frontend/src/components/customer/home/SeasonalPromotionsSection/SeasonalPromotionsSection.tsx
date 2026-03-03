import { Typography, Button, Skeleton, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@router/routes';
import { PromotionCard } from '@components/customer/home/PromotionCard/PromotionCard';
import type { SeasonalDiscount } from '@types';
import {
  PromotionsContainer,
  PromotionsList,
  FeaturedBanner,
  FeaturedPercentage,
  FeaturedTitle,
  FeaturedDescription,
} from './SeasonalPromotionsSection.sc';

interface SeasonalPromotionsSectionProps {
  discounts: SeasonalDiscount[];
  isLoading: boolean;
}

export const SeasonalPromotionsSection = ({
  discounts,
  isLoading,
}: SeasonalPromotionsSectionProps) => {
  const navigate = useNavigate();

  const handlePromotionClick = (discountId?: string) => {
    if (discountId) {
      navigate(`${ROUTES.BROWSE_BOOKS}?discountId=${discountId}`);
    }
  };

  if (!isLoading && (!discounts || discounts.length === 0)) {
    return null;
  }

  const featuredDiscount = discounts[0];
  const listDiscounts = discounts.slice(0, 3);

  return (
    <Box sx={{ mb: 6 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h2">
          Current Promotions
        </Typography>
        {!isLoading && discounts.length > 0 && (
          <Button
            variant="outlined"
            onClick={() => navigate(ROUTES.BROWSE_BOOKS)}
            sx={{ textTransform: 'none' }}
          >
            Browse All Books
          </Button>
        )}
      </Box>

      {isLoading ? (
        <PromotionsContainer>
          <PromotionsList>
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} variant="rectangular" height={120} />
            ))}
          </PromotionsList>
          <Skeleton variant="rectangular" height={300} />
        </PromotionsContainer>
      ) : (
        <PromotionsContainer>
          <PromotionsList>
            {listDiscounts.map(discount => (
              <PromotionCard
                key={discount.id}
                discount={discount}
                onClick={() => handlePromotionClick(discount.id)}
              />
            ))}
          </PromotionsList>

          {featuredDiscount && (
            <FeaturedBanner onClick={() => handlePromotionClick(featuredDiscount.id)}>
              <FeaturedPercentage>
                {featuredDiscount.percentage}% OFF
              </FeaturedPercentage>
              <FeaturedTitle>{featuredDiscount.name}</FeaturedTitle>
              {featuredDiscount.description && (
                <FeaturedDescription>{featuredDiscount.description}</FeaturedDescription>
              )}
              <Button
                variant="contained"
                size="large"
                sx={{
                  mt: 2,
                  bgcolor: 'white',
                  color: 'primary.main',
                  '&:hover': {
                    bgcolor: 'grey.100',
                  },
                }}
              >
                Shop Now
              </Button>
            </FeaturedBanner>
          )}
        </PromotionsContainer>
      )}
    </Box>
  );
};
