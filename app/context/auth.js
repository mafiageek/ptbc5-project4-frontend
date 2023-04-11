import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";
import { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    userid: null,
    name: null,
    email: null,
    token: "",
  });

  const key = "authToken";
  //axios config
  // axios.defaults.baseURL = process.env.BASE_URL;
  axios.defaults.headers.common["Authorization"] = auth?.token;

  const getToken = async () => {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      console.log("Error getting the auth token", error);
    }
  };

  useEffect(() => {
    const data = getToken();
    if (data) {
      const decoded = jwtDecode(data);
      setAuth({
        ...auth,
        userid: decoded._id,
        name: decoded.name,
        email: decoded.email,
        token: data,
      });

      console.log("auth =>", auth);
    }
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
