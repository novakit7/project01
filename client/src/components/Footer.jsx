
import "../App.css";

export default function () {
  return (
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-left">
            <h2>To-Do</h2>
            <p>Stay organized, stay productive.</p>
          </div>

          <div className="footer-center">
            <a href="#">About</a>
            <a href="#">Help</a>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>

          <div className="footer-right">
            <p>Version 1.0</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 TaskFlow. All rights reserved.</p>
        </div>
      </footer>
  );
}
