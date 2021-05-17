
import {Link} from 'react-router-dom'


const Footer = () => {
    return (
        <footer>
            <p>Copyright &copy; 2021</p>
            <small>Version 1.0.0</small><br />
            <Link to="/about">About the app</Link>
        </footer>
    )
}

export default Footer
