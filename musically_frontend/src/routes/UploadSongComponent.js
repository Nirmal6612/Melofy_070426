import React, { useState } from 'react'
import TextInput from '../components/shared/TextInput';
import CloudinaryUpload from '../components/shared/CloudinaryUpload';
import { useNavigate } from 'react-router-dom';
import { makeAuthenticatedPOSTRequests } from '../utils/serverHelpers';
import LoggedInContainer from '../containers/LoggedInContainer';
const UploadSongComponent = () => {

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [track, setTrack] = useState('');
    const [playlistUrl, setPlaylistUrl] = useState('');
    // const [uploadedFileName, setUploadedFileName] = useState('');

    console.log(name, thumbnail, track, playlistUrl);
    const uploadSong = async () => {
        const data = {
            name,
            thumbnail,
            track: playlistUrl
        };

        console.log(data);
        try {
            const response = await makeAuthenticatedPOSTRequests("/song/create", data);
            console.log(response);
            alert("Song uploaded successfully");
            navigate('/my-music');
        } catch (error) {
            console.error('Upload failed:', error);
            alert(`Upload failed: ${error.message}`);
        }
    };

    return (

        <LoggedInContainer>
            <div className='max-w-2xl mx-auto py-8'>
                <div className='text-gray-900 dark:text-white text-2xl font-bold mb-8 text-center transition-colors duration-200'>
                    Upload Your Music
                </div>
                <div className='bg-white dark:bg-app-black border border-gray-200 dark:border-gray-800 rounded-xl p-8 shadow-xl transition-all duration-200'>
                    <div className='flex flex-col gap-4'>
                        <TextInput
                            label={"Song Title"}
                            labelClass={'text-gray-700 dark:text-gray-300 font-medium mb-1 transition-colors'}
                            placeholder={"Enter song title"}
                            className={"mb-4"}
                            value={name}
                            setValue={setName}
                        />
                        <TextInput
                            label={"Thumbnail URL"}
                            labelClass={'text-gray-700 dark:text-gray-300 font-medium mb-1 transition-colors'}
                            placeholder={"Enter thumbnail image URL"}
                            className={"mb-4"}
                            value={thumbnail}
                            setValue={setThumbnail}
                        />

                        <div className="mb-6">
                            <CloudinaryUpload setUrl={setPlaylistUrl} />
                        </div>

                        <button
                            className='w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 rounded-full transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-[1.02]'
                            onClick={(e) => {
                                e.preventDefault();
                                uploadSong();
                            }}
                        >
                            Upload Song
                        </button>
                    </div>
                </div>
            </div>
        </LoggedInContainer>

    )
}

export default UploadSongComponent;
