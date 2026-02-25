import { useState } from 'react';
import { Typography, InputAdornment, IconButton } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@router/routes';
import { HeroContainer, SearchBox, StyledTextField } from './HeroSection.sc';

export const HeroSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`${ROUTES.BROWSE_BOOKS}?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <HeroContainer>
      <Typography variant="h2" component="h1" gutterBottom>
        Discover Your Next Great Read
      </Typography>
      <Typography variant="h6" gutterBottom>
        Explore thousands of books across all genres
      </Typography>
      <SearchBox>
        <StyledTextField
          fullWidth
          placeholder="Search for books, authors, or genres..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSearch} edge="end">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </SearchBox>
    </HeroContainer>
  );
};
