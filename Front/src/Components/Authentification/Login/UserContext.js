// // UserContext.js
// import React, { createContext, useContext, useState } from 'react';

// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [userName, setUserName] = useState('');

//   const updateUser = (newUserName) => {
//     setUserName(newUserName);
//   };

//   return (
//     <UserContext.Provider value={{ userName, updateUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error('useUser must be used within a UserProvider');
//   }
//   return context;
// };



import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');

  const updateUser = (name, role) => {
    setUserName(name);
    setUserRole(role);
  };

  return (
    <UserContext.Provider value={{ userName, userRole, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};



// import { createContext, useContext, useState } from 'react';
// import { useLocation } from 'react-router-dom';

// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const userName = searchParams.get('name') || '';
//   const userRole = searchParams.get('role') || '';

//   return (
//     <UserContext.Provider value={{ userName, userRole }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => {
//   return useContext(UserContext);
// };


// import { createContext, useContext } from 'react';

// const UserContext = createContext();

// export const UserProvider = ({ children, name, role }) => {
//   return (
//     <UserContext.Provider value={{ userName: name, userRole: role }}>
//       {children}
//     </UserContext.Provider>
//   );
// }

// export const useUser = () => {
//   return useContext(UserContext);
// };



// // userContext.js
// import { createContext, useContext, useState } from 'react';

// const UserContext = createContext();

// // export function UserProvider({ children }) {
// //   const [userData, setUserData] = useState({
// //     name: '',
// //     role: '',
// //   });
// export const UserProvider = ({ children }) => {
//     const userName = searchParams.get('name') || '';
//     const userRole = searchParams.get('role') || '';
// //   const setUser = (name, role) => {
// //     setUserData({
// //       name,
// //       role,
// //     });
// // };

//   return (
//     <UserContext.Provider value={{userName, userRole }}>
//       {children}
//     </UserContext.Provider>
//   );
// }

// export const useUser = () => {
//     return useContext(UserContext);
// };

// export function useUser() {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error('useUser must be used within a UserProvider');
//   }
//   return context;
// }
