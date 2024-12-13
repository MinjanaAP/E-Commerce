export default function HeroSection() {
  return (
    <div className="relative my-12 overflow-hidden bg-primary-light section__container">
      <div className="pt-12 pb-64 sm:pb-32 sm:pt-20 lg:pb-40 lg:pt-32">
        <div className="relative px-4 mx-auto max-w-7xl sm:static sm:px-6 lg:px-8">
          <div className="sm:max-w-lg">
            <h1 className="text-2xl tracking-tight text-gray-900 font-custom sm:text-6xl">
              Discover the Latest Trends
            </h1>
            <p className="mt-4 text-lg text-gray-600 font-secondary">
              Step into the season with our curated collection of must-have styles. From cutting-edge designs to timeless classics, explore fashion that defines you and sets you apart.
            </p>
          </div>
          <div>
            <div className="mt-10">
              <div
                aria-hidden="true"
                className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
              >
                <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                  <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="grid grid-cols-1 shrink-0 gap-y-6 lg:gap-y-8">
                      <div className="h-64 overflow-hidden rounded-lg w-44 sm:opacity-0 lg:opacity-100">
                        <img
                          alt=""
                          src="https://tailwindui.com/plus/img/ecommerce-images/home-page-03-hero-image-tile-01.jpg"
                          className="object-cover size-full"
                        />
                      </div>
                      <div className="h-64 overflow-hidden rounded-lg w-44">
                        <img
                          alt=""
                          src="https://images.pexels.com/photos/15134001/pexels-photo-15134001/free-photo-of-a-woman-in-a-white-ruffled-dress-and-hat.jpeg?auto=compress&cs=tinysrgb&w=600"
                          className="object-cover size-full"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 shrink-0 gap-y-6 lg:gap-y-8">
                      <div className="h-64 overflow-hidden rounded-lg w-44">
                        <img
                          alt=""
                          src="https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=600"
                          className="object-cover size-full"
                        />
                      </div>
                      <div className="h-64 overflow-hidden rounded-lg w-44">
                        <img
                          alt=""
                          src="https://tailwindui.com/plus/img/ecommerce-images/home-page-03-hero-image-tile-04.jpg"
                          className="object-cover size-full"
                        />
                      </div>
                      <div className="h-64 overflow-hidden rounded-lg w-44">
                        <img
                          alt=""
                          src="https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=600"
                          className="object-cover size-full"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 shrink-0 gap-y-6 lg:gap-y-8">
                      <div className="h-64 overflow-hidden rounded-lg w-44">
                        <img
                          alt=""
                          src="https://tailwindui.com/plus/img/ecommerce-images/home-page-03-hero-image-tile-06.jpg"
                          className="object-cover size-full"
                        />
                      </div>
                      <div className="h-64 overflow-hidden rounded-lg w-44">
                        <img
                          alt=""
                          src="https://images.pexels.com/photos/28570315/pexels-photo-28570315/free-photo-of-young-woman-with-tablet-and-headphones.jpeg?auto=compress&cs=tinysrgb&w=600"
                          className="object-cover size-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href="#"
                className="px-16 py-4 text-black border border-black bg-none hover:bg-gray-800 hover:text-white font-custom"
              >
                Explore Trends
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
