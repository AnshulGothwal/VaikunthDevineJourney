import { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate, Link } from "react-router-dom";

function Login() {
const navigate = useNavigate();
const { setUser } = useContext(AuthContext);

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");
const [loading, setLoading] = useState(false);

const handleLogin = async (e) => {
e.preventDefault();
setError("");
setLoading(true);


try {
  const response = await fetch(
    "https://vaikunth-backend.onrender.com/api/users/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  localStorage.setItem("token", data.token);

  const profileResponse = await fetch(
    "http://https://vaikunth-backend.onrender.com/api/users/profile",
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    }
  );

  const profileData = await profileResponse.json();

  if (!profileResponse.ok) {
    throw new Error(
      profileData.message || "Could not load profile"
    );
  }

  setUser(profileData);
  navigate("/");
} catch (error) {
  setError(
    error.message === "Failed to fetch"
      ? "Server connection failed. Please check your backend."
      : error.message
  );
} finally {
  setLoading(false);
}

};

return ( <div className="min-h-screen flex items-center justify-center bg-[#080808] px-4 py-12"> <div className="w-full max-w-md rounded-2xl border border-amber-400/30 bg-[#17140f] p-6 shadow-2xl sm:p-10">
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
      <div className="h-px flex-1 bg-amber-400/30" />
      <span className="text-amber-300">✦</span>
      <div className="h-px flex-1 bg-amber-400/30" />
    </div>

    <h1 className="text-center text-2xl font-bold text-white sm:text-3xl">
      Welcome Back
    </h1>

    <p className="mb-8 mt-3 text-center text-sm leading-6 text-gray-400">
      Login to continue your divine journey with Vaikunth.
    </p>

    <form onSubmit={handleLogin} className="space-y-5">
      <div>
        <label
          htmlFor="login-email"
          className="mb-2 block text-sm font-medium text-amber-100"
        >
          Email Address
        </label>

        <input
          id="login-email"
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
          htmlFor="login-password"
          className="mb-2 block text-sm font-medium text-amber-100"
        >
          Password
        </label>

        <input
          id="login-password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
        {loading ? "Logging In..." : "Login"}
      </button>
    </form>

    <p className="mt-7 text-center text-sm text-gray-400">
      Don't have an account?{" "}
      <Link
        to="/signup"
        className="font-semibold text-amber-300 hover:text-amber-200"
      >
        Sign Up
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

export default Login;
