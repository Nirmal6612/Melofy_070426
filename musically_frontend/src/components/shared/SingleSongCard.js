import { Icon } from "@iconify/react/dist/iconify.js"
import songContext from "../../contexts/songContext"
import { useContext } from "react"

const SingleSongCard = ({ info, playSound }) => {

    const { setCurrentSong } = useContext(songContext);

    return (
        <div
            className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-200/50 dark:hover:bg-white/10 transition-colors duration-200 cursor-pointer group"
            onClick={() => setCurrentSong(info)}
        >
            <div
                className="h-12 w-12 rounded-md bg-cover bg-center shadow-md group-hover:shadow-lg transition-all"
                style={{ backgroundImage: `url(${info.thumbnail})` }}
            ></div>

            <div className="flex-1 min-w-0">
                <div className="text-gray-900 dark:text-white font-medium hover:underline truncate text-sm md:text-base transition-colors">
                    {info.name}
                </div>
                <div className="text-gray-500 dark:text-gray-400 text-xs hover:underline truncate transition-colors">
                    {info.artist.firstName + " " + info.artist.lastName}
                </div>
            </div>

            <div className="flex items-center gap-4 text-gray-400">
                <span className="text-sm font-variant-numeric tabular-nums hidden sm:block">4:05</span>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <Icon
                        icon="ph:dots-three-bold"
                        fontSize={24}
                        className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
                    />
                </div>
            </div>
        </div>
    )
}

export default SingleSongCard