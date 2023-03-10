import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useResetComponentMessage } from '../../hooks/useResetComponentMessage';
import { BsFillEyeFill, BsPencilFill, BsXLg } from 'react-icons/bs';
import { Link, useParams } from 'react-router-dom';
import { getUserDetails } from '../../slices/userSlice';
import { uploads } from '../../utils/config';
import { publishPhoto, getUserPhotos, deletePhoto, updatePhoto } from '../../slices/photoSlice';
import './Profile.css';

import Message from '../../components/Message/Message';

const Profile = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const resetComponentMessage = useResetComponentMessage(dispatch, 'photo');
    const { user, loading } = useSelector(state => state.user);
    const { user: userAuth } = useSelector(state => state.auth);
    const { photos, loading: loadingPhoto, message: messagePhoto, error: errorPhoto } = useSelector(state => state.photo);

    const newPhotoForm = useRef();
    const editPhotoForm = useRef();

    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');

    const [editId, setEditId] = useState('');
    const [editImage, setEditImage] = useState('');
    const [editTitle, setEditTitle] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const photoData = {
            title,
            image
        }

        const formData = new FormData();
        Object.keys(photoData).forEach(key => formData.append(key, photoData[key]));

        dispatch(publishPhoto(formData));
        resetComponentMessage();
    }

    const handleFile = (e) => {
        const image = e.target.files[0];
        setImage(image);
    }

    const handleDelete = (id) => {
        dispatch(deletePhoto(id));
        resetComponentMessage();
    }

    const hideOrShowForms = () => {
        newPhotoForm.current.classList.toggle('hide');
        editPhotoForm.current.classList.toggle('hide');
    }

    const handleUpdate = (e) => {
        e.preventDefault();

        const photoData = {
            title: editTitle,
            id: editId
        }

        dispatch(updatePhoto(photoData));
        resetComponentMessage();
    }

    const handleEdit = (photo) => {
        if (editPhotoForm.current.classList.contains('hide'))
            hideOrShowForms();

        setEditId(photo._id);
        setEditTitle(photo.title);
        setEditImage(photo.image);
    }

    const handleCancelEdit = (e) => {
        hideOrShowForms();
    }

    useEffect(() => {
        dispatch(getUserDetails(id));
        dispatch(getUserPhotos(id));
    }, [dispatch, id]);

    if (loading)
        return <p>Carregando...</p>

    return (
        <div id='profile'>
            <div className="profile-header">
                {user.profileImage && (
                    <img src={`${uploads}/users/${user.profileImage}`} alt={user.name} />
                )}
                <div className="profile-description">
                    <h2>{user.name}</h2>
                    <p>{user.bio}</p>
                </div>
            </div>
            {id === userAuth._id && (
                <>
                    <div className='new-photo' ref={newPhotoForm}>
                        <h3>Compartilhe algum momento seu:</h3>
                        <form onSubmit={handleSubmit}>
                            <label>
                                <span>T??tulo para a foto:</span>
                                <input
                                    type="text"
                                    placeholder='Insira um t??tulo'
                                    value={title || ''}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </label>
                            <label>
                                <span>Imagem:</span>
                                <input
                                    type="file"
                                    onChange={handleFile}
                                />
                            </label>
                            <input
                                type="submit"
                                value={loadingPhoto ? 'Aguarde...' : 'Postar'}
                                disabled={loadingPhoto}
                            />
                        </form>
                    </div>
                    <div className='edit-photo hide' ref={editPhotoForm}>
                        <p>Editando...</p>
                        {editImage && (
                            <img src={`${uploads}/photos/${editImage}`} alt={editTitle} />
                        )}
                        <form onSubmit={handleUpdate}>
                            <input
                                type="text"
                                placeholder='Insira o novo t??tulo'
                                value={editTitle || ''}
                                onChange={(e) => setEditTitle(e.target.value)}
                            />
                            <input
                                type="submit"
                                value='Atualizar'
                            />
                            <button
                                type='button'
                                className='cancel-btn'
                                onClick={handleCancelEdit}
                            >
                                Cancelar edi????o
                            </button>
                        </form>
                    </div>
                    {errorPhoto && <Message message={errorPhoto} type='error' />}
                    {messagePhoto && <Message message={messagePhoto} type='success' />}
                </>
            )}
            <div className="user-photos">
                <h2>Fotos publicadas:</h2>
                <div className="photos-container">
                    {photos && photos.map((photo, i) => (
                        <div className="photo" key={i}>
                            {photo.image && (
                                <img src={`${uploads}/photos/${photo.image}`} alt={photo.title} />
                            )}
                            {id === userAuth._id ? (
                                <div className="actions">
                                    <Link to={`/photos/${photo._id}`}>
                                        <BsFillEyeFill />
                                    </Link>
                                    <BsPencilFill onClick={() => handleEdit(photo)} />
                                    <BsXLg onClick={() => handleDelete(photo._id)} />
                                </div>
                            ) : (
                                <Link className='btn' to={`/photos/${photo._id}`}>Ver foto</Link>
                            )}
                        </div>
                    ))}
                    {photos?.length === 0 && <p>Ainda n??o h?? fotos publicadas</p>}
                </div>
            </div>
        </div>
    )
}

export default Profile