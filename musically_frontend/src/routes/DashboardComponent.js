import React, { useContext } from 'react'
import LoggedInContainer from '../containers/LoggedInContainer';
import ThemeContext from '../contexts/ThemeContext';
import songContext from '../contexts/songContext';

const DashboardComponent = () => {

    const { setCurrentSong } = useContext(songContext);

    // 🔥 CATEGORY MAP (VERY IMPORTANT)
    const categoryMap = {
        "Peaceful Piano": "piano",
        "Deep Focus": "focus",
        "Instrumental music": "instrumental",
        "Focus Flow": "focus",
        "Beats to think me": "beats"
    };

    // 🔥 CLICK HANDLER
    const handleCardClick = async (title) => {
        try {
            const category = categoryMap[title];

            console.log("Clicked:", title);
            console.log("Category:", category);

            const res = await fetch(`https://melofy-070426.onrender.com/song/get/category/${category}`);
            const data = await res.json();

            console.log("API Response:", data);

            if (data.data.length > 0) {
                setCurrentSong(data.data[0]); // 🎵 PLAY
            } else {
                alert("No songs found for this category");
            }
        } catch (err) {
            console.error("Error:", err);
        }
    };

    const focusCardsData = [
        {
            title: "Peaceful Piano",
            description: "Relax and indulge with beautiful piano pieces",
            imgUrl: "https://images.pexels.com/photos/586415/pexels-photo-586415.jpeg"
        },
        {
            title: "Deep Focus",
            description: "Focus on your goal until it is achieved",
            imgUrl: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg"
        },
        {
            title: "Instrumental music",
            description: "Listen to instrumental music that excites you",
            imgUrl: "https://images.pexels.com/photos/33597/guitar-classical-guitar-acoustic-guitar-electric-guitar.jpg"
        },
        {
            title: "Focus Flow",
            description: "Maintain and improve your focus flow",
            imgUrl: "https://images.pexels.com/photos/6401668/pexels-photo-6401668.jpeg"
        },
        {
            title: "Beats to think me",
            description: "Listen to beats which force you to think more",
            imgUrl: "https://images.pexels.com/photos/21022/pexels-photo.jpg"
        }
    ];

    return (
        <LoggedInContainer>
            <div className='w-full p-4'>
                <PlaylistView title="Focus" cardsData={focusCardsData} onCardClick={handleCardClick} />
                <PlaylistView title="Melofy Playlist" cardsData={focusCardsData} onCardClick={handleCardClick} />
                <PlaylistView title="Sounds of India" cardsData={focusCardsData} onCardClick={handleCardClick} />
            </div>
        </LoggedInContainer>
    )
}


// 🔥 PLAYLIST VIEW
const PlaylistView = ({ title, cardsData, onCardClick }) => {
    const { theme } = useContext(ThemeContext);

    return (
        <div className="w-full mb-8">
            <div
                className='text-2xl font-bold mb-4'
                style={{ color: theme === 'dark' ? 'white' : 'black' }}
            >
                {title}
            </div>

            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
                {
                    cardsData.map((item, index) => {
                        return (
                            <Card 
                                key={index}
                                {...item}
                                onClick={() => onCardClick(item.title)} // 🔥 CLICK HERE
                            />
                        )
                    })
                }
            </div>
        </div>
    )
};


// 🔥 CARD COMPONENT
const Card = ({ title, description, imgUrl, onClick }) => {
    const { theme } = useContext(ThemeContext);

    return (
        <div 
            onClick={onClick} // 🔥 CLICK ENABLED
            className='bg-white dark:bg-app-gray p-4 rounded-lg cursor-pointer hover:scale-105 transition'
        >
            <img className='rounded-md w-full aspect-square object-cover' src={imgUrl} alt={title} />

            <div className='mt-3'>
                <div style={{ color: theme === 'dark' ? 'white' : 'black' }}>
                    {title}
                </div>
                <div className='text-gray-500 text-sm'>
                    {description}
                </div>
            </div>
        </div>
    )
}

export default DashboardComponent;