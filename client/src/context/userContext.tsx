// import React, { createContext, useState, useContext, ReactNode } from 'react';

// // Define the user type/interface (optional, but useful for TypeScript)
// interface User {
//   id: string;
//   name?: string;
//   email: string;
//   role: string;
// }

// // Define the context type that includes both user and updateUser function
// interface UserContextType {
//   user: User | null;
//   updateUser: (userData: User) => void;
// }

// // Create a context with an initial undefined state
// const UserContext = createContext<UserContextType | undefined>(undefined);

// // Create a type for the provider props
// interface UserProviderProps {
//   children: ReactNode;
// }

// // Create the provider component
// export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);

//   // Function to set user details (to be called after fetching data)
//   const updateUser = (userData: User) => {
//     setUser(userData);
//   };

//   return (
//     <UserContext.Provider value={{ user, updateUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// // Create a custom hook for easier use
// export const useUser = () => {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error('useUser must be used within a UserProvider');
//   }
//   return context;
// };
