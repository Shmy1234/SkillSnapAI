import {Link} from "react-router";

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link to="/dashboard">
                <p className="text-2xl font-bold text-gradient text-center sm:text-left">SkillSnap.ai</p>
            </Link>
            <Link to="/upload" className="primary-button w-full sm:w-fit text-center">
                Upload Resume
            </Link>
        </nav>
    )
}
export default Navbar
