import PropTypes from "prop-types";

function AuthContainer({ children }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      {children}
    </div>
  );
}

AuthContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContainer;
