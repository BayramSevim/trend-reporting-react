import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';

// project-imports

import MobileSection from './MobileSection';
import FullScreen from './FullScreen';
import Grid from '@mui/system/Unstable_Grid/Grid';
import IconButton from 'components/@extended/IconButton';
import { Logout } from 'iconsax-react';

import { MenuOrientation } from 'config';
import useConfig from 'hooks/useConfig';
import DrawerHeader from 'layout/Dashboard/Drawer/DrawerHeader';
import useAuth from 'hooks/useAuth';
import { useNavigate } from 'react-router';
import { Tooltip } from '@mui/material';

// ==============================|| HEADER - CONTENT ||============================== //

export default function HeaderContent() {
  const navigate = useNavigate();
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

  const { menuOrientation } = useConfig();

  const downLG = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <>
      {menuOrientation === MenuOrientation.HORIZONTAL && !downLG && <DrawerHeader open={true} />}
      {/* {!downLG && <Search />} */}
      {downLG && <Box sx={{ width: '100%', ml: 1 }} />}

      {/* <Notification /> */}
      <FullScreen />
      {/* <Message /> */}
      <Grid item display={'none'}>
        <Tooltip title={'Çıkış Yap'}>
          <IconButton size="large" color="error" sx={{ p: 1 }} onClick={handleLogout}>
            <Logout variant="Bulk" />
          </IconButton>
        </Tooltip>
      </Grid>
      {/* {!downLG && <Profile />} */}
      {/* {downLG && <MobileSection />} */}
    </>
  );
}
