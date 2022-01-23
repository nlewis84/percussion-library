import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import { navigate } from '@reach/router';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const pages = [
  { route: '/', title: 'Ensembles' },
  { route: 'solos', title: 'Solos' },
  { route: 'chamber-music', title: 'Chamber Music' },
  { route: 'steel-band', title: 'Steel Band' },
  { route: 'books', title: 'Books' },
];

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const Search = styled('div')(({ theme }) => ({
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  borderRadius: theme.shape.borderRadius,
  marginLeft: 0,
  position: 'relative',
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  height: '100%',
  justifyContent: 'center',
  padding: theme.spacing(0, 2),
  pointerEvents: 'none',
  position: 'absolute',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      '&:focus': {
        width: '20ch',
      },
      width: '12ch',
    },
  },
  color: 'inherit',
}));

function SearchAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ color: 'white', display: { md: 'flex', xs: 'none' }, mr: 2 }}
          >
            Percussion Library
          </Typography>

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
                sx={{ color: 'white', display: 'block', my: 2 }}
              >
                {page.title}
              </Button>
            ))}
          </Box>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Toolbar>
      </AppBar>
      <Offset />
    </Box>
  );
}

export default SearchAppBar;
