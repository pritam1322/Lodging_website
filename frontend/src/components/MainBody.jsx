import backgroundImage from '../media/background_img.jpg';

const MainBody = () => {
  return (
    <div className="mt-16 grow flex flex-col items-center">
    <div className="grow item-center">
      <div className="flex  justify-center">
        <div className="flex flex-col items-center gap-2 text-black  text-9xl font-serif py-2 px-4 mt-8">
          <h1 className="font-bold bg-sky-600 text-white">Escape the Reality</h1>
          <h5 className='text-2xl mt-8'>Spacious & Affordable Rooms</h5>
        </div>
      </div>
    </div>
    <h1 className='text-white bg-green-500 text-7xl font-serif'>RATNAGIRI</h1>
  </div>
  )
}

export default MainBody