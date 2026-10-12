import { Link } from "react-router-dom";
const shlok = {
  sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।",
  secondLine: "मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
  meaning:
    "Tumhara adhikaar sirf karm karne par hai, uske fal par nahi. Isliye karm ke fal ki chinta kiye bina apna kartavya karte raho.",
  source: "Shrimad Bhagavad Gita · Adhyay 2, Shlok 47",
};

function ShlokSection() {
  return (
    <section className="px-5 py-20 sm:py-24">
      <div className="mx-auto max-w-4xl rounded-3xl border border-amber-400/40 bg-black/10 px-6 py-12 text-center shadow-2xl backdrop-blur-none sm:px-12">

        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
          Sacred Wisdom
        </p>

        <h2 className="mb-8 text-3xl font-bold text-white sm:text-4xl">
        Pavitra Shlok
        </h2>

        <div className="mb-8 space-y-3 text-xl leading-relaxed text-amber-200 sm:text-2xl">
          <p>{shlok.sanskrit}</p>
          <p>{shlok.secondLine}</p>
        </div>

        <div className="mx-auto mb-6 h-px w-24 bg-amber-400/60" />

        <p className="mx-auto max-w-2xl text-base leading-8 text-gray-200 sm:text-lg">
          {shlok.meaning}
        </p>

        <p className="mt-6 text-sm text-amber-400/80">
          {shlok.source}
        </p>
        <div className="mt-10 text-center">
            <Link
          to="/vishnu-puran"
          className="inline-block rounded-full border border-amber-400 px-7 py-3 text-amber-300 hover:bg-amber-400 hover:text-black transition"
          >
          Explore All Shlok→
        </Link>
        </div>
      </div>
    </section>
  );
}
export default ShlokSection;

