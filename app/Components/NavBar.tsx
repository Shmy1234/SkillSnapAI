import {Link} from 'react-router';

const NavBar = () => {
    return (
        <div className="navbar">
            <Link to = "/">
                <p className="text-2xl font-bold text-gradient">
                    AI-Resume
                </p>
            </Link>
            <Link to = "/upload">
                <p className="primary-button w-fit">
                    upload
                </p>
            </Link>
        </div>
    )
};

export default NavBar;