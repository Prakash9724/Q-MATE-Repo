import React from 'react'

function Card() {
  return (

    <div className='flex flex-wrap'>
      <div className='w-[22vw] rounded-lg overflow-hidden flex justify-between flex-col h-[70vh] m-6 mt-10 bg-white border-[1px] border-gray-300'>
          <div className='w-full h-64'>
          <img className='w-full h-full  object-cover' src="https://uchi.imgix.net/general/anime2.png?crop=focalpoint&domain=uchi.imgix.net&fit=crop&fm=pjpg&fp-x=0.5&fp-y=0.5&h=558&ixlib=php-3.3.1&q=82&usm=20&w=992" alt="" />
          </div>
          <div className='flex flex-col justify-between'>
          <div className='m-6 mb-10 mt-10'>
              <h1 className='text-3xl font-semibold '>Hello</h1>
          </div>
          <div className='m-6 mt-6 mb-10 '>
              <h3 className='text-xl/2' >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium, Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt quae reprehenderit exercitationem aliquam est aut in eum modi sint.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda ea, itaque dicta eos at corporis! sed.</h3>
          </div>
          <div className='m-6 flex mt-10 '>
              <button className='bg-black mb-3 text-white px-8 py-2 text-xl/2 font-semibold rounded-md w-full'>View More</button>
          </div>  
          </div>
      </div>

      <div className='w-[22vw] rounded-lg overflow-hidden flex justify-between flex-col h-[70vh] m-6 mt-10 bg-white border-[1px] border-gray-300'>
          <div className='w-full h-64'>
          <img className='w-full h-full  object-cover' src="https://uchi.imgix.net/general/anime2.png?crop=focalpoint&domain=uchi.imgix.net&fit=crop&fm=pjpg&fp-x=0.5&fp-y=0.5&h=558&ixlib=php-3.3.1&q=82&usm=20&w=992" alt="" />
          </div>
          <div className='flex flex-col justify-between'>
          <div className='m-6 mb-10 mt-10'>
              <h1 className='text-3xl font-semibold '>Collection of Rare Maps</h1>
          </div>
          <div className='m-6 mt-6 mb-10 '>
              <h3 className='text-xl/2' >It houses a rare and fascinating collection of historical maps that provide insights into the region's geography and political landscape over centuries..</h3>
          </div>
          <div className='m-6 flex mt-10 '>
              <button className='bg-black mb-3 text-white px-8 py-2 text-xl/2 font-semibold rounded-md w-full'>View More</button>
          </div>  
          </div>
      </div>

      <div className='w-[22vw] rounded-lg overflow-hidden flex justify-between flex-col h-[70vh] m-6 mt-10 bg-white border-[1px] border-gray-300'>
          <div className='w-full h-64'>
          <img className='w-full h-full  object-cover' src="https://uchi.imgix.net/general/anime2.png?crop=focalpoint&domain=uchi.imgix.net&fit=crop&fm=pjpg&fp-x=0.5&fp-y=0.5&h=558&ixlib=php-3.3.1&q=82&usm=20&w=992" alt="" />
          </div>
          <div className='flex  h-full flex-col justify-between'>
          <div className=' w-full h-20 flex items-center mt-10'>
              <h1 className='text-3xl font-semibold '>Art gallery</h1>
          </div>
          <div className=' overflow-hidden  text-ellipsis w-full flex items-center'>
              <h3 className='text-xl/2' > an exquisite collection of royal artifacts and traditional Rajasthani artIt showcases an exquisite collection of royal artifacts and traditional Rajasthani artIt showcases an exquisite collection of royal artifacts and traditional Rajasthani art</h3>
          </div>
          <div className='m-6 flex mt-10 bg-green-500  '>
              <button className='bg-black mb-3 text-white px-8 py-2 text-xl/2 font-semibold rounded-md w-full'>View More</button>
          </div>  
          </div>
      </div>



      <div className='w-[22vw] rounded-lg overflow-hidden flex justify-between flex-col h-[64vh] m-6 mt-10 bg-white border-[1px] border-gray-300'>
          <div className='w-full h-64'>
          <img className='w-full h-full  object-cover' src="https://uchi.imgix.net/general/anime2.png?crop=focalpoint&domain=uchi.imgix.net&fit=crop&fm=pjpg&fp-x=0.5&fp-y=0.5&h=558&ixlib=php-3.3.1&q=82&usm=20&w=992" alt="" />
          </div>
          <div className='flex h-full flex-col justify-between'>
          <div className=' pl-6 pr-2 w-full h-20 flex items-center mt-10'>
              <h1 className='text-4xl font-semibold '>Art gallery</h1>
          </div>
          <div className='overflow-hidden text-ellipsis w-full flex items-center'>
              <h3 className='text-xl/2 font-semibold pl-6 pr-2' >It showcases an exquisite collection of royal artifacts and traditional Rajasthani art</h3>
          </div>
          <div className='m-6 flex mt-10 '>
              <button className='bg-black mb-3 text-white px-8 py-2 text-xl/2 font-semibold rounded-md w-full'>View More</button>
          </div>  
          </div>
      </div>
    </div>
  )
}

export default Card
