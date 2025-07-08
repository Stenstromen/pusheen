import PropTypes from "prop-types";

function FamRole({ role }) {
  return (
    <p
      style={{
        fontSize: "19px",
        fontWeight: "bold",
      }}
    >
      {role}
    </p>
  );
}

export default FamRole;

FamRole.propTypes = {
  role: PropTypes.string.isRequired,
};