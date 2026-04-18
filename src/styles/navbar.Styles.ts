export const baseLinkStyle = `
  font-serif
    text-md 
    lg:text-lg
    relative 
    transition-all duration-300
   duration-300
    after:content-[''] 
    after:absolute 
    after:-bottom-2
    after:left-0 
    after:h-1 
    after:bg-vibe-cyan 
    after:transition-all 
    after:duration-300
  `;

export const activeLinkStyle = `text-white lg:text-white font-bold after:w-full italic `;
export const nonActiveLinkStyle = `text-white lg:text-gray-400 hover:text-white after:w-0 hover:after:w-full hover:scale-105 hover:after:bg-gray-400`;
