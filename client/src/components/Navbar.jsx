import { NavLink} from "react-router-dom";
const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink></li>
                <li><NavLink to="/habits" className={({ isActive }) => isActive ? "active" : ""}>Habits</NavLink></li>
                <li><NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""}>About</NavLink></li>
            </ul>
        </nav>
    );
};

export default Navbar;