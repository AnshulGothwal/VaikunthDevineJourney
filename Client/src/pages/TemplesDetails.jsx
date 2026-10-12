import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

function TempleDetails() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [temple, setTemple] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  useEffect(() => {
    fetch("https://vaikunth-backend.onrender.com/api/temples")
      .then((res) => res.json())
      .then((data) => {
        const foundTemple = data.find(
          (item) =>
            item.name.toLowerCase().replace(/\s+/g, "-") ===
            name.toLowerCase()
        );

        setTemple(foundTemple || null);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [name]);

    useEffect(() => {
    async function checkFavorite() {
      const token = localStorage.getItem("token");
      if (!temple?._id || !token) return;
      try {
        const response = await fetch(
          "https://vaikunth-backend.onrender.com/api/favorites/list",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) return;
        const favorites = await response.json();
        setIsFavorite(
          favorites.temples.some(
            (item) => item._id === temple._id
          )
        );
      } catch (error) {
        console.error("Favorite check error:", error);
      }
    }
    checkFavorite();
  }, [temple]);

  if (loading) {
    return <p className="text-center text-amber-300 py-20">Loading temple...</p>;
  }

  if (!temple) {
    return <p className="text-center text-white py-20">Temple not found.</p>;
  }

  const handleFavorite = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");
    return;
  }

  setFavoriteLoading(true);

  try {
    const response = await fetch(
      `https://vaikunth-backend.onrender.com/api/favorites/${
        isFavorite ? "remove" : "add"
      }`,
      {
        method: isFavorite ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          type: "temples",
          itemId: temple._id,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Favorite update failed");
    }

    setIsFavorite(!isFavorite);
  } catch (error) {
    console.error("Favorite error:", error);
    alert(error.message);
  } finally {
    setFavoriteLoading(false);
  }
};

  return (
    <section className="min-h-screen px-5 sm:px-10 lg:px-16 py-16 text-white">
      <Link
        to="/temples"
        className="inline-block mb-8 text-amber-300 hover:text-amber-200"
      >
        ← Back to Temples
      </Link>

      <div className="max-w-5xl mx-auto">
        <img
          src={temple.image}
          alt={temple.name}
          className="w-full h-72 sm:h-96 object-cover rounded-2xl"
        />

        <h1 className="text-3xl sm:text-5xl font-bold text-amber-300 mt-8">
          {temple.name}
        </h1>

        <p className="text-gray-300 mt-4">
          📍 {temple.location}
        </p>
        <button onClick={handleFavorite} disabled={favoriteLoading} className="mt-6 rounded-full border border-amber-400 px-6 py-3 font-semibold text-amber-300 transition hover:bg-amber-400 hover:text-black disabled:opacity-50" >
          {favoriteLoading
            ? "Please wait..."
            : isFavorite
            ? "♥ Remove from Favorites"
            : "♡ Add to Favorites"}
        </button>

        <p className="text-gray-300 leading-8 mt-6">
          {temple.history}
        </p>

        <a
          href={temple.mapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-8 rounded-full bg-amber-400 px-6 py-3 text-black hover:bg-amber-300 transition"
        >
          View on Google Maps ↗
        </a>
      </div>
    </section>
  );
}

export default TempleDetails;

