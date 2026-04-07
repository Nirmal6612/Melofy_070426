import React from 'react'
import { Icon } from '@iconify/react';

const IconText = ({ iconName, displayText, active }) => {
  return (
    <div className='w-full flex items-center justify-start p-2 cursor-pointer group'>
      <div className={`text-2xl transition-colors duration-200 ${active ? 'text-black dark:text-white' : 'text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white'}`}>
        <Icon icon={iconName} fontSize={27} />
      </div>
      <div className={`ml-4 text-lg font-medium transition-colors duration-200 ${active ? 'text-black dark:text-white' : 'text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white'}`}>
        {displayText}
      </div>
    </div>
  )
}

export default IconText
