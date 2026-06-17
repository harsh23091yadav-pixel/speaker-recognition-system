import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">

      <div className="absolute w-96 h-96 bg-purple-700 blur-3xl opacity-20 rounded-full"></div>

      <div className="relative bg-gray-900 border border-gray-800 rounded-3xl p-10 w-full max-w-md">

        <h1 className="text-white text-4xl font-bold mb-2">
          Welcome Back
        </h1>

        <p className="text-gray-400 mb-8">
          Login to continue
        </p>

        <form className="space-y-5">

          <input
            type="email"
            placeholder="Email"
            className="w-full bg-gray-800 text-white p-4 rounded-xl outline-none border border-gray-700 focus:border-purple-500"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full bg-gray-800 text-white p-4 rounded-xl outline-none border border-gray-700 focus:border-purple-500"
          />

          <button
            type="button"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-xl font-semibold"
          >
            Login
          </button>

        </form>

        <p className="text-center text-gray-400 mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-purple-400 hover:text-purple-300"
          >
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;