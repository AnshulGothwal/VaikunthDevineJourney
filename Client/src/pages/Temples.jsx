import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Temples() {
  const [temples, setTemples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://vaikunth-backend.onrender.com/api/temples")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch temples");
        }
        return response.json();
      })
      .then((data) => {
        setTemples(data);
      })
      .catch((error) => {
        console.error(error);
        setError("Temples load nahi ho paaye.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section className="min-h-screen px-5 sm:px-10 lg:px-16 py-16">
      <div className="text-center mb-12">
        <p className="text-amber-300 tracking-[4px] uppercase text-sm mb-3">
          Sacred Destinations
        </p>

        <h1 className="text-3xl sm:text-5xl font-bold text-white">
          Explore Sacred <span className="text-amber-300">Temples</span>
        </h1>

        <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
          Discover India's sacred temples, their history, and spiritual significance.
        </p>
      </div>

      {loading && (
        <p className="text-center text-amber-300">
          Loading temples...
        </p>
      )}

      {error && (
        <p className="text-center text-red-400">{error}</p>
      )}

      {!loading && !error && temples.length === 0 && (
        <p className="text-center text-gray-300">
          No temples found.
        </p>
      )}

      <div className="flex flex-wrap justify-center gap-7">
        {temples.map((temple) => (
          <div
            key={temple._id}
            className="w-full sm:w-[calc(50%-14px)] xl:w-[calc(33.333%-19px)] group rounded-2xl border border-amber-400/30 bg-black/40 p-4 hover:border-amber-300 transition duration-300"
          >
            <Link
              to={`/temples/${temple.name.toLowerCase().replace(/\s+/g, "-")}`}
              className="block"
            >
              <div className="overflow-hidden rounded-xl">
                <img
                  src={temple.image}
                  alt={temple.name}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-3">
                <h2 className="text-xl font-bold text-white group-hover:text-amber-300 transition">
                  {temple.name}
                </h2>

                <p className="text-gray-400 text-sm mt-2">
                  📍 {temple.location}
                </p>

                <p className="text-gray-300 text-sm mt-3">
                  {temple.description}
                </p>
              </div>
            </Link>

            <div className="px-3 pb-3">
              <a
                href={temple.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 border border-amber-400/60 rounded-full px-5 py-2 text-sm text-amber-300 hover:bg-amber-400 hover:text-black transition"
              >
                View on Map ↗
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Temples;
