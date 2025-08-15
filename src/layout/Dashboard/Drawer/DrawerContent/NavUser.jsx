import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Logout } from 'iconsax-react';
import { Tooltip, useMediaQuery } from '@mui/material';

// project import
import Avatar from 'components/@extended/Avatar';
import useAuth from 'hooks/useAuth';
import { useGetMenuMaster } from 'api/menu';

// assets
import { ArrowRight2 } from 'iconsax-react';

import avatar1 from 'assets/images/users/avatar-1.png';

import { ThemeMode } from 'config';
import { Maximize1 } from 'iconsax-react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand, faCompress, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const ExpandMore = styled(IconButton, { shouldForwardProp: (prop) => prop !== 'theme' && prop !== 'expand' && prop !== 'drawerOpen' })(
  ({ theme, expand, drawerOpen }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(-90deg)',
    marginLeft: 'auto',
    color: theme.palette.secondary.dark,
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    }),
    ...(!drawerOpen && {
      opacity: 0,
      width: 50,
      height: 50
    })
  })
);

// ==============================|| LIST - USER ||============================== //

export default function UserList() {
  const theme = useTheme();
  const navigate = useNavigate();

  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;

  const { logout, user } = useAuth();
  const handleLogout = async () => {
    try {
      await logout();
      navigate(`/login`, {
        state: {
          from: ''
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const handleToggle = useCallback(() => {
    setOpen((prevOpen) => !prevOpen);
    if (document && !document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }, []);

  // const open = Boolean(anchorEl);

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  const iconBackColorOpen = theme.palette.mode === ThemeMode.DARK ? 'background.paper' : 'secondary.200';
  const iconBackColor = theme.palette.mode === ThemeMode.DARK ? 'background.default' : 'secondary.100';
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ p: 1.25, px: !drawerOpen ? 1.25 : 3, borderTop: '2px solid ', borderTopColor: 'divider' }}>
      {!isMobile && (
        <ListItem disablePadding>
          <ListItemText
            primary={user?.name}
            sx={{ ...(!drawerOpen && { display: 'none' }) }}
            secondary={open ? 'Tam Ekrandan Çık' : 'Tam Ekran'}
          />
          <Tooltip title={open ? 'Tam Ekrandan Çık' : 'Tam Ekran'}>
            <IconButton
              color="secondary"
              variant="light"
              onClick={handleToggle}
              size="large"
              sx={{
                color: '#63C8FF',
                bgcolor: open ? iconBackColorOpen : iconBackColor,
                p: 1
              }}
            >
              <FontAwesomeIcon icon={open ? faCompress : faExpand} style={{ transition: 'transform 0.3s ease' }} />
            </IconButton>
          </Tooltip>
        </ListItem>
      )}

      <ListItem disablePadding sx={{ marginTop: 1 }}>
        <ListItemText primary={user?.name} sx={{ ...(!drawerOpen && { display: 'none' }) }} secondary="Çıkış Yap" />
        <Tooltip title="Çıkış Yap">
          <IconButton onClick={handleLogout} sx={{ p: 0 }}>
            <FontAwesomeIcon
              icon={faRightFromBracket}
              size="lg" // veya '2x', 'sm' gibi FontAwesome boyutları
              style={{ cursor: 'pointer', color: '#D84040' }}
            />
          </IconButton>
        </Tooltip>
      </ListItem>

      {/* <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ 'aria-labelledby': 'basic-button' }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <MenuItem onClick={handleLogout}>Çıkış</MenuItem>
      </Menu> */}
    </Box>
  );
}
