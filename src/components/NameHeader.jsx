import PropTypes from "prop-types";

function NameHeader({ name }) {
  return (
    <div>
      <h1>{name} &lt;3 &lt;3 &lt;3</h1>
    </div>
  );
}

export default NameHeader;

NameHeader.propTypes = {
  name: PropTypes.string.isRequired,
};