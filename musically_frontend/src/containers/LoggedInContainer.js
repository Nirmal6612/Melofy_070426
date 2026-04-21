import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import React, { useContext, useState } from 'react';
import { Howl } from 'howler';
import { Icon } from '@iconify/react';
import { Link, useNavigate } from 'react-router-dom';
import songContext from '../contexts/songContext';
import IconText from '../components/shared/IconText';
import TextWithHover from '../components/shared/TextWithHover';
import ThemeToggle from '../components/shared/ThemeToggle';

const LoggedInContainer = ({ children }) => {
    const { currentSong, soundPlayed, setSoundPlayed, isPaused, setIsPaused, user, logout } = useContext(songContext);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    
    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
    if (!currentSong) return;

    if (!isPaused) {
        changeSong(currentSong.track);
    }
}, [currentSong]);
    
useEffect(() => {
    if (soundPlayed) {
        soundPlayed.stop();
    }
    setIsPaused(true);
}, [location]);
    /* eslint-enable react-hooks/exhaustive-deps */

    const getInitials = () => {
        const firstInitial = user?.firstName?.trim()?.[0] || '';
        const lastInitial = user?.lastName?.trim()?.[0] || user?.username?.trim()?.[0] || '';
        const initials = `${firstInitial}${lastInitial}`.toUpperCase();
        return initials || 'HN';
    };

    const playSound = () => {
        if (!soundPlayed) return;
        soundPlayed.play();
        setIsPaused(false);
    };

    const changeSong = (songSrc) => {
        if (soundPlayed) {
            soundPlayed.stop();
        }
        let sound = new Howl({
            src: [songSrc],
            html5: true
        });
        setSoundPlayed(sound);
        sound.play();
        setIsPaused(false);
    };

    const pauseSound = () => {
        soundPlayed.pause();
    };

    const togglePlayPause = () => {
        if (isPaused) {
            playSound();
            setIsPaused(false);
        } else {
            pauseSound();
            setIsPaused(true);
        }
    };

    return (
        <div className="h-screen w-full bg-white dark:bg-app-black flex flex-col overflow-hidden text-gray-900 dark:text-white font-sans transition-colors duration-200">
            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar */}
                <aside className="w-64 bg-gray-100 dark:bg-black flex flex-col justify-between p-6 border-r border-gray-300 dark:border-white/5 transition-colors duration-200">
                    <div>
                        <div className="mb-8 flex items-center gap-2 px-2">
                            <Icon icon="mdi:music" className="text-primary text-4xl" />
                            <span className="text-2xl font-bold tracking-tight text-gray-800 dark:text-white">Melofy</span>
                        </div>

                        <nav className="flex flex-col gap-4">
                            <Link to="/dashboard" className="hover:no-underline text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">
                                <IconText iconName="material-symbols:home-rounded" displayText="Home" active />
                            </Link>
                            <Link to="/search" className="hover:no-underline text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">
                                <IconText iconName="ic:outline-search" displayText="Search" />
                            </Link>
                            <div className="hover:no-underline cursor-pointer text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors" onClick={() => navigate('/my-music')}>
                                <IconText iconName="icomoon-free:books" displayText="Library" />
                            </div>
                        </nav>

                        <div className="mt-8 flex flex-col gap-4">
                            <div className="hover:no-underline cursor-pointer text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors" onClick={() => navigate('/create-playlist')}>
                                <IconText iconName="basil:add-solid" displayText="Create Playlist" />
                            </div>
                            <Link to="/my-music" className="hover:no-underline text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">
                                <IconText iconName="ic:twotone-queue-music" displayText="My Music" />
                            </Link>
                        </div>
                    </div>

                    <div className="mt-auto">
                        <div className="flex items-center justify-center gap-2 border border-gray-300 dark:border-white/10 rounded-full py-2 px-4 hover:bg-gray-200 dark:hover:bg-white/5 cursor-pointer transition-colors text-gray-600 dark:text-gray-400">
                            <Icon icon="ic:baseline-language" className="text-xl" />
                            <span className="text-sm font-medium">English</span>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 bg-white dark:bg-app-black relative overflow-y-auto transition-colors duration-200">
                    {/* Header Overlay */}
                    <header className="sticky top-0 z-10 w-full bg-white/80 dark:bg-black/50 backdrop-blur-md px-8 py-4 flex items-center justify-between border-b border-gray-200 dark:border-white/5 transition-colors duration-200">
                        {/* Left side spacer or additional nav */}
                        <div className="flex-1"></div>

                        <div className="flex items-center gap-6">
                            <div className="flex gap-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                            <Link to="/premium"><TextWithHover displayText="Premium" /></Link>
                            <Link to="/support"><TextWithHover displayText="Support" /></Link>
                            <Link to="/download"><TextWithHover displayText="Download" /></Link>
                            </div>
                            <div className="h-6 w-px bg-gray-300 dark:bg-white/10 mx-2"></div>

                            <ThemeToggle />

                            <div className="flex items-center gap-4">
                                <Link to="/uploadsong" className="text-sm font-medium text-gray-800 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">
                                    Upload Song
                                </Link>
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() => setIsProfileOpen(prev => !prev)}
                                        className="h-10 w-10 bg-primary rounded-full flex items-center justify-center font-bold text-white shadow-lg hover:scale-105 transition-transform cursor-pointer"
                                    >
                                        {getInitials()}
                                    </button>
                                    {isProfileOpen && (
                                        <div className="absolute right-0 mt-2 w-40 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-app-black shadow-xl z-20">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    logout();
                                                    setIsProfileOpen(false);
                                                }}
                                                className="w-full px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </header>

                    <div className="p-8 pb-48">
                        {children}
                    </div>
                </main>
            </div>

            {/* Music Player Bar */}
            {currentSong && (
                <div className="h-24 bg-white/90 dark:bg-black/90 backdrop-blur-xl border-t border-gray-200 dark:border-white/10 px-4 flex items-center justify-between fixed bottom-0 w-full z-50 transition-colors duration-200">
                    {/* Song Info */}
                    <div className="w-1/4 flex items-center gap-4">
                        <img
                            src={currentSong.thumbnail}
                            alt="Album Art"
                            className="w-14 h-14 rounded-md object-cover shadow-md"
                        />
                        <div>
                            <div className="text-gray-900 dark:text-white font-medium hover:underline cursor-pointer truncate transition-colors">
                                {currentSong.name}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 hover:underline cursor-pointer truncate transition-colors">
                               {currentSong.artist?.firstName
                                         ? `${currentSong.artist.firstName} ${currentSong.artist.lastName || ""}`
                                         : "Melofy"}
                            </div>
                        </div>
                        <Icon icon="ph:heart" className="text-gray-400 hover:text-primary cursor-pointer ml-2 text-xl" />
                    </div>

                    {/* Controls */}
                    <div className="w-2/4 flex flex-col items-center justify-center gap-2">
                        <div className="flex items-center gap-6 text-gray-500 dark:text-gray-400">
                            <Icon icon="ri:shuffle-line" className="hover:text-black dark:hover:text-white cursor-pointer text-xl transition-colors" />
                            <Icon icon="fluent:previous-48-filled" className="text-gray-400 dark:text-gray-300 hover:text-black dark:hover:text-white cursor-pointer text-2xl transition-colors" />

                            <div
                                onClick={togglePlayPause}
                                className="h-10 w-10 bg-gray-900 dark:bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform cursor-pointer text-white dark:text-black shadow-lg"
                            >
                                <Icon
                                    icon={isPaused ? 'heroicons:play-solid' : 'heroicons:pause-solid'}
                                    className="text-2xl ml-0.5" // visual adjustment
                                />
                            </div>

                            <Icon icon="fluent:next-48-filled" className="text-gray-400 dark:text-gray-300 hover:text-black dark:hover:text-white cursor-pointer text-2xl transition-colors" />
                            <Icon icon="ic:outline-repeat" className="hover:text-black dark:hover:text-white cursor-pointer text-xl transition-colors" />
                        </div>
                        {/* Progress Bar (Visual Only for now) */}
                        <div className="w-2/3 h-1 bg-gray-200 dark:bg-gray-800 rounded-full cursor-pointer relative group">
                            <div className="h-full w-1/3 bg-gray-800 dark:bg-white rounded-full group-hover:bg-primary transition-colors"></div>
                        </div>
                    </div>

                    {/* Volume/Extra Controls */}
                    <div className="w-1/4 flex items-center justify-end gap-4 pr-4 text-gray-500 dark:text-gray-400">
                        <Icon icon="ph:microphone-stage" className="hover:text-black dark:hover:text-white cursor-pointer text-xl transition-colors" />
                        <Icon icon="ph:queue" className="hover:text-black dark:hover:text-white cursor-pointer text-xl transition-colors" />
                        <div className="flex items-center gap-2 w-24">
                            <Icon icon="ph:speaker-high" className="text-xl" />
                            <div className="h-1 flex-1 bg-gray-200 dark:bg-gray-800 rounded-full cursor-pointer">
                                <div className="h-full w-2/3 bg-gray-800 dark:bg-white rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoggedInContainer;

