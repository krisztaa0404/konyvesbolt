import { Typography } from '@mui/material';
import { FooterContainer, FooterContent, LinksBox, StyledLink } from './Footer.sc';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterContent>
        <LinksBox>
          <StyledLink href="#">Privacy Policy</StyledLink>
          <StyledLink href="#">Terms of Service</StyledLink>
          <StyledLink href="#">Contact Us</StyledLink>
        </LinksBox>
        <Typography variant="body2" color="text.secondary">
          © {currentYear} Bookstore. All rights reserved.
        </Typography>
      </FooterContent>
    </FooterContainer>
  );
};
