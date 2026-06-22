export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between">
        <h1 className="text-2xl font-bold text-blue-600">Asklo</h1>
        <div className="flex gap-6">
          <a href="/">Home</a>
          <a href="/categories">Categories</a>
          <a href="/ask">Ask Question</a>
          <a href="/login">Login</a>
        </div>
      </div>
    </nav>
  );
}