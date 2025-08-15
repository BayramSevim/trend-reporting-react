import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import MasterDetail from '../../components/MasterDetail/User/MasterDetail';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import MainCard from 'components/MainCard';
import decodeAndDecompressData from 'api/decompressedData';
import { GetAPIUrl } from 'api/gama';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { AddSquare, CloseCircle, Export, Magicpen, Send, TickCircle } from 'iconsax-react';
import UserAddModal from 'components/Modal/UserAddModal';
import UserUpdateModal from 'components/Modal/UserUpdateModal';

const UserPage = () => {
  const [user, setUser] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);
  const [isUpdate, setIsUodate] = useState(false);
  const [openUserAddModal, setOpenUserAddModal] = useState(false);
  const [openUserUpdateModal, setOpenUserUpdateModal] = useState(false);
  const oneDayAgo = new Date();
  oneDayAgo.setDate(oneDayAgo.getDate() - 1);

  const fetchData = async () => {
    await axios.get(`${GetAPIUrl()}/api/Authentication/GetReportUserList`).then((res) => {
      const data = decodeAndDecompressData(res.data);
      setUser(data);
      setIsUodate(!isUpdate);
    });
  };
  const toastMessage = (message, type) => {
    if (type === 1) toast.success(message);
    else if (type === 2) toast.error(message);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const base64data = localStorage.getItem('loginnedUser');
  const userData = base64data.replace(/"/g, '');
  const decompressUserData = decodeAndDecompressData(userData);
  const loginUser = decompressUserData.UserName.toUpperCase();

  return (
    <>
      <ToastContainer theme="dark" />
      <Grid
        container
        style={{ height: 'auto' }}
        display="flex"
        justifyContent="space-between" // İki öğeyi sol ve sağa yayar
        alignItems="center" // Dikeyde ortalar
        mb={2}
      >
        <Grid item height={200} display={'flex'} alignItems={'center'}>
          <Typography variant="h1" sx={{ fontWeight: '800' }}>
            Kullanıcı Listesi
          </Typography>
        </Grid>
        <Grid item display="flex" gap={2} alignItems="center" ml="auto" sx={{ visibility: loginUser === 'ADMIN' ? 'visible' : 'hidden' }}>
          {selectedRow && Object.keys(selectedRow).length > 0 && (
            <Button
              variant="contained"
              color="secondary"
              startIcon={<Magicpen variant="Bold" size={32} />}
              onClick={() => setOpenUserUpdateModal(true)}
              sx={{ width: 300, fontWeight: 'bold' }}
            >
              Kullanıcı Güncelle
            </Button>
          )}

          <Button
            variant="contained"
            color="warning"
            startIcon={<AddSquare variant="Bold" size={32} />}
            onClick={() => setOpenUserAddModal(true)}
            sx={{ width: 300, fontWeight: 'bold' }}
          >
            Kullanıcı Ekle
          </Button>
        </Grid>
      </Grid>
      <MainCard>
        {/* <MasterDetail user={user} isUpdate={isUpdate} /> */}
        <TableContainer component={Paper} sx={{ maxHeight: 350 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ textAlign: 'center', width: 400 }}>Kullanıcı Adı</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>Şifre</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>Aktif</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(user) &&
                user.map((user, index) => {
                  return (
                    <TableRow
                      key={index}
                      sx={{
                        cursor: 'pointer',
                        border: selectedRow.Id === user.Id ? '2px solid #1976d2' : 'none'
                      }}
                      onClick={() => {
                        setSelectedRow(user);
                      }}
                    >
                      <TableCell sx={{ textAlign: 'center' }}>{user.UserName}</TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>{user.Password}</TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>
                        {user.IsActive ? <TickCircle size={25} color="lime" /> : <CloseCircle size={25} color="red" />}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </MainCard>

      {openUserAddModal && (
        <UserAddModal
          openModal={openUserAddModal}
          setOpenModal={setOpenUserAddModal}
          selectUser={selectedRow}
          refreshTable={fetchData}
          toastMessage={toastMessage}
        />
      )}
      {openUserUpdateModal && (
        <UserUpdateModal
          openModal={openUserUpdateModal}
          setOpenModal={setOpenUserUpdateModal}
          selectUser={selectedRow}
          refreshTable={fetchData}
          toastMessage={toastMessage}
        />
      )}
    </>
  );
};

export default UserPage;
