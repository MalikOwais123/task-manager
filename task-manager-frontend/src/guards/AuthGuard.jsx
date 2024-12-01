import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AuthGuard({ children }) {
  const navigate = useNavigate();

  const [checked, setChecked] = useState(false);

  const check = useCallback(() => {
    const authenticated = !!localStorage.getItem("token");
    if (!authenticated) {
      navigate("/login");
    } else {
      setChecked(true);
    }
  }, [navigate]);

  useEffect(() => {
    check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!checked) {
    return null;
  }

  return <>{children}</>;
}

AuthGuard.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthGuard;
