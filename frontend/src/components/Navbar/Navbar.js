import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { BsSearch, BsHouseDoorFill, BsFillPersonFill, BsFillCameraFill } from 'react-icons/bs';
import './Navbar.css';
import { logout, reset } from '../../slices/authSlice';


const Navbar = () => {
    const { auth } = useAuth();
    const { user } = useSelector(state => state.auth);
    const [query, setQuery] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSearch = (e) => {
        e.preventDefault();

        if(query)
            return navigate(`/search?q=${query}`)
    }

    const handleLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/login');
    }

    return (
        <nav id='nav'>
            <Link to='/'>ReactGram</Link>
            <form id='search-form' onSubmit={handleSearch}>
                <BsSearch />
                <input
                    type="text"
                    placeholder='pesquisar'
                    value={query || ''}
                    onChange={e => setQuery(e.target.value)}
                />
            </form>
            <ul id="nav-links">
                {auth ? (
                    <>
                        <li>
                            <Link to='/'>
                                <BsHouseDoorFill />
                            </Link>
                        </li>
                        {user && (
                            <li>
                                <Link to={`/users/${user._id}`}>
                                    <BsFillCameraFill />
                                </Link>
                            </li>
                        )}
                        <li>
                            <Link to='/profile'>
                                <BsFillPersonFill />
                            </Link>
                        </li>
                        <li>
                            <span onClick={handleLogout}>Sair</span>
                        </li>
                    </>
                ) : (
                    <>
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
                    </>
                )}
            </ul>
        </nav>
    )
}

export default Navbar