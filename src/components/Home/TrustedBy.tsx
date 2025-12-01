import React from 'react'

function TrustedBy() {
  return (
    <section className="flex justify-center flex-col px-5 py-12 bg-[#F3EFE8]">
      {/* Title */}
      <div className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-center">
        <h1 className="leading-snug sm:leading-[50px] lg:leading-[60px]">
          Trusted By Companies Around <br className="hidden sm:block" /> The World
        </h1>
      </div>

      {/* Map */}
      <div className="py-12">
        <img
          src="/assets/images/map/mapimage.png"
          alt="World Map"
          className="mx-auto w-full max-w-4xl h-auto"
        />
      </div>

      {/* Logos */}
      <div className="py-12">
        <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
          <img src="/assets/images/map/attio.png" alt="Attio" className="h-10 sm:h-12 w-28 sm:w-36 object-contain" />
          <img src="/assets/images/map/cal.png" alt="Cal" className="h-10 sm:h-12 w-28 sm:w-36 object-contain" />
          <img src="/assets/images/map/check.png" alt="Check" className="h-10 sm:h-12 w-28 sm:w-36 object-contain" />
          <img src="/assets/images/map/chronicle.png" alt="Chronicle" className="h-10 sm:h-12 w-28 sm:w-36 object-contain" />
          <img src="/assets/images/map/crowd.png" alt="Crowd" className="h-10 sm:h-12 w-28 sm:w-36 object-contain" />
          <img src="/assets/images/map/epliate.png" alt="Epliate" className="h-10 sm:h-12 w-28 sm:w-36 object-contain" />
        
        </div>
        <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
            <img src="/assets/images/map/hashnode.png" alt="Hashnode" className="h-10 sm:h-12 w-28 sm:w-36 object-contain" />
          <img src="/assets/images/map/lugg.png" alt="Lugg" className="h-10 sm:h-12 w-28 sm:w-36 object-contain" />
          <img src="/assets/images/map/prisma.png" alt="Prisma" className="h-10 sm:h-12 w-28 sm:w-36 object-contain" />
          <img src="/assets/images/map/super.png" alt="Super" className="h-10 sm:h-12 w-28 sm:w-36 object-contain" />
          <img src="/assets/images/map/tinybird.png" alt="Tinybird" className="h-10 sm:h-12 w-28 sm:w-36 object-contain" />
        </div>
      </div>
    </section>
  )
}

export default TrustedBy
