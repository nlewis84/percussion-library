import * as React from 'react';
import { navigate } from '@reach/router';
import { styled } from '@mui/material/styles';
import { useMemo } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { useUIState } from '../state/UIContext/hooks';

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

function SearchAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const uiState = useUIState();

  const pages = useMemo(() => [
    { route: `/${uiState.ensemblesQueryString}`, title: 'Ensembles' },
    { route: `/solos${uiState.solosQueryString}`, title: 'Solos' },
    // TODO: Get these routes ready for primetime
    // { route: 'chamber-music', title: 'Chamber Music' },
    // { route: 'steel-band', title: 'Steel Band' },
    // { route: 'books', title: 'Books' },
  ], [uiState]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Box sx={{ display: { md: 'none', xs: 'flex' }, flexGrow: 1 }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                horizontal: 'left',
                vertical: 'bottom',
              }}
              keepMounted
              transformOrigin={{
                horizontal: 'left',
                vertical: 'top',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: {
                  md: 'none',
                  xs: 'block',
                },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.title}
                  onClick={() => handleCloseNavMenu && navigate(page.route)}
                >
                  <Typography textAlign="center">{page.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ color: 'text.primary', display: { md: 'flex', xs: 'flex' }, mr: 2 }}
          >
            Percussion Library
          </Typography>

          <Box
            sx={{
              display: { md: 'flex', xs: 'none' },
              flexGrow: 1,
              justifyContent: 'space-evenly',
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.title}
                onClick={() => handleCloseNavMenu && navigate(page.route)}
                sx={{ color: 'text.primary', display: 'block', my: 2 }}
              >
                {page.title}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Offset />
    </Box>
  );
}

export default SearchAppBar;
