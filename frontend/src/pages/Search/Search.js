import { searchPhotos, like } from '../../slices/photoSlice';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useResetComponentMessage } from '../../hooks/useResetComponentMessage';
import { useQuery } from '../../hooks/useQuery';
import './Search.css';

import LikeContainer from '../../components/LikeContainer/LikeContainer';
import PhotoItem from '../../components/PhotoItem/PhotoItem';

const Search = () => {
    const query = useQuery();
    const search = query.get('q');

    const dispatch = useDispatch();
    const resetMessage = useResetComponentMessage(dispatch, 'photo');
    const { user } = useSelector(state => state.auth);
    const { photos, loading } = useSelector(state => state.photo);

    useEffect(() => {
        dispatch(searchPhotos(search));
    }, [dispatch, search])

    const handleLike = (photo) => {
        dispatch(like(photo._id));
        resetMessage();
    }

    if (loading)
        return <p>Carregando...</p>

    return (
        <div id='search'>
            <h3>Você buscou por: {search}</h3>
            {photos && photos.map((photo) => (
                <div key={photo._id}>
                    <PhotoItem photo={photo} />
                    <LikeContainer photo={photo} user={user} handleLike={handleLike} />
                    <Link className='btn' to={`/photos/${photo._id}`}>Ver mais</Link>
                </div>
            ))}
            {photos && photos.length === 0 && (
                <h2 className='no-photos'>
                    Ainda não há fotos publicadas, <Link to={`/users/${user._id}`}>Ver perfil</Link>
                </h2>
            )}
        </div>
    )
}

export default Search