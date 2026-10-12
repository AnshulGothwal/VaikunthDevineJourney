import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
const navigate = useNavigate();

const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");
const [loading, setLoading] = useState(false);

const handleSignup = async (e) => {
e.preventDefault();
setError("");
setLoading(true);
try {
  const response = await fetch(
    "http://localhost:5000/api/users/signup",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Signup failed");
  }

  navigate("/login");
} catch (error) {
  setError(
    error.message === "Failed to fetch"
      ? "Server connection failed. Check your backend."
      : error.message
  );
} finally {
  setLoading(false);
}


};

return ( <div className="min-h-screen flex items-center justify-center bg-[#080808] px-4 py-12"> <div className="w-full max-w-md rounded-2xl border border-amber-400/30 bg-[#17140f] p-6 sm:p-10 shadow-2xl">
    <Link
      to="/"
      className="block text-center text-3xl font-bold text-amber-300"
    >
      🪷 Vaikunth
    </Link>

    <p className="mt-2 text-center text-xs tracking-[3px] text-gray-400">
      YOUR DIVINE JOURNEY
    </p>

    <div className="my-7 flex items-center gap-3">
      <div className="h-px flex-1 bg-amber-400/30"></div>
      <span className="text-amber-300">✦</span>
      <div className="h-px flex-1 bg-amber-400/30"></div>
    </div>

    <h1 className="text-center text-2xl font-bold text-white sm:text-3xl">
      Create Your Account
    </h1>

    <p className="mt-3 mb-8 text-center text-sm leading-6 text-gray-400">
      Join Vaikunth and explore the divine world of Lord Vishnu.
    </p>

    <form onSubmit={handleSignup} className="space-y-5">

      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-medium text-amber-100"
        >
          Full Name
        </label>

        <input
          id="name"
          type="text"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          minLength={2}
          required
          className="w-full rounded-lg border border-gray-700 bg-[#0d0c0a] px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-amber-100"
        >
          Email Address
        </label>

        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full rounded-lg border border-gray-700 bg-[#0d0c0a] px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-amber-100"
        >
          Password
        </label>

        <input
          id="password"
          type="password"
          placeholder="Minimum 8 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={8}
          required
          className="w-full rounded-lg border border-gray-700 bg-[#0d0c0a] px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
        />
      </div>

      {error && (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-gradient-to-r from-amber-300 to-yellow-500 py-3 font-bold text-black transition hover:brightness-110 disabled:cursor-wait disabled:opacity-60"
      >
        {loading ? "Creating Account..." : "Create Account"}
      </button>

    </form>

    <p className="mt-7 text-center text-sm text-gray-400">
      Already have an account?{" "}
      <Link
        to="/login"
        className="font-semibold text-amber-300 hover:text-amber-200"
      >
        Login
      </Link>
    </p>

    <Link
      to="/"
      className="mt-5 block text-center text-sm text-gray-500 transition hover:text-amber-300"
    >
      ← Back to Home
    </Link>

  </div>
</div>


);
}

export default Signup;
