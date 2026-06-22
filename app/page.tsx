import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import CategoryGrid from "@/components/CategoryGrid";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <SearchBar />
      <CategoryGrid />
    </>
  );
}
