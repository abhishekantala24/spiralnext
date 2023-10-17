"use client"
import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation'
import Logo from "@/assets/img/final-logo.png"
import { logoutAction } from '@/redux/auth/middleware';
import Image from 'next/image';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { authSelector } from '@/redux/auth/authSlice';

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const dispatch = useAppDispatch()
    const appSelector = useAppSelector(authSelector).userDetails?.uid
    const selector = Cookies.get('user');
    const router = useRouter();

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = (value: string) => {
        setAnchorElNav(null);
        router.push(value)
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <>
            {selector || appSelector ?
                <AppBar position="static" style={{ backgroundColor: '#88c4ff80' }}>
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>
                            <Link href={'/'}>
                                <Typography
                                    variant="h6"
                                    noWrap
                                    component="a"
                                    sx={{
                                        mr: 2,
                                        display: { xs: 'none', md: 'flex' },
                                        fontFamily: 'monospace',
                                        fontWeight: 700,
                                        letterSpacing: '.3rem',
                                        color: 'inherit',
                                        textDecoration: 'none',
                                    }}
                                >
                                    <Image
                                        src={Logo}
                                        width={140}
                                        height={50}
                                        alt="logo"
                                    />
                                </Typography>
                            </Link>
                            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    open={Boolean(anchorElNav)}
                                    onClose={() => handleCloseNavMenu('/')}
                                    sx={{
                                        display: { xs: 'block', md: 'none' },
                                    }}
                                >
                                    <MenuItem onClick={() => handleCloseNavMenu('/employee')}>
                                        <Typography textAlign="center">Prising</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={() => handleCloseNavMenu('/about-us')}>
                                        <Typography textAlign="center">About us</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={() => handleCloseNavMenu('/blog')}>
                                        <Typography textAlign="center">Blog</Typography>
                                    </MenuItem>
                                </Menu>
                            </Box>

                            <Typography
                                variant="h5"
                                noWrap
                                component="a"
                                href="#app-bar-with-responsive-menu"
                                sx={{
                                    mr: 2,
                                    display: { xs: 'flex', md: 'none' },
                                    flexGrow: 1,
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}
                            >
                                <Image
                                    src={Logo}
                                    width={140}
                                    height={50}
                                    alt="logo"
                                />
                            </Typography>
                            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

                                <Button
                                    onClick={() => handleCloseNavMenu('/employee')}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    Employee
                                </Button>
                                <Button
                                    onClick={() => handleCloseNavMenu('/about-us')}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    About us
                                </Button>
                                <Button
                                    onClick={() => handleCloseNavMenu('/blog')}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    Blog
                                </Button>
                            </Box>

                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    <MenuItem onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center" onClick={() => {
                                            dispatch(logoutAction())
                                                .then(() => router.push('/login'))
                                                .catch(() => router.push('/login'))
                                        }}>
                                            Logout</Typography>
                                    </MenuItem>
                                </Menu>
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar> : <></>
            }
        </>
    );
}
export default ResponsiveAppBar;