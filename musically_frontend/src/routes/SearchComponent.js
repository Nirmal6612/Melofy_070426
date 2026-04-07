import { Icon } from "@iconify/react/dist/iconify.js"
import LoggedInContainer from "../containers/LoggedInContainer"
import { useState, useContext } from 'react'
import { makeAuthenticatedGETRequests } from "../utils/serverHelpers";
import SingleSongCard from "../components/shared/SingleSongCard";

import ThemeContext from '../contexts/ThemeContext';

const SearchComponent = () => {
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [songData, setSongData] = useState([]);
    const { theme } = useContext(ThemeContext);

    const searchSong = async () => {
        const response = await makeAuthenticatedGETRequests(`/song/get/songname/${encodeURIComponent(searchText)}`);
        console.log(response)
        setSongData(response.data || []);
        setSearchText("");
    }
    return (
        <LoggedInContainer>
            <div className="w-full py-6">
                <div
                    className={`w-full max-w-2xl mx-auto rounded-full bg-white dark:bg-app-black border border-gray-300 dark:border-gray-700 p-4 flex items-center space-x-4 transition-all duration-200 ${isInputFocused ? "ring-2 ring-primary border-transparent" : "hover:border-gray-400 dark:hover:border-gray-600 shadow-sm"}`}
                >
                    <Icon icon="ic:baseline-search" className="text-gray-400 text-2xl" />
                    <input
                        type="text"
                        placeholder="What do you want to listen to?"
                        className="w-full bg-transparent text-gray-900 dark:text-white text-lg placeholder-gray-500 focus:outline-none transition-colors"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                searchSong();
                            }
                        }}
                        onFocus={() => setIsInputFocused(true)}
                        onBlur={() => setIsInputFocused(false)}
                    />
                </div>

                {songData.length > 0 ? (
                    <div className="mt-8 space-y-2">
                        <div
                            className='text-xl font-bold mb-4 transition-colors'
                            style={{ color: theme === 'dark' ? 'white' : 'black' }}
                        >
                            Search Results
                        </div>
                        {songData.map((item) => (
                            <SingleSongCard
                                info={item}
                                key={JSON.stringify(item)}
                                playSound={() => { }}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="mt-20 flex flex-col items-center justify-center text-gray-500 opacity-60">
                        <Icon icon="ic:outline-music-note" className="text-6xl mb-4" />
                        <p className="text-lg">Find your favorite songs</p>
                    </div>
                )}
            </div>
        </LoggedInContainer>
    )
}

export default SearchComponent
