import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function DashavatarSection() {
const [avatars, setAvatars] = useState([]);

useEffect(() => {
const fetchAvatars = async () => {
try {
const response = await fetch("http://localhost:5000/api/avatars");
const data = await response.json();

    if (response.ok) {
      setAvatars(Array.isArray(data) ? data.slice(0, 4) : []);
    }
  } catch (error) {
    console.error("Error fetching avatars:", error);
  }
};

fetchAvatars();

}, []);

return ( <section className="px-5 py-16 sm:px-10 lg:px-16"> <div className="mb-10 text-center"> <p className="mb-3 text-sm uppercase tracking-[4px] text-amber-300">
Divine Incarnations </p>

```
    <h2 className="text-3xl font-bold text-white sm:text-5xl">
      Dus-<span className="text-amber-300">Avatars</span>
    </h2>

    <p className="mx-auto mt-4 max-w-2xl text-gray-300">
      Discover the divine incarnations of Lord Vishnu that restore balance
      and protect the universe.
    </p>
  </div>

  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
    {avatars.map((avatar, index) => (
      <Link
        key={avatar._id}
        to={`/dashavatar/${encodeURIComponent(avatar.name)}`}
        className="group block rounded-2xl border border-amber-400/30 bg-black/40 p-6 backdrop-blur-[2px] transition duration-300 hover:border-amber-300 hover:bg-black/60"
      >
        <img
          src={avatar.image}
          alt={avatar.name}
          className="mb-5 h-44 w-full rounded-xl border border-amber-400/20 object-cover transition duration-300 group-hover:scale-105 group-hover:border-amber-300/60"
        />

        <p className="mb-5 text-sm text-amber-300/70">
          AVATAR {String(index + 1).padStart(2, "0")}
        </p>

        <h3 className="mb-3 text-xl font-bold text-white transition group-hover:text-amber-300">
          {avatar.name}
        </h3>

        <p className="text-sm leading-6 text-gray-300">
          {avatar.description}
        </p>

        <div className="mt-6 text-sm text-amber-300">
          Discover more →
        </div>
      </Link>
    ))}
  </div>

  <div className="mt-10 text-center">
    <Link
      to="/dashavatar"
      className="inline-block rounded-full border border-amber-400 px-7 py-3 text-amber-300 transition hover:bg-amber-400 hover:text-black"
    >
      Explore All Avatars →
    </Link>
  </div>
</section>

);
}

export default DashavatarSection;
