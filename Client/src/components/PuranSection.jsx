import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function PuranSection() {
const [stories, setStories] = useState([]);

useEffect(() => {
const fetchStories = async () => {
try {
const response = await fetch("https://vaikunth-backend.onrender.com/api/stories");
const data = await response.json();

    if (response.ok) {
      setStories(Array.isArray(data) ? data.slice(0, 3) : []);
    }
  } catch (error) {
    console.error("Error fetching stories:", error);
  }
};

fetchStories();


}, []);

return ( <section className="px-5 py-16 sm:px-10 lg:px-16"> <div className="mb-10 text-center"> <p className="mb-3 text-sm uppercase tracking-[4px] text-amber-300">
Ancient Wisdom </p>

```
    <h2 className="text-3xl font-bold text-white sm:text-5xl">
      Tales of <span className="text-amber-300">Vishnu Puran</span>
    </h2>

    <p className="mx-auto mt-4 max-w-2xl text-gray-300">
      Discover timeless stories of devotion, courage, dharma and divine
      protection.
    </p>
  </div>

  <div className="flex flex-wrap justify-center gap-7">
    {stories.map((story, index) => (
      <Link
        key={story._id}
        to={`/vishnu-puran/${story._id}`}
        className="group block w-full rounded-2xl border border-amber-400/30 bg-black/40 p-7 backdrop-blur-[2px] transition duration-300 hover:border-amber-300 hover:bg-black/60 sm:w-[calc(50%-14px)] xl:w-[calc(33.333%-19px)]"
      >
        <p className="mb-5 text-sm text-amber-300/70">
          STORY {String(index + 1).padStart(2, "0")}
        </p>

        <h3 className="mb-4 text-2xl font-bold text-white transition group-hover:text-amber-300">
          {story.title}
        </h3>

        <p className="text-sm leading-7 text-gray-300">
          {story.description}
        </p>

        <div className="mt-6 text-amber-300 transition group-hover:text-amber-200">
          Read Story →
        </div>
      </Link>
    ))}
  </div>

  <div className="mt-10 text-center">
    <Link
      to="/vishnu-puran"
      className="inline-block rounded-full border border-amber-400 px-7 py-3 text-amber-300 transition hover:bg-amber-400 hover:text-black"
    >
      Explore All Puran →
    </Link>
  </div>
</section>
);
}

export default PuranSection;
