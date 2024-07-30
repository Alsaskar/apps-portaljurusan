import { FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./style.scss";

const LupaPassword = () => {
  return (
    <div className="lupa-password">
      <div className="lupa-password-container">
        <div className="bg-satu-lupa-password">
          <div className="bg-dua-lupa-password">
            <div className="icon-lock-lupa-password">
              <FaLock size={22} />
            </div>
          </div>
        </div>
        <h2 className="lupa-password-title">Forgot Password</h2>
        <p className="lupa-password-desc">Masukan email anda untuk mendapatkan password</p>
        <form className="login-form-lupa-password">
          <div className="form-group">
            <input type="email" id="email" name="email" placeholder="Enter your email" />
          </div>
          <div className="login-button">
            <button type="submit" className="button-confirm-lupa-password">Confirm</button>
          </div>
        </form>
        <Link to="/" className="login-link" >Login</Link>
      </div>
    </div>
  );
};

export default LupaPassword;
