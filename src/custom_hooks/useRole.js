import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const LOGIN_URL = "http://128.199.16.179:8000/api/auth/login";

const useRole = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Login failed");
      }

      const data = await response.json();
      const token = data.access_token;

      setAccessToken(token);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!accessToken) return;

    try {
      const decoded = jwtDecode(accessToken);
      setRole(decoded.role); 
    } catch (err) {
      setError("Invalid token");
      setRole(null);
    }
  }, [accessToken]);

  return {
    login,
    accessToken,
    role,
    loading,
    error,
  };
};

export default useRole;
