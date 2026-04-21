// import React from 'react'
// import { Link } from 'react-router-dom'

// const HomeComponent = () => {
//     const focusCardsData = [
//         {
//             title: "Peaceful Piano",
//             description: "Relax and indulge with beautiful piano pieces",
//             imgUrl: "https://images.pexels.com/photos/586415/pexels-photo-586415.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
//         },
//         {
//             title: "Deep Focus",
//             description: "Focus on your goal until it is achieved",
//             imgUrl: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
//         },
//         {
//             title: "Instrumental music",
//             description: "Listen to instrumental music that excites you",
//             imgUrl: "https://images.pexels.com/photos/33597/guitar-classical-guitar-acoustic-guitar-electric-guitar.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
//         },
//         {
//             title: "Focus Flow",
//             description: "Maintain and improve your focus flow though musically",
//             imgUrl: "https://images.pexels.com/photos/6401668/pexels-photo-6401668.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
//         },
//         {
//             title: "Beats to think me",
//             description: "Listen to beats which force you to think more about yourself",
//             imgUrl: "https://images.pexels.com/photos/21022/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
//         }]
//     return (
//         <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-slate-800 text-white">
//             <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
//                 <div className="text-2xl font-bold tracking-tight">Melofy</div>
//                 <div className="flex items-center gap-3">
//                     <Link to="/login" className="rounded-full border border-white/20 bg-primary px-5 py-2 text-sm font-semibold text-black transition hover:bg-primary-hover">
//                         Login
//                     </Link>
//                     <Link to="/signup" className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white transition hover:border-white">
//                         Sign Up
//                     </Link>
//                 </div>
//             </header>

//             <main className="max-w-7xl mx-auto px-6 pb-20">
//                 <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-center py-20">
//                     <div className="space-y-8">
//                         <div className="text-sm uppercase tracking-[0.3em] text-primary">Music for every mood</div>
//                         <h1 className="text-5xl md:text-6xl font-bold leading-tight">
//                             Discover playlists, upload songs, and find your flow.
//                         </h1>
//                         <p className="max-w-2xl text-lg text-slate-300">
//                             Sign in to experience your personalized dashboard and manage your music.
//                         </p>
//                         <div className="flex flex-wrap gap-4">
//                             <Link to="/login" className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-slate-100">
//                                 Login Now
//                             </Link>
//                             <Link to="/signup" className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white">
//                                 Create Account
//                             </Link>
//                         </div>
//                     </div>
//                     <div className="grid gap-6 sm:grid-cols-2">
//                         {focusCardsData.map((item, index) => (
//                             <Card key={index} title={item.title} description={item.description} imgUrl={item.imgUrl} />
//                         ))}
//                     </div>
//                 </section>
//             </main>
//         </div>
//     )
// }

// const Card = ({ title, description, imgUrl }) => {
//     return (
//         <div className='group overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-xl transition duration-300 hover:-translate-y-1 hover:border-white/20'>
//             <div className='h-52 bg-cover bg-center' style={{ backgroundImage: `url(${imgUrl})` }}></div>
//             <div className='p-6'>
//                 <div className='text-lg font-semibold mb-2'>{title}</div>
//                 <p className='text-sm text-slate-300 leading-relaxed'>{description}</p>
//             </div>
//         </div>
//     )
// }

// export default HomeComponent;

import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import songContext from '../contexts/songContext'


const HomeComponent = () => {

    const { setCurrentSong } = useContext(songContext);

    // 🔥 CATEGORY MAP
    const categoryMap = {
        "Peaceful Piano": "piano",
        "Deep Focus": "focus",
        "Instrumental music": "instrumental",
        "Focus Flow": "focus",
        "Beats to think me": "beats"
    };

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
            alert("No songs found in DB for this category");
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
            imgUrl: "https://images.pexels.com/photos/33597/guitar-classical-guitar.jpg"
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
        <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-slate-800 text-white">

            <header className="max-w-7xl mx-auto px-6 py-6 flex justify-between">
                <div className="text-2xl font-bold">Melofy</div>
                <div className="flex gap-3">
                    <Link to="/login" className="bg-primary px-5 py-2 rounded-full text-black">Login</Link>
                    <Link to="/signup" className="border px-5 py-2 rounded-full">Sign Up</Link>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 pb-20">
                <section className="grid gap-10 lg:grid-cols-2 py-20">

                    <div>
                        <h1 className="text-5xl font-bold">
                            Discover music & play instantly 🎵
                        </h1>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                        {focusCardsData.map((item, index) => (
                            <Card 
                                key={index} 
                                {...item} 
                                onClick={() => handleCardClick(item.title)}
                            />
                        ))}
                    </div>

                </section>
            </main>
        </div>
    )
}

const Card = ({ title, description, imgUrl, onClick }) => {
    return (
        <div 
            onClick={onClick}
            className='cursor-pointer group overflow-hidden rounded-3xl border bg-white/5 hover:scale-105 transition'
        >
            <div 
                className='h-52 bg-cover bg-center'
                style={{ backgroundImage: `url(${imgUrl})` }}
            ></div>

            <div className='p-6'>
                <div className='text-lg font-semibold'>{title}</div>
                <p className='text-sm text-slate-300'>{description}</p>
            </div>
        </div>
    )
}

export default HomeComponent;