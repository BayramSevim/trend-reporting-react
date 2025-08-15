// import { createContext, useEffect, useReducer } from 'react';

// // third-party
// import { Chance } from 'chance';
// import { jwtDecode } from 'jwt-decode';

// // reducer - state management
// import { LOGIN, LOGOUT } from 'store/reducers/actions';
// import authReducer from 'store/reducers/auth';
// import { GetAPIUrl } from 'api/gama';

// // project-imports
// import Loader from 'components/Loader';
// import axios from 'utils/axios';

// const chance = new Chance();

// // constant
// const initialState = {
//   isLoggedIn: false,
//   isInitialized: false,
//   user: null
// };

// const verifyToken = (serviceToken) => {
//   return true;
//   // if (!serviceToken) {
//   //   return false;
//   // }
//   // const decoded = jwtDecode(serviceToken);

//   // /**
//   //  * Property 'exp' does not exist on type '<T = unknown>(token: string, options?: JwtDecodeOptions | undefined) => T'.
//   //  */
//   // return decoded.exp > Date.now() / 1000;
// };

// const setSession = (serviceToken) => {
//   if (serviceToken) {
//     localStorage.setItem('serviceToken', serviceToken);
//     axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
//   } else {
//     localStorage.removeItem('serviceToken');
//     delete axios.defaults.headers.common.Authorization;
//   }
// };

// // ==============================|| JWT CONTEXT & PROVIDER ||============================== //

// const JWTContext = createContext(null);

// export const JWTProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(authReducer, initialState);

//   useEffect(() => {
//     const init = async () => {
//       try {
//         const serviceToken = localStorage.getItem('serviceToken');
//         if (serviceToken && verifyToken(serviceToken)) {
//           setSession(serviceToken);
//           const response = localStorage.getItem('loginnedUser'); //await axios.get('/api/account/me');
//           const { user } = response;

//           dispatch({
//             type: LOGIN,
//             payload: {
//               isLoggedIn: true,
//               user
//             }
//           });
//         } else {
//           dispatch({
//             type: LOGOUT
//           });
//         }
//       } catch (err) {
//         console.error(err);
//         dispatch({
//           type: LOGOUT
//         });
//       }
//     };

//     init();
//   }, []);

//   const login = async (userName, password) => {
//     // debugger;
//     const response = await axios.get(`${GetAPIUrl()}/api/Gama/WDLogin`, {
//       params: {
//         uName: userName,
//         uPass: password
//       }
//     });
//     const { user } = response.data;
//     localStorage.setItem('loginnedUser', response.data);
//     const serviceToken = 'bayram';
//     setSession(serviceToken);
//     dispatch({
//       type: LOGIN,
//       payload: {
//         isLoggedIn: true,
//         user
//       }
//     });
//     return response;
//   };

//   const register = async (email, password, firstName, lastName) => {
//     // todo: this flow need to be recode as it not verified
//     const id = chance.bb_pin();
//     const response = await axios.post('/api/account/register', {
//       id,
//       email,
//       password,
//       firstName,
//       lastName
//     });
//     let users = response.data;

//     if (window.localStorage.getItem('users') !== undefined && window.localStorage.getItem('users') !== null) {
//       const localUsers = window.localStorage.getItem('users');
//       users = [
//         ...JSON.parse(localUsers),
//         {
//           id,
//           email,
//           password,
//           name: `${firstName} ${lastName}`
//         }
//       ];
//     }

//     window.localStorage.setItem('users', JSON.stringify(users));
//   };

//   const logout = () => {
//     setSession(null);
//     dispatch({ type: LOGOUT });
//   };

//   const resetPassword = async (email) => {
//     console.log('email - ', email);
//   };

//   const updateProfile = () => {};

//   if (state.isInitialized !== undefined && !state.isInitialized) {
//     return <Loader />;
//   }

//   return <JWTContext.Provider value={{ ...state, login, logout, register, resetPassword, updateProfile }}>{children}</JWTContext.Provider>;
// };

// export default JWTContext;

import { createContext, useEffect, useState, useReducer } from 'react';

// third-party
import { Chance } from 'chance';
import { jwtDecode } from 'jwt-decode';

// reducer - state management
import { LOGIN, LOGOUT } from 'store/reducers/actions';
import authReducer from 'store/reducers/auth';
import { GetAPIUrl } from 'api/gama';
import decompressedData from 'api/decompressedData';

// project-imports
import Loader from 'components/Loader';
import axios from 'utils/axios';

const chance = new Chance();

// constant
const initialState = {
  isLoggedIn: false,
  isInitialized: false,
  user: null
};

const verifyToken = (serviceToken) => {
  // return true;
  if (!serviceToken) {
    return false;
  }
  const tokenData = sessionStorage.getItem('tokenData');
  if (!tokenData) {
    return false;
  }
  const decoded = JSON.parse(sessionStorage.getItem('tokenData')); // LoginnedUser'ı çözümle

  /**
   * Property 'exp' does not exist on type '<T = unknown>(token: string, options?: JwtDecodeOptions | undefined) => T'.
   */
  const currentTime = Date.now() / 1000; // Mevcut zaman (saniye cinsinden)
  const tokenExpirationTime = decoded.iat + 3600; // 1 saat sonra token süresi dolacak

  return currentTime < tokenExpirationTime;
};

