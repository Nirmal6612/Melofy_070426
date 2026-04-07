// import React, { useEffect, useState, useContext } from 'react'
// import SingleSongCard from '../components/shared/SingleSongCard';
// import { makeAuthenticatedGETRequests } from '../utils/serverHelpers';
// import LoggedInContainer from '../containers/LoggedInContainer';
// import ThemeContext from '../contexts/ThemeContext';
// import songContext from '../contexts/songContext';

// const MySongsComponent = () => {

//     const [songData, setSongData] = useState([]);
//     const [playlists, setPlaylists] = useState([]);
//     const { theme } = useContext(ThemeContext);
//     const { playSound, user } = useContext(songContext);

//     useEffect(() => {
//         const getData = async () => {
//             try {
//                 const [songsResponse, playlistsResponse] = await Promise.all([
//                     makeAuthenticatedGETRequests('/song/get/songs'),
//                     user ? makeAuthenticatedGETRequests(`/playlist/get/artist/${user._id}`) : Promise.resolve({ data: [] })
//                 ]);

//                 setSongData(songsResponse.data || []);
//                 setPlaylists(playlistsResponse.data || []);
//             } catch (error) {
//                 console.error('Failed to load my songs or playlists:', error);
//                 setSongData([]);
//                 setPlaylists([]);
//             }
//         }
//         getData();
//     }, [user])

//     return (

//         <LoggedInContainer >
//             <div
//                 className='text-2xl font-bold py-6 transition-colors duration-200'
//                 style={{ color: theme === 'dark' ? 'white' : 'black' }}
//             >
//                 My Music
//             </div>
//             <div className='space-y-10'>
//                 <section>
//                     <div className='text-2xl font-bold mb-6 transition-colors duration-200' style={{ color: theme === 'dark' ? 'white' : 'black' }}>
//                         My Playlists
//                     </div>
//                     {playlists.length > 0 ? (
//                         <div className='grid gap-4 sm:grid-cols-2'>
//                             {playlists.map((playlist) => (
//                                 <PlaylistCard key={playlist._id} info={playlist} />
//                             ))}
//                         </div>
//                     ) : (
//                         <div className='p-8 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-app-gray'>
//                             <div className='text-gray-900 dark:text-white text-lg font-semibold'>No playlists yet.</div>
//                             <div className='text-gray-500 dark:text-gray-400 mt-2'>Create a playlist from the Create Playlist page to see it here.</div>
//                         </div>
//                     )}
//                 </section>

//                 <section>
//                     <div className='text-2xl font-bold mb-6 transition-colors duration-200' style={{ color: theme === 'dark' ? 'white' : 'black' }}>
//                         My Songs
//                     </div>
//                     <div className='space-y-3'>
//                         {songData.length > 0 ? (
//                             songData.map((item) => (
//                                 <SingleSongCard
//                                     info={item}
//                                     key={item._id}
//                                 />
//                             ))
//                         ) : (
//                             <div className='p-8 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-app-gray'>
//                                 <div className='text-gray-900 dark:text-white text-lg font-semibold'>No songs yet.</div>
//                                 <div className='text-gray-500 dark:text-gray-400 mt-2'>Upload a song from the Upload Song page to see it here.</div>
//                             </div>
//                         )}
//                     </div>
//                 </section>
//             </div>
//         </LoggedInContainer>
//     )
// }

// const PlaylistCard = ({ info }) => {
//     return (
//         <div className='border border-gray-200 dark:border-white/10 rounded-3xl bg-white dark:bg-app-gray p-6 transition-colors duration-200'>
//             <div className='flex items-start justify-between gap-4'>
//                 <div>
//                     <div className='text-lg font-semibold text-gray-900 dark:text-white'>{info.name}</div>
//                     <div className='text-sm text-gray-500 dark:text-gray-400 mt-2'>{info.songs?.length || 0} songs</div>
//                 </div>
//                 <div className='h-14 w-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-semibold'>PL</div>
//             </div>
//             <div className='mt-4 text-sm text-gray-500 dark:text-gray-400'>A playlist created in Melofy. Add songs later from the Upload Song page.</div>
//         </div>
//     )
// }

// export default MySongsComponent;


import React, { useEffect, useState, useContext } from 'react'
import SingleSongCard from '../components/shared/SingleSongCard';
import { makeAuthenticatedGETRequests } from '../utils/serverHelpers';
import LoggedInContainer from '../containers/LoggedInContainer';
import ThemeContext from '../contexts/ThemeContext';
import songContext from '../contexts/songContext';

const MySongsComponent = () => {

    const [songData, setSongData] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const { theme } = useContext(ThemeContext);
    const { playSound, user } = useContext(songContext);

    useEffect(() => {
        const getData = async () => {
            try {
                console.log("User:", user);

                const songsResponse = await makeAuthenticatedGETRequests('/song/get/songs');

                let playlistsResponse = { data: [] };

                // ✅ FIX: safe check for user._id
                if (user && user._id) {
                    playlistsResponse = await makeAuthenticatedGETRequests(`/playlist/get/artist/${user._id}`);
                }

                setSongData(songsResponse.data || []);
                setPlaylists(playlistsResponse.data || []);

            } catch (error) {
                console.error('Failed to load my songs or playlists:', error);
                setSongData([]);
                setPlaylists([]);
            }
        }

        getData();
    }, [user]);

    return (

        <LoggedInContainer >
            <div
                className='text-2xl font-bold py-6 transition-colors duration-200'
                style={{ color: theme === 'dark' ? 'white' : 'black' }}
            >
                My Music
            </div>

            <div className='space-y-10'>

                {/* PLAYLIST SECTION */}
                <section>
                    <div className='text-2xl font-bold mb-6' style={{ color: theme === 'dark' ? 'white' : 'black' }}>
                        My Playlists
                    </div>

                    {playlists.length > 0 ? (
                        <div className='grid gap-4 sm:grid-cols-2'>
                            {playlists.map((playlist) => (
                                <PlaylistCard key={playlist._id} info={playlist} />
                            ))}
                        </div>
                    ) : (
                        <div className='p-8 rounded-2xl border'>
                            <div>No playlists yet.</div>
                        </div>
                    )}
                </section>

                {/* SONG SECTION */}
                <section>
                    <div className='text-2xl font-bold mb-6' style={{ color: theme === 'dark' ? 'white' : 'black' }}>
                        My Songs
                    </div>

                    <div className='space-y-3'>
                        {songData.length > 0 ? (
                            songData.map((item) => (
                                <SingleSongCard
                                    info={item}
                                    key={item._id}
                                />
                            ))
                        ) : (
                            <div className='p-8 rounded-2xl border'>
                                <div>No songs yet.</div>
                            </div>
                        )}
                    </div>
                </section>

            </div>
        </LoggedInContainer>
    )
}

const PlaylistCard = ({ info }) => {
    return (
        <div className='border rounded-3xl p-6'>
            <div className='text-lg font-semibold'>{info.name}</div>
            <div className='text-sm mt-2'>{info.songs?.length || 0} songs</div>
        </div>
    )
}

export default MySongsComponent;
