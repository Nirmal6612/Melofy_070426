import React from "react"
const TextWithHover = ({ displayText }) => {
  return (
    <div className='flex items-center justify-start cursor-pointer'>
      <div className="text-gray-500 dark:text-gray-400 font-semibold hover:text-black dark:hover:text-white transition-colors duration-200">
        {displayText}
      </div>
    </div>
  )
}

export default TextWithHover