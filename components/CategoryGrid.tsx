import CategoryCard from "./CategoryCard";
export default function CategoryGrid(){
 const categories=["AI","Technology","Business","SEO","Finance","Education"];
 return <div className="grid md:grid-cols-3 gap-4">{categories.map(c=><CategoryCard key={c} title={c}/> )}</div>
}