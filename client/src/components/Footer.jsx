import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";

function Footer() {
    return (
        <footer>
            <h3>Curated Crates©</h3>
            <p>
                <ul>
                    <a href="https://facebook.com">
                    <li className='logo'><FaFacebookSquare /></li>
                    </a>
                </ul>
                <ul>
                    <a href="https://instagram.com">
                    <li className='logo'><FaSquareInstagram /></li>
                    </a>
                </ul>
            </p>
        </footer>
    )
}

export default Footer;