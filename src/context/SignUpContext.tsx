import React, { createContext, useContext, useState } from 'react';

interface SignUpData {
  name: string;
  email: string;
  password: string;
  otp: number;
}
interface SignUpProviderProps {
  children: React.ReactNode;
}
interface SignUpContextType {
  signUpData: SignUpData | null;
  setSignUpData: React.Dispatch<React.SetStateAction<SignUpData | null>>;
}

const SignUpContext = createContext<SignUpContextType | undefined>(undefined);

export const SignUpProvider: React.FC<SignUpProviderProps> = ({ children }) => {
  const [signUpData, setSignUpData] = useState<SignUpData | null>(null);

  return <SignUpContext.Provider value={{ signUpData, setSignUpData }}>{children}</SignUpContext.Provider>;
};

export const useSignUp = () => {
  const context = useContext(SignUpContext);
  if (context === undefined) {
    throw new Error('useSignUp must be used within a SignUpProvider');
  }
  return context;
};
