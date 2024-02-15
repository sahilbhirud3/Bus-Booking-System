import PropTypes from 'prop-types';

function PersonCard({ name, role, imageSrc, linkedinLink, instagramLink }) {
  return (
    <div className="card">
      <img src={imageSrc} alt={name} />
      <h2>{name}</h2>
      <p>{role}</p>
      <div className='row justify-content-center'>  {/* used some css */}
        <a href={linkedinLink} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href={instagramLink} target="_blank" rel="noopener noreferrer">Instagram</a>
      </div>
    </div>
  );
}

PersonCard.propTypes = {
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
  linkedinLink: PropTypes.string.isRequired,
  instagramLink: PropTypes.string.isRequired,
};

export default PersonCard;
