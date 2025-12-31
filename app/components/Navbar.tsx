import {Link} from "react-router";

const Navbar = () => {
    return (
        <div className="w-full px-4 sm:px-6">
            <nav className="navbar">
                <Link to="/dashboard">
                    <p className="text-2xl font-bold text-gradient text-center sm:text-left">SkillSnap.ai</p>
                </Link>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <Link to="/upload" className="primary-button w-full sm:w-fit text-center">
                        Upload Resume
                    </Link>
                </div>
            </nav>
        </div>
    )
}
export default Navbar
