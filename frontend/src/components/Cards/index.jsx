/* eslint-disable react/prop-types */
import "./styles.scss";

const Card = ({ title, icon, count }) => {
  return (
    <div className="area-card-info">
      <div className="area-card-s">
        <h5 className="info-title">{title}</h5>
        <div className="info-value">{count}</div>
      </div>
      <p className="info-icon">{icon}</p>
    </div>
  );
};

export default Card;
