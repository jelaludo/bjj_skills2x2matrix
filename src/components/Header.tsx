import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, useTheme, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import HelpIcon from '@mui/icons-material/Help';

interface HeaderProps {
  onMobileMenuToggle?: () => void;
}

const Header = React.forwardRef<HTMLDivElement, HeaderProps>(({ onMobileMenuToggle }, ref) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AppBar 
      ref={ref}
      position="static" 
      sx={{ 
        backgroundColor: 'background.paper',
        borderBottom: 1,
        borderColor: 'divider',
        boxShadow: 'none',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {isMobile && onMobileMenuToggle && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={onMobileMenuToggle}
              sx={{ mr: 2, display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography 
            variant="h6" 
            component="div"
            sx={{ 
              fontWeight: 700,
              letterSpacing: 1,
              color: 'text.primary',
            }}
          >
            Grappling Primitives
          </Typography>
        </div>
        
        <div style={{ display: 'flex', gap: 8 }}>
          <Button 
            variant="outlined" 
            size="small"
            startIcon={<DarkModeIcon />}
            sx={{ 
              color: 'text.primary',
              borderColor: 'divider',
              '&:hover': {
                borderColor: 'primary.main',
              }
            }}
          >
            Theme
          </Button>
          <Button 
            variant="outlined" 
            size="small"
            startIcon={<HelpIcon />}
            sx={{ 
              color: 'text.primary',
              borderColor: 'divider',
              '&:hover': {
                borderColor: 'primary.main',
              }
            }}
          >
            Help
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
});

Header.displayName = 'Header';

export default Header; 