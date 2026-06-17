import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-purple-400">
          VoiceAI
        </h1>

        <div className="flex gap-4">

          <Link to="/login">
            <button className="px-5 py-2 rounded-lg border border-purple-500 hover:bg-purple-500 transition">
              Login
            </button>
          </Link>

          <Link to="/register">
            <button className="px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition">
              Register
            </button>
          </Link>

        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden flex flex-col items-center justify-center text-center px-6 py-32">

        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-700 rounded-full blur-3xl opacity-20"></div>

        <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-700 rounded-full blur-3xl opacity-20"></div>

        <div className="w-32 h-32 rounded-full bg-purple-600 blur-3xl opacity-30 absolute"></div>

        <h1 className="text-7xl font-extrabold mb-6 leading-tight">
          Automatic Speaker
          <span className="text-purple-400"> Recognition</span>
        </h1>

        <p className="text-gray-300 max-w-3xl text-xl mb-10">
          Identify speakers using AI-powered voice analysis.
          Upload audio or record live voice and let the system
          detect the speaker with confidence scores.
        </p>

        <div className="flex gap-5">

          <Link to="/dashboard">
  <button className="px-8 py-4 bg-purple-600 rounded-xl hover:bg-purple-700 transition">
    Get Started
  </button>
</Link>

          <button className="px-8 py-4 border border-gray-700 rounded-xl hover:border-purple-500 transition">
            Learn More
          </button>

        </div>

      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-8 px-10 pb-20">

        <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800">
          <h2 className="text-xl font-bold mb-3">
            Voice Enrollment
          </h2>
          <p className="text-gray-400">
            Register multiple speaker profiles using voice samples.
          </p>
        </div>

        <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800">
          <h2 className="text-xl font-bold mb-3">
            AI Recognition
          </h2>
          <p className="text-gray-400">
            Detect speakers from uploaded or live-recorded audio.
          </p>
        </div>

        <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800">
          <h2 className="text-xl font-bold mb-3">
            Confidence Analysis
          </h2>
          <p className="text-gray-400">
            View prediction confidence and matching scores.
          </p>
        </div>

      </section>

    </div>
  );
}

export default LandingPage;