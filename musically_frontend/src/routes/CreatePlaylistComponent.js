import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoggedInContainer from '../containers/LoggedInContainer';
import TextInput from '../components/shared/TextInput';
import { makeAuthenticatedPOSTRequests } from '../utils/serverHelpers';

const CreatePlaylistComponent = () => {
    const [playlistName, setPlaylistName] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const createPlaylist = async () => {
        if (!playlistName.trim()) {
            alert('Please enter a playlist name');
            return;
        }

        setIsLoading(true);
        try {
            await makeAuthenticatedPOSTRequests('/playlist/create', {
                name: playlistName.trim(),
                thumbnail: '',
                songs: []
            });
            alert(`Playlist "${playlistName}" created successfully!`);
            setPlaylistName('');
            setDescription('');
            navigate('/my-music');
        } catch (error) {
            console.error('Playlist creation failed:', error);
            alert(`Failed to create playlist: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <LoggedInContainer>
            <div className='w-full p-8'>
                <div className='max-w-2xl mx-auto'>
                    <div className='text-3xl font-bold mb-8 text-gray-900 dark:text-white'>Create New Playlist</div>

                    <div className='bg-white dark:bg-app-gray p-8 rounded-xl shadow-lg'>
                        <div className='space-y-6'>
                            <TextInput
                                label="Playlist Name"
                                placeholder="Enter playlist name"
                                value={playlistName}
                                setValue={setPlaylistName}
                                labelClass="text-gray-700 dark:text-gray-300"
                            />

                            <div className='space-y-2'>
                                <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300'>Description (Optional)</label>
                                <textarea
                                    placeholder="Describe your playlist..."
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className='w-full bg-gray-900 text-white border border-gray-700 rounded-md p-3 placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200 resize-none'
                                    rows={4}
                                />
                            </div>

                            <button
                                onClick={createPlaylist}
                                disabled={isLoading}
                                className='w-full bg-primary hover:bg-primary-hover text-black font-semibold py-3 rounded-full transition-all duration-200 transform hover:scale-[1.02] shadow-lg disabled:cursor-not-allowed disabled:opacity-60'
                            >
                                {isLoading ? 'Creating Playlist...' : 'Create Playlist'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </LoggedInContainer>
    );
};

export default CreatePlaylistComponent;