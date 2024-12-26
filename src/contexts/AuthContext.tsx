import React, { useState, createContext, useEffect } from "react";
import CustomModal from "../UI/CustomModal";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import ForgotPassword from "../components/auth/ForgotPassword";
import ChangePassword from "../components/auth/Change Password";

export type AuthContextType = {
  user: IUser | null;
  setUser: any;
  isAuthenticated: boolean;
  setIsAuthenticated: any;
  toggleModal: any;
  setAuthAction: any;
  updateAuthAction: any;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  toggleModal: () => {},
  setAuthAction: () => {},
  updateAuthAction: () => {},
});

export const ActionTypes = {
  Login: "login",
  Register: "register",
  ForgotPassword: "forgot-password",
  ChangePassword: "change-password",
};

export type AuthActionType = {
  action: string;
  component: React.FC;
};

export const AuthActions: AuthActionType[] = [
  {
    action: ActionTypes.Login,
    component: Login,
  },
  {
    action: ActionTypes.Register,
    component: Register,
  },
  {
    action: ActionTypes.ForgotPassword,
    component: ForgotPassword,
  },
  {
    action: ActionTypes.ChangePassword,
    component: ChangePassword,
  },
];

export type IUser = {
  _id: string;
  firstName: string;
  lastName: string;
  username?: string;
  email: string;
  isVerified?: boolean;
  intro?: string;
};

const AuthContextProvider = ({ children }: any) => {
  const [showModal, setShowModal] = useState(false);
  const [authAction, setAuthAction] = useState<AuthActionType | null>(null);
  const [user, setUser] = useState<IUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const Component = authAction?.component;

  const toggleModal = (status: boolean | null = null) => {
    setShowModal(status !== null ? status : !showModal);
  };

  const updateAuthAction = (inputAction: string) => {
    setAuthAction(
      AuthActions.find(({ action }) => action === inputAction) as AuthActionType
    );
  };

  useEffect(() => {
    if (Component && !showModal) toggleModal();
  }, [Component]);

  return (
    <>
      <AuthContext.Provider
        value={{
          user,
          setUser,
          isAuthenticated,
          setIsAuthenticated,
          toggleModal,
          setAuthAction,
          updateAuthAction,
        }}
      >
        {children}
        <CustomModal
          body={Component ? <Component /> : <></>}
          handleClose={() => setShowModal(false)}
          open={showModal}
        />
      </AuthContext.Provider>
    </>
  );
};

export default AuthContextProvider;
