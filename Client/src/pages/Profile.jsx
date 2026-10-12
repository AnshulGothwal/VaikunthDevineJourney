import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [favorites, setFavorites] = useState({
            avatars: [],
            temples: [],
            stories: [],
});

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(
          "https://vaikunth-backend.onrender.com/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load profile");
        }

        setUser(data.user || data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  useEffect(() => {
  async function fetchFavorites() {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const response = await fetch(
        "https://vaikunth-backend.onrender.com/api/favorites/list",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to load favorites");
      }
      setFavorites({
        avatars: data.avatars || [],
        temples: data.temples || [],
        stories: data.stories || [],
      });
    } catch (error) {
      console.error("Favorites fetch error:", error);
    }
  }
  fetchFavorites();
}, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#080808] text-amber-300">
        Loading your profile...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#080808] px-4 text-center text-white">
        <p className="text-red-400">{error}</p>

        <button
          onClick={() => navigate("/login")}
          className="rounded-lg bg-amber-400 px-5 py-2 font-semibold text-black"
        >
          Login Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] px-4 py-10 text-white sm:px-8">

      {/* Page Heading */}
      <div className="mx-auto mb-10 max-w-6xl">
        <p className="text-sm tracking-[3px] text-amber-400">
          YOUR PERSONAL SPACE
        </p>

        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
          My Dashboard
        </h1>

        <p className="mt-2 text-gray-400">
          Welcome to your divine journey with Vaikunth.
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[260px_1fr]">

        {/* Sidebar */}
        <aside className="h-fit rounded-2xl border border-amber-400/20 bg-[#17140f] p-5">

          <div className="mb-6 flex flex-col items-center border-b border-gray-700 pb-6">

            <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-2 border-amber-400 bg-[#292116] text-4xl">
              {user?.profileImage ? (
                <img
                  src={user.profileImage}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                "🪷"
              )}
            </div>

            <h2 className="mt-4 text-xl font-semibold">
              {user?.name || "Devotee"}
            </h2>

            <p className="mt-1 break-all text-center text-sm text-gray-400">
              {user?.email}
            </p>
          </div>

          <nav className="space-y-2">

            <div className="rounded-lg bg-amber-400/10 px-4 py-3 font-medium text-amber-300">
              👤 My Profile
            </div>

            <button
              onClick={() =>
                document.getElementById("favorites")?.scrollIntoView({
                  behavior: "smooth",
                })
              }
              className="w-full rounded-lg px-4 py-3 text-left text-gray-300 transition hover:bg-white/5 hover:text-amber-300"
            >
              ❤️ My Favorites
            </button>

            <Link
              to="/"
              className="block rounded-lg px-4 py-3 text-gray-300 transition hover:bg-white/5 hover:text-amber-300"
            >
              🏠 Explore Vaikunth
            </Link>

          </nav>
        </aside>

        {/* Main User Panel */}
        <main className="space-y-6">

          <section className="rounded-2xl border border-amber-400/20 bg-[#17140f] p-6 sm:p-8">

            <p className="text-sm font-medium text-amber-400">
              ACCOUNT OVERVIEW
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              Welcome, {user?.name || "Devotee"}!
            </h2>

            <p className="mt-3 leading-7 text-gray-400">
              Yahan se tum apni profile details aur favorite
              temples, avatars aur Vishnu Puran stories manage kar sakte ho.
            </p>

          </section>

          <section className="rounded-2xl border border-gray-800 bg-[#11100e] p-6 sm:p-8">

            <h2 className="text-xl font-bold text-amber-300">
              Personal Information
            </h2>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">

              <div className="rounded-xl bg-white/5 p-4">
                <p className="text-sm text-gray-400">Full Name</p>
                <p className="mt-2 break-words font-medium">
                  {user?.name || "Not available"}
                </p>
              </div>

              <div className="rounded-xl bg-white/5 p-4">
                <p className="text-sm text-gray-400">Email Address</p>
                <p className="mt-2 break-all font-medium">
                  {user?.email || "Not available"}
                </p>
              </div>

            </div>

          </section>

          {/* Favorites Section */}
          <section
            id="favorites"
            className="scroll-mt-24 rounded-2xl border border-amber-400/20 bg-[#17140f] p-6 sm:p-8"
          >

            <h2 className="text-xl font-bold text-amber-300">
              ❤️ My Favorites
            </h2>

            <p className="mt-3 leading-7 text-gray-400">
              Tumhare favorite temples, Dashavatar aur stories
              yahan display honge.
            </p>
            <div className="mt-6 space-y-8">

  {/* Avatars */}
  <div>
    <h3 className="mb-4 text-lg font-semibold text-amber-300">
      🪷 Favorite Avatars
    </h3>

    {favorites.avatars.length === 0 ? (
      <p className="text-gray-400">No favorite avatars yet.</p>
    ) : (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {favorites.avatars.map((avatar) => (
          <div
            key={avatar._id}
            className="overflow-hidden rounded-xl border border-amber-400/20 bg-black/30"
          >
            <img
              src={avatar.image}
              alt={avatar.name}
              className="h-44 w-full object-cover"
            />

            <div className="p-4">
              <h4 className="font-semibold text-white">
                {avatar.name}
              </h4>

              <p className="mt-2 text-sm text-gray-400">
                {avatar.title}
              </p>

              <Link
                to={`/dashavatar/${encodeURIComponent(avatar.name)}`}
                className="mt-4 inline-block text-amber-300 hover:text-amber-200"
              >
                View Details →
              </Link>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>

  {/* Temples */}
  <div>
    <h3 className="mb-4 text-lg font-semibold text-amber-300">
      🛕 Favorite Temples
    </h3>

    {favorites.temples.length === 0 ? (
      <p className="text-gray-400">No favorite temples yet.</p>
    ) : (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {favorites.temples.map((temple) => (
          <div
            key={temple._id}
            className="overflow-hidden rounded-xl border border-amber-400/20 bg-black/30"
          >
            <img
              src={temple.image}
              alt={temple.name}
              className="h-44 w-full object-cover"
            />

            <div className="p-4">
              <h4 className="font-semibold text-white">
                {temple.name}
              </h4>

              <p className="mt-2 text-sm text-gray-400">
                {temple.location}
              </p>

              <Link
                to={`/temples/${encodeURIComponent(temple.name)}`}
                className="mt-4 inline-block text-amber-300 hover:text-amber-200"
              >
                View Details →
              </Link>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>

  {/* Stories */}
  <div>
    <h3 className="mb-4 text-lg font-semibold text-amber-300">
      📖 Favorite Stories
    </h3>

    {favorites.stories.length === 0 ? (
                <p className="text-gray-400">No favorite stories yet.</p>
                ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {favorites.stories.map((story) => (
                    <div key={story._id} className="overflow-hidden rounded-xl border border-amber-400/20 bg-black/30">
                        <img src={story.image} alt={story.title} className="h-44 w-full object-cover"/>
                        <div className="p-4">
                            <h4 className="font-semibold text-white">
                                {story.title}
                             </h4>
                        <p className="mt-2 text-sm text-gray-400">
                            {story.description}
                        </p>
                        <Link to={`/vishnu-puran/${story._id}`} className="mt-4 inline-block text-amber-300 hover:text-amber-200" >
                            Read Story →
                        </Link>
                        </div>
                    </div>
                    ))}
                </div>
                )}
            </div>

            </div>
            
          </section>

        </main>
      </div>
    </div>
  );
}

export default Profile;