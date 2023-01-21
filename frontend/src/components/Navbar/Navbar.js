import './Navbar.css';

import { Link } from 'react-router-dom';
import { BsSearch, BsHouseDoorFill, BsFillPersonFill, BsFillCameraFill } from 'react-icons/bs';

const Navbar = () => (
    <nav id='nav'>
        <Link to='/'>ReactGram</Link>
        <form id='search-form'>
            <BsSearch />
            <input type="text" placeholder='pesquisar' />
        </form>
        <ul id="nav-links">
            <li>
                <Link to='/'>
                    <BsHouseDoorFill />
                </Link>
            </li>
            <li>
                <Link to='/login'>
                    Entrar
                </Link>
            </li>
            <li>
                <Link to='/register'>
                    Cadastrar
                </Link>
            </li>
        </ul>
    </nav>
)

export default Navbar