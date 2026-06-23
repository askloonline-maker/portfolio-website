import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import RightSidebar from "@/components/RightSidebar";
import Hero from "@/components/Hero";
import CreatePost from "@/components/CreatePost";
import RecentQuestions from "@/components/RecentQuestions";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100">
      <Navbar />
      <Hero />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="hidden lg:block lg:col-span-3">
            <Sidebar />
          </div>

          <div className="lg:col-span-6 space-y-6">
            <CreatePost />
            <RecentQuestions />
          </div>

          <div className="hidden lg:block lg:col-span-3">
            <RightSidebar />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
