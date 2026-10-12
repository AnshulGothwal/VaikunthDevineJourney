import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Dashavatar(){
    const [Avatar, setAvatar] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedYuga, setSelectedYuga] = useState("All");

    useEffect(()=>{
        fetch("http://localhost:5000/api/avatars")
        .then((res)=> res.json())
        .then((data)=> setAvatar(data))
        .catch((error)=> console.log("Avatar fetch error:",error));
    },[]);
    
    const filteredAvatars = Avatar.filter((data) =>
        {const matchesSearch = data.name .toLowerCase()
            .includes(search.toLowerCase().trim());
             const matchesYuga = 
             selectedYuga === "All" || data.yuga === selectedYuga; 
             return matchesSearch && matchesYuga; });
   
    return(
        <div className="p-8 text-white">
        <div className="px-4 py-8 sm:px-8">
            <section className="relative flex min-h-[55vh] items-center justify-center overflow-hidden rounded-3xl border border-amber-400/40 text-center">
            {/* Background Image */}
            <img
                src="/images/avatars/DashavatarHero.jpg"
                alt=""
                className="absolute inset-0 h-full w-full object-cover object-center"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Hero Content */}
            <div className="relative z-10 max-w-3xl px-5 py-12">
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-amber-300 sm:text-base">
                The Divine Incarnations
                </p>

                <h1 className="mb-6 text-4xl font-bold text-white sm:text-5xl md:text-6xl">
                Dashavatar
                <span className="mt-2 block text-amber-300">
                    Lord Vishnu Ke 10 Roop
                </span>
                </h1>

                <p className="mx-auto max-w-2xl text-base leading-7 text-gray-100 sm:text-lg">
                Adharm ka naash aur dharm ki raksha karne ke liye Bhagwan Vishnu ke
                divya avatars ki kahani, mahatva aur unse judi amar seekh ko jaano.
                </p>

                <a
                href="#avatar-list"
                className="mt-8 inline-block rounded-full border border-amber-300 bg-amber-400 px-7 py-3 font-semibold text-black transition duration-300 hover:bg-transparent hover:text-amber-300"
                >
                Explore the Avatars ↓
                </a>
            </div>
            </section>
        </div>

        {/* /search */}
            <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <input
                            type="text"
                            placeholder="Search avatar..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="rounded-xl border border-amber-400/30 bg-black/50 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-amber-400" />

                        <select
                                value={selectedYuga}
                                onChange={(e) => setSelectedYuga(e.target.value)}
                                className="rounded-xl border border-amber-400/30 bg-gray-950 px-4 py-3 text-white outline-none focus:border-amber-400">
                                <option value="All">All Yugas</option>
                                <option value="Satya Yuga">Satya Yuga</option>
                                <option value="Treta Yuga">Treta Yuga</option>
                                <option value="Dwapara Yuga">Dwapara Yuga</option>
                                <option value="Kali Yuga">Kali Yuga</option>
                        </select>
            </div>

            {/* cards */}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" id="avatar-list">
                {filteredAvatars.map((data) => (
                        <div
                        key={data._id}
                        className="group overflow-hidden rounded-2xl border border-amber-400/20 bg-black/60 transition duration-300 hover:-translate-y-2 hover:border-amber-400 hover:shadow-xl hover:shadow-amber-500/10"
                        >
                        <div className="relative h-64 overflow-hidden">
                            <img
                            src={data.image}
                            alt={data.name}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                            <span className="absolute right-3 top-3 rounded-full border border-amber-300/40 bg-black/70 px-3 py-1 text-xs font-medium text-amber-300">
                            {data.yuga}
                            </span>

                            <div className="absolute bottom-4 left-4">
                            <h2 className="text-2xl font-bold text-amber-300">
                                {data.name}
                            </h2>
                            <p className="mt-1 text-sm text-gray-200">{data.title}</p>
                            </div>
                    </div>

                    <div className="p-5">
                            <p className="text-sm leading-6 text-gray-300">
                            {data.description}
                            </p>

                            <div className="mt-4 border-t border-amber-400/20 pt-4">
                            <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                                Significance
                            </p>
                            <p className="mt-2 text-sm leading-6 text-gray-400">
                                {data.significance}
                            </p>
                            </div>

                        <Link
                        to={`/dashavatar/${encodeURIComponent(data.name)}`}
                        className="mt-5 block w-full rounded-lg border border-amber-400/60 px-4 py-2.5 text-center font-medium text-amber-300 transition hover:bg-amber-400 hover:text-black"
                        >
                        Explore Avatar →
                        </Link>

                    </div>
                    </div>
                ))}
        </div>


        </div>
    );
}
export default Dashavatar