const setSession = (serviceToken) => {
  if (serviceToken) {
    localStorage.setItem('serviceToken', serviceToken);
    axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
  } else {
    localStorage.removeItem('serviceToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //

const JWTContext = createContext(null);

export const JWTProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [isLoginError, setIsLoginError] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const serviceToken = localStorage.getItem('serviceToken');
        if (serviceToken && verifyToken(serviceToken)) {
          setSession(serviceToken);
          // const response = localStorage.getItem('loginnedUser');  // BURAYI KAPATTIM
          const storedUser = JSON.parse(localStorage.getItem('loginnedUser'));
          const { user } = storedUser; // burada response vardı şimdi storedUser var

          dispatch({
            type: LOGIN,
            payload: {
              isLoggedIn: true,
              user
            }
          });
        } else {
          dispatch({
            type: LOGOUT
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: LOGOUT
        });
      }
    };

    init();
  }, []);

  // const login = async (userName, password) => {
  //   await axios
  //     .get(`${GetAPIUrl()}/api/Gama/WDLogin`, {
  //       params: {
  //         uName: userName,
  //         uPass: password
  //       }
  //     })
  //     .then((response) => {
  //       const userData = decompressedData(response.data);
  //       if (userData.UserName == userName && userData.Password === password) {
  //         const tokenData = {
  //           ...userData,
  //           iat: Math.floor(Date.now() / 1000) // Şu anki zamanı 'iat' olarak ekle
  //         };

  //         sessionStorage.setItem('tokenData', JSON.stringify(tokenData));

  //         const { user } = userData;
  //         // localStorage.setItem('loginnedUser', response.data);   // BURAYI KAPATTIM
  //         localStorage.setItem('loginnedUser', JSON.stringify(response.data));
  //         const serviceToken = 'gama';
  //         setSession(serviceToken);
  //         dispatch({
  //           type: LOGIN,
  //           payload: {
  //             isLoggedIn: true,
  //             user
  //           }
  //         });
  //         setIsLoginError(false);
  //       } else {
  //         setIsLoginError(true); // Hatalı login'de true yap
  //       }
  //       return response;
  //     })
  //     .catch((err) => {
  //       console.log('JWT CONTEXT LOGIN', err);
  //       setIsLoginError(true);
  //     });
  // };

  const login = async (userName, password) => {
    // Eğer kullanıcı adı "admin" ve şifre "123456" ise doğrudan login yap
    if (userName === 'admin' && password === '123456') {
      const fakeUser = {
        UserName: 'admin',
        Password: '123456',
        user: {
          name: 'Admin User',
          email: 'admin@example.com',
          role: 'admin'
        },
        iat: Math.floor(Date.now() / 1000)
      };

      sessionStorage.setItem('tokenData', JSON.stringify(fakeUser));
      localStorage.setItem('loginnedUser', JSON.stringify({ user: fakeUser.user }));

      const serviceToken = 'gama';
      setSession(serviceToken);

      dispatch({
        type: LOGIN,
        payload: {
          isLoggedIn: true,
          user: fakeUser.user
        }
      });

      setIsLoginError(false);
      return; // API çağrısını atla
    }

    // Normal API login işlemi
    await axios
      .get(`${GetAPIUrl()}/api/Gama/WDLogin`, {
        params: {
          uName: userName,
          uPass: password
        }
      })
      .then((response) => {
        const userData = decompressedData(response.data);
        if (userData.UserName === userName && userData.Password === password) {
          const tokenData = {
            ...userData,
            iat: Math.floor(Date.now() / 1000)
          };

          sessionStorage.setItem('tokenData', JSON.stringify(tokenData));
          localStorage.setItem('loginnedUser', JSON.stringify(response.data));

          const { user } = userData;
          const serviceToken = 'gama';
          setSession(serviceToken);

          dispatch({
            type: LOGIN,
            payload: {
              isLoggedIn: true,
              user
            }
          });

          setIsLoginError(false);
        } else {
          setIsLoginError(true);
        }
        return response;
      })
      .catch((err) => {
        console.log('JWT CONTEXT LOGIN', err);
        setIsLoginError(true);
      });
  };

  const register = async (email, password, firstName, lastName) => {
    // todo: this flow need to be recode as it not verified
    const id = chance.bb_pin();
    const response = await axios.post('/api/account/register', {
      id,
      email,
      password,
      firstName,
      lastName
    });
    let users = response.data;

    if (window.localStorage.getItem('users') !== undefined && window.localStorage.getItem('users') !== null) {
      const localUsers = window.localStorage.getItem('users');
      users = [
        ...JSON.parse(localUsers),
        {
          id,
          email,
          password,
          name: `${firstName} ${lastName}`
        }
      ];
    }

    window.localStorage.setItem('users', JSON.stringify(users));
  };

  const logout = () => {
    setSession(null);
    dispatch({ type: LOGOUT });
  };

  const resetPassword = async (email) => {
    console.log('email - ', email);
  };

  const updateProfile = () => {};

  if (state.isInitialized !== undefined && !state.isInitialized) {
    return <Loader />;
  }

  return (
    <JWTContext.Provider value={{ ...state, login, logout, register, resetPassword, updateProfile, isLoginError }}>
      {children}
    </JWTContext.Provider>
  );
};

export default JWTContext;
