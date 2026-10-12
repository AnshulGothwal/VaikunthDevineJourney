import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function TempleSection() {
const [temples, setTemples] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
fetch("https://vaikunth-backend.onrender.com/api/temples")
.then((response) => {
if (!response.ok) {
throw new Error("Failed to fetch temples");
}
return response.json();
})
.then((data) => {
setTemples(data.slice(0, 3));
})
.catch((error) => {
console.error("Error fetching temples:", error);
})
.finally(() => {
setLoading(false);
});
}, []);

return ( <section className="px-5 py-16 sm:px-10 lg:px-16"> <div className="mb-10 text-center"> <p className="mb-3 text-sm uppercase tracking-[4px] text-amber-300">
Sacred Destinations </p>

    <h2 className="text-3xl font-bold text-white sm:text-5xl">
      Sacred <span className="text-amber-300">Temples</span>
    </h2>

    <p className="mx-auto mt-4 max-w-2xl text-gray-300">
      Explore the sacred abodes of Lord Vishnu and discover the
      spiritual beauty of India's ancient temples.
    </p>
  </div>

  {loading && (
    <p className="text-center text-amber-300">Loading temples...</p>
  )}

  {!loading && (
    <div className="flex flex-wrap justify-center gap-7">
      {temples.map((temple) => (
        <div
          key={temple._id}
          className="group w-full rounded-2xl border border-amber-400/30 bg-black/40 p-4 backdrop-blur-[2px] transition duration-300 hover:border-amber-300 sm:w-[calc(50%-14px)] xl:w-[calc(33.333%-19px)]"
        >
          <Link to={`/temples/${temple.name.toLowerCase().replace(/\s+/g, "-")}`}>
            <div className="overflow-hidden rounded-xl">
              <img
                src={temple.image}
                alt={temple.name}
                className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <div className="p-3">
              <h3 className="text-xl font-bold text-white transition group-hover:text-amber-300">
                {temple.name}
              </h3>

              <p className="mt-2 text-sm text-gray-400">
                📍 {temple.location}
              </p>

              <p className="mt-4 text-sm text-amber-300">
                Explore Temple →
              </p>
            </div>
          </Link>

          {temple.mapLink && (
            <a
              href={temple.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 inline-block rounded-full border border-amber-400/60 px-5 py-2 text-sm text-amber-300 transition hover:bg-amber-400 hover:text-black"
            >
              View on Map ↗
            </a>
          )}
        </div>
      ))}
    </div>
  )}

  <div className="mt-10 text-center">
    <Link
      to="/temples"
      className="inline-block rounded-full border border-amber-400 px-7 py-3 text-amber-300 transition hover:bg-amber-400 hover:text-black"
    >
      Explore All Temples →
    </Link>
  </div>
</section>

);
}

export default TempleSection;
