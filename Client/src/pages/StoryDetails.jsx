import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

function StoryDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/stories"
        );

        if (!response.ok) {
          throw new Error("Stories fetch nahi hui");
        }

        const data = await response.json();
        const selectedStory = data.find((item) => item._id === id);

        setStory(selectedStory || null);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [id]);

        useEffect(() => {
        async function checkFavorite() {
          const token = localStorage.getItem("token");
          if (!story?._id || !token) return;
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

            setIsFavorite(
              favorites.stories.some(
                (item) => item._id === story._id
              )
            );
          } catch (error) {
            console.error("Favorite check error:", error);
          }
        }
        checkFavorite();
      }, [story]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black/70 text-white flex items-center justify-center">
        Loading story...
      </div>
    );
  }

  if (!story) {
    return (
      <div className="min-h-screen bg-black/70 text-white text-center p-10">
        <h1 className="text-3xl">Story Not Found</h1>
        <Link to="/vishnu-puran" className="text-amber-400 mt-5 inline-block">
          ← Back to Pauranik Kathayein
        </Link>
      </div>
    );
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
              type: "stories",
              itemId: story._id,
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
    <main className="min-h-screen bg-black/60 text-white px-6 py-16">
      <article className="max-w-4xl mx-auto">
        <Link
          to="/vishnu-puran"
          className="text-amber-400 hover:text-amber-300"
        >
          ← Back to Pauranik Kathayein
        </Link>

        <p className="text-amber-400 uppercase tracking-widest text-sm mt-10">
          {story.category}
        </p>

        <h1 className="text-4xl sm:text-5xl font-serif font-bold mt-4">
          {story.title}
        </h1>

        <p className="text-gray-400 text-lg leading-8 mt-5">
          {story.description}
        </p>
          <button onClick={handleFavorite} disabled={favoriteLoading} className="mt-6 rounded-full border border-amber-400 px-6 py-3 font-semibold text-amber-300 transition hover:bg-amber-400 hover:text-black disabled:opacity-50">
            {favoriteLoading
              ? "Please wait..."
              : isFavorite
              ? "♥ Remove from Favorites"
              : "♡ Add to Favorites"}
          </button>
        <img
          src={story.image}
          alt={story.title}
          className="w-full max-h-[480px] object-cover rounded-2xl mt-10"
        />

        <div className="mt-10 text-gray-200 text-lg leading-9 whitespace-pre-line">
          {story.content}
        </div>
      </article>
    </main>
  );
}

export default StoryDetails;