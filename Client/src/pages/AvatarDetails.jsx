import { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

function AvatarDetail() {
  const { name } = useParams();

  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const avatarRes = await fetch(
          "http://localhost:5000/api/avatars"
        );

        const avatarData = await avatarRes.json();

        const selectedAvatar = avatarData.find(
          (item) => item.name.toLowerCase() === name.toLowerCase()
        );

        setAvatar(selectedAvatar || null);
      } catch (error) {
        console.error("Avatar detail fetch error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [name]);

  useEffect(() => {
  async function checkFavorite() {
    const token = localStorage.getItem("token");
    if (!avatar?._id || !token) return;
    try {
      const response = await fetch(
        "http://localhost:5000/api/favorites/list",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) return;
      const favorites = await response.json();
      const exists = favorites.avatars.some(
        (item) => item._id === avatar._id
      );
      setIsFavorite(exists);
    } catch (error) {
      console.error("Favorite check error:", error);
    }}checkFavorite();
}, [avatar]);

const handleFavorite = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login");
    return;
  }
  setFavoriteLoading(true);
  try {
    const response = await fetch(
      `http://localhost:5000/api/favorites/${
        isFavorite ? "remove" : "add"
      }`,
      {
        method: isFavorite ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          type: "avatars",
          itemId: avatar._id,
        }),
      }
    );
    const data = await response.json();
    console.log("Favorite response:", response.status, data);
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
  if (loading) {
    return (
      <p className="p-10 text-center text-amber-300">
        Loading...
      </p>
    );
  }

  if (!avatar) {
    return (
      <p className="p-10 text-center text-white">
        Avatar not found.
      </p>
    );
  }

  return (
    <div className="min-h-screen px-4 py-10 text-white sm:px-8">
      {/* Hero */}
      <section className="relative flex min-h-[50vh] items-end overflow-hidden rounded-3xl border border-amber-400/30">
        <img
          src={avatar.image}
          alt={avatar.name}
          className="absolute inset-0 h-full w-full object-cover object-top"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        <div className="relative z-10 p-6 sm:p-10">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-amber-300">
            {avatar.yuga}
          </p>

          <h1 className="text-4xl font-bold text-amber-300 sm:text-6xl">
            {avatar.name}
          </h1>

          <p className="mt-3 text-lg text-gray-200">
            {avatar.title}
          </p>
          <button
                onClick={handleFavorite}
                disabled={favoriteLoading}
                className="mt-6 rounded-full border border-amber-400 px-6 py-3 font-semibold text-amber-300 transition hover:bg-amber-400 hover:text-black disabled:opacity-50"
              >
                {favoriteLoading
                  ? "Please wait..."
                  : isFavorite
                  ? "♥ Remove from Favorites"
                  : "♡ Add to Favorites"}
              </button>
        </div>
      </section>

      {/* Description */}
      <section className="mx-auto mt-10 max-w-4xl">
        <h2 className="mb-4 text-2xl font-bold text-amber-300">
          About the Avatar
        </h2>

        <p className="leading-8 text-gray-300">
          {avatar.description}
        </p>

        <h2 className="mb-4 mt-8 text-2xl font-bold text-amber-300">
          Significance
        </h2>

        <p className="leading-8 text-gray-300">
          {avatar.significance}
        </p>
      </section>

      {/* Avatar Story */}
      <section className="mx-auto mt-12 max-w-4xl rounded-2xl border border-amber-400/20 bg-black/40 p-6 sm:p-8">
        <h2 className="mb-5 text-2xl font-bold text-amber-300 sm:text-3xl">
          {avatar.name} Ki Katha
        </h2>

        {avatar.content ? (
          <div className="whitespace-pre-line leading-8 text-gray-200">
            {avatar.content}
          </div>
        ) : (
          <p className="text-gray-400">
            Is avatar ki detailed katha jald hi add ki jayegi.
          </p>
        )}
      </section>
            <Link
                to="/dashavatar"
                className="mb-1 inline-block text-amber-300 transition hover:text-amber-200"
                >
                ← Back to Dashavatar
            </Link>
    </div>
  );
}

export default AvatarDetail;

