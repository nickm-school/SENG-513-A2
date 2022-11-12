import './index.css';
import { Link } from "react-router-dom";

function Landing() {
    return (
        <div className="Landing">
            <h1>Dots & Boxes</h1>
            <Link to="/SENG-513-A2/game" class="start-button">Start Game!</Link>
        </div>
    );
}

export default Landing;