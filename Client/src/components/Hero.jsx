import { Link } from "react-router-dom";
function Hero() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-between overflow-hidden border-1 border-amber-400">

      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover blur-[0.5px] brightness-40"
      >
        <source src="/videos/herosection.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Hero Content */}
      <div className="relative z-10 min-h-[58vh] w-full flex flex-col items-center justify-between text-center px-5 py-12">
<div>
        <p className="text-amber-300 text-lg sm:text-xl mt-5 tracking-widest">
          ॥ ॐ नमो भगवते वासुदेवाय ॥
        </p>

        <h1 className="text-4xl sm:text-4xl font-bold text-white mb-6">
          Welcome to <span className="text-amber-300">Vaikunth</span>
        </h1>
</div>
<div>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
              to="/dashavatar"
              className="px-7 py-3 rounded-full bg-amber-400 text-black font-semibold hover:bg-amber-300 transition">
              Explore Dashavatar
            </Link>

           <Link
          to="/temples"
          className="px-7 py-3 rounded-full border border-amber-400 text-amber-300 font-semibold hover:bg-amber-400 hover:text-black transition">
          Discover Temples
        </Link>
</div>
        </div>
      </div>
    </section>
  );
}

export default Hero;