import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function VishnuPuran() {
  const [stories, setStories] = useState([]);
  const [shloks, setShloks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [storiesRes, shloksRes] = await Promise.all([
          fetch("http://localhost:5000/api/stories"),
          fetch("http://localhost:5000/api/shloks"),
        ]);

        if (!storiesRes.ok || !shloksRes.ok) {
          throw new Error("Data fetch nahi ho paya");
        }

        const storiesData = await storiesRes.json();
        const shloksData = await shloksRes.json();

        setStories(storiesData);
        setShloks(shloksData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#08090d] text-white flex items-center justify-center">
        Loading divine wisdom...
      </div>
    );
  }

  return (
    <main className="min-h-screen text-white bg-black/60">
      {/* Hero Section */}
      <section className="px-6 py-24 text-center bg-white/20">
        <p className="text-amber-400 uppercase tracking-[0.35em] text-sm mb-4">
          Shree Vishnu Ki Puranic Kathayein!!
        </p>

        <h1 className="text-4xl sm:text-6xl font-serif font-bold">
          Vishnu <span className="text-amber-400">Puran</span>
        </h1>

        <p className="text-gray-200 max-w-2xl mx-auto mt-6 leading-7">
          Discover timeless stories, sacred teachings and divine wisdom
          inspired by Hindu scriptures and traditions.
        </p>
      </section>

      {/* Stories Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-10">
          <p className="text-amber-400 text-sm uppercase tracking-widest">
            Sacred Tales
          </p>

          <h2 className="text-3xl sm:text-4xl font-serif mt-2">
            Pauranik Kathayein
          </h2>
        </div>

        {stories.length === 0 ? (
          <p className="text-gray-400">
            Abhi koi story available nahi hai.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {stories.map((story) => (
              <article
                key={story._id}
                className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden hover:border-amber-400/50 transition duration-300"
              >
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-56 object-cover object-top"
                />

                <div className="p-6">
                  <p className="text-amber-400 text-xs uppercase tracking-widest">
                    {story.category}
                  </p>

                  <h3 className="text-xl font-semibold mt-3">
                    {story.title}
                  </h3>

                  <p className="text-gray-300 mt-3 leading-7">
                    {story.description}
                  </p>

                  <Link
                    to={`/vishnu-puran/${story._id}`}
                    className="inline-block mt-5 text-amber-400 hover:text-amber-300 transition"
                  >
                    Read More →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Shloks Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-10">
          <p className="text-amber-400 text-sm uppercase tracking-widest">
            Sacred Verses
          </p>

          <h2 className="text-3xl sm:text-4xl font-serif mt-2">
            Pauranic Shlokas
          </h2>

          <p className="text-gray-300 mt-3">
            Shree Vishnu Shlok And Stotram.
          </p>
        </div>

        {shloks.length === 0 ? (
          <p className="text-gray-400">
            Abhi koi shlok available nahi hai.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {shloks.map((shlok) => (
              <article
                key={shlok._id}
                className="border border-amber-400/20 bg-amber-400/[0.04] rounded-2xl p-7"
              >
                <h3 className="text-xl font-semibold text-amber-300">
                  {shlok.title}
                </h3>

                <p className="text-xl sm:text-2xl text-center leading-10 font-serif mt-6 whitespace-pre-line">
                  {shlok.sanskrit}
                </p>

                <div className="h-px bg-white/10 my-6" />

                <p className="text-gray-300 leading-7">
                  {shlok.meaning}
                </p>

                <p className="text-sm text-gray-400 mt-5">
                  {shlok.source}
                  {shlok.chapter && ` · Chapter ${shlok.chapter}`}
                  {shlok.verse && ` · Verse ${shlok.verse}`}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default VishnuPuran;