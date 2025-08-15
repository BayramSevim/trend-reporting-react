import React, { useCallback, useState } from 'react';
import { Form, Item } from 'devextreme-react/form';
import UserHistory from './UserHistory';
import { Button } from '@mui/material';
import { Grid } from '@mui/material';
import { Dialog, DialogContent, DialogTitle, TextField, Switch, FormControlLabel } from '@mui/material';
import { Autocomplete } from '@mui/material';
import axios from 'axios';
import { GetAPIUrl } from 'api/gama';
import decodeAndDecompressData from 'api/decompressedData';

const OrdersTab = (props) => {
  // modal

  const [openUserUpdate, setOpenUserUpdate] = useState(false);
  const [openActiveUser, setOpenActiveUser] = useState(false);
  const [openYetki, setOpenYetki] = useState(false);

  // component
  const [selectActive, setSelectActive] = useState(false);
  const [userId, setUserId] = useState(0);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isActive, setIsActive] = useState(null);

  // yetki
  const [dashboard, setDashboard] = useState(false);
  const [kullanicilar, setKullanicilar] = useState(false);
  const [raporlar, setRaporlar] = useState(false);
  const [rasyonAktarim, setRasyonAktarim] = useState(false);
  const [malzemeTanimlari, setMalzemeTanimlari] = useState(false);
  const [label, setLabel] = useState(false);

  const active = [
    { name: 'Aktif', value: true },
    { name: 'Pasif', value: false }
  ];
  const renderOrderHistory = useCallback(() => <UserHistory userId={props.id} />, [props.id]);

  const getUserByUserId = async () => {
    await axios.get(`${GetAPIUrl()}/api/Authentication/GetReportUserList`).then((res) => {
      if (res.data) {
        const data = decodeAndDecompressData(res.data);
        const findUser = data.find((user) => user.Id === props.id.Id);
        if (findUser) {
          setOpenUserUpdate(true);
          setUserName(findUser.UserName);
          setPassword(findUser.Password);
          setUserId(findUser.Id);
          setIsActive(active.find((status) => status.value === findUser.IsActive));
        }
      }
    });
  };

  const getUserAuth = async () => {
    setOpenYetki(true);
    // Burada Hangi Kullanıcı Olduğunu Buluyoruz
    let userId = 0;
    await axios.get(`${GetAPIUrl()}/api/Authentication/GetReportUserList`).then((res) => {
      if (res.data) {
        const data = decodeAndDecompressData(res.data);
        const findUser = data.find((user) => user.Id === props.id.Id);
        if (findUser) {
          userId = findUser.Id;
        }
      }
    });

    // Burası Göstermek İçin
    await axios
      .get(`${GetAPIUrl()}/api/Authentication/GetReportUserAuthByUserId`, {
        params: {
          userId: userId
        }
      })
      .then((res) => {
        const data = decodeAndDecompressData(res.data);
        console.log(data);
        data.map((auth) => {
          if (auth.AuthName === 'Dashboard' && auth.Auth) {
            setDashboard(true);
          }
          if (auth.AuthName === 'Kullanıcılar' && auth.Auth) {
            setKullanicilar(true);
          }
          if (auth.AuthName === 'Raporlar' && auth.Auth) {
            setRaporlar(true);
          }
          if (auth.AuthName === 'Rasyon Aktarım' && auth.Auth) {
            setRasyonAktarim(true);
          }
          if (auth.AuthName === 'Malzeme Tanımları' && auth.Auth) {
            setMalzemeTanimlari(true);
          }
          if (auth.AuthName === 'Label' && auth.Auth) {
            setLabel(true);
          }
        });
      });
  };

  const updateUser = async () => {
    await axios.post(
      `${GetAPIUrl()}/api/Authentication/UpdateReportUser?uName=${userName}&uPass=${password}&id=${userId}&isActive=${selectActive}`
    );
    await getUserByUserId();
    setOpenUserUpdate(false);
  };

  const updateUserActive = async () => {
    let userId = 0;
    let userName = '';
    let password = '';
    await axios.get(`${GetAPIUrl()}/api/Authentication/GetReportUserList`).then((res) => {
      const data = decodeAndDecompressData(res.data);
      if (data) {
        const findUser = data.find((user) => user.Id === props.id.Id);
        if (findUser) {
          userId = findUser.Id;
          userName = findUser.UserName;
          password = findUser.Password;
        }
      }
    });

    await axios.post(`${GetAPIUrl()}/api/Authentication/UpdateReportUser?uName=${userName}&uPass=${password}&id=${userId}&isActive=false`);
    setOpenActiveUser(false);
  };

  const updateUserAuth = async (userId) => {
    await axios.post(`${GetAPIUrl()}/api/Authentication/InsertReportUserAuth?userId=${userId}&authId=1`);
  };

  return (
    <>
      <Form labelLocation="top" className="form-container">
        <Item render={renderOrderHistory} />
      </Form>
      <Grid container>
        <Grid item mr={0.5}>
          <Button variant="contained" color="success" onClick={() => getUserByUserId()} sx={{ borderRadius: '20px' }}>
            Kullanıcı Düzenle
          </Button>
        </Grid>
        <Grid item mr={0.5}>
          <Button variant="contained" color="primary" onClick={() => setOpenActiveUser(true)} sx={{ borderRadius: '20px' }}>
            Aktif / Deaktif Et
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={() => getUserAuth()} color="warning" sx={{ borderRadius: '20px' }}>
            Yetki Düzenle
          </Button>
        </Grid>
      </Grid>

      {/* Kullanıcı Düzenle Modalı*/}
      <Dialog open={openUserUpdate} onClose={() => setOpenUserUpdate(false)}>
        <DialogTitle sx={{ backgroundColor: '#2e7d32 ', color: 'white' }}>Kullanıcı Düzenle</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            label="Kullanıcı Adı"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Şifre"
            type="text"
            fullWidth
            variant="standard"
          />
          <Autocomplete
            sx={{ marginTop: 2 }}
            value={isActive}
            options={active}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => <TextField {...params} label="Aktiflik Durumu" variant="outlined" />}
            onChange={(event, newValue) => {
              setSelectActive(newValue.value);
            }}
          />
          <Button variant="contained" color="success" onClick={() => updateUser()} sx={{ borderRadius: '20px', width: '100%', mt: 2 }}>
            Kullanıcıyı Düzenle
          </Button>
        </DialogContent>
      </Dialog>

      {/* Aktif / Deaktif Etme Modalı */}
      <Dialog open={openActiveUser} onClose={() => setOpenActiveUser(false)}>
        <DialogTitle sx={{ backgroundColor: '#1976d2', color: 'white' }}>Aktiflik Durumu Değiştirme İşlemi</DialogTitle>
        <DialogContent>
          <DialogContent>Seçilen kullanıcının aktiflik durumunu değiştirmek istediğine emin misiniz?</DialogContent>
          <Grid container display={'flex'} justifyContent={'center'} columnSpacing={2.5}>
            <Grid item>
              <Button
                sx={{ width: '100%', marginTop: 1, borderRadius: '20px' }}
                onClick={() => updateUserActive()}
                variant="contained"
                color="primary"
              >
                Değiştir
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="error"
                sx={{ width: '100%', marginTop: 1, borderRadius: '20px' }}
                onClick={() => setOpenActiveUser(false)}
              >
                Vazgeç
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>

      {/* Yetki Modalı */}
      <Dialog open={openYetki} onClose={() => setOpenYetki(false)}>
        <DialogTitle sx={{ backgroundColor: '#ed6c02 ', color: 'white' }}>Aktiflik Durumu Değiştirme İşlemi</DialogTitle>
        <DialogContent>
          <Grid>
            <Grid>
              <FormControlLabel
                control={<Switch checked={dashboard} onChange={(event) => setDashboard(event.target.checked)} color="warning" />}
                label={`Dashboard`}
              />
            </Grid>
            <Grid>
              <FormControlLabel
                control={<Switch checked={kullanicilar} onChange={(event) => setKullanicilar(event.target.checked)} color="warning" />}
                label={`Kullanıcılar`}
              />
            </Grid>
            <Grid>
              <FormControlLabel
                control={<Switch checked={raporlar} onChange={(event) => setRaporlar(event.target.checked)} color="warning" />}
                label={`Raporlar`}
              />
            </Grid>
            <Grid>
              <FormControlLabel
                control={<Switch checked={rasyonAktarim} onChange={(event) => setRasyonAktarim(event.target.checked)} color="warning" />}
                label={`Rasyon Aktarım`}
              />
            </Grid>
            <Grid>
              <FormControlLabel
                control={
                  <Switch checked={malzemeTanimlari} onChange={(event) => setMalzemeTanimlari(event.target.checked)} color="warning" />
                }
                label={`Malzeme Tanımları`}
              />
            </Grid>
            <Grid>
              <FormControlLabel
                control={<Switch checked={label} onChange={(event) => setLabel(event.target.checked)} color="warning" />}
                label={`Label`}
              />
            </Grid>
          </Grid>

          <Button
            sx={{ width: '100%', marginTop: 3, borderRadius: '20px' }}
            onClick={() => updateUserActive()}
            variant="contained"
            color="warning"
          >
            Değiştir
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OrdersTab;
