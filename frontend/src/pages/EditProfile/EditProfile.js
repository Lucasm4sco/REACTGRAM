import { useState, useEffect } from 'react';
import { uploads } from '../../utils/config';
import './EditProfile.css';

import { useSelector, useDispatch } from 'react-redux';
import { profile, resetMessage, updateProfile } from '../../slices/userSlice';

import Message from '../../components/Message/Message';

const EditProfile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [bio, setBio] = useState('');
    const [previewImage, setPreviewImage] = useState('');

    const dispatch = useDispatch();
    const { user, message, error, loading } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(profile());
    }, [dispatch]);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setBio(user.bio);
        }
    }, [user])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            name
        }

        if (profileImage)
            userData.profileImage = profileImage;

        if (bio)
            userData.bio = bio;

        if (password)
            userData.password = password;

        const formData = new FormData();

        Object.keys(userData).forEach(key => formData.append(key, userData[key]))
        console.log(formData)

        dispatch(updateProfile(formData));

        setTimeout(() => {
            dispatch(resetMessage())
        }, 2000);
    }

    const handleFile = (e) => {
        const image = e.target.files[0];
        setPreviewImage(image);
        setProfileImage(image);
    }

    return (
        <div id='edit-profile'>
            <h2>Edite seus dados</h2>
            <p className="subtitle">Adicione uma imagem de perfil e conte mais sobre você...</p>
            {(user.profileImage || previewImage) && (
                <img src={
                    previewImage
                        ? URL.createObjectURL(previewImage)
                        : `${uploads}/users/${user.profileImage}`
                }
                    alt={user.name}
                    className='profile-image'
                />
            )}
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='Nome'
                    onChange={(e) => setName(e.target.value)}
                    value={name || ''}
                />
                <input
                    type="email"
                    placeholder='E-mail'
                    value={email || ''}
                    disabled
                />
                <label>
                    <span>Imagem do Perfil:</span>
                    <input type="file" onChange={handleFile} />
                </label>
                <label>
                    <span>Bio:</span>
                    <input
                        type="text"
                        placeholder='Descrição do perfil'
                        onChange={(e) => setBio(e.target.value)}
                        value={bio || ''}
                    />
                </label>
                <label>
                    <span>Deseja alterar sua senha?</span>
                    <input
                        type="password"
                        placeholder='Digite sua nova senha'
                        onChange={(e) => setPassword(e.target.value)}
                        value={password || ''}
                    />
                </label>
                <input
                    type="submit"
                    value={loading ? 'Aguarde...' : 'Atualizar'}
                    disabled={loading}
                />
                {error && <Message message={error} type='error' />}
                {message && <Message message={message} type='success' />}
            </form>
        </div>
    )
}

export default EditProfile