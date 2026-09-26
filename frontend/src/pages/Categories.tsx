import { useEffect, useState } from "react";
import { ArrowRight, BookOpen, Briefcase, Code2, Heart, Lightbulb, Plane, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { getCategories } from "../api";

const icons = [BookOpen, Code2, Briefcase, Heart, Lightbulb, Plane, Sparkles];

export default function Categories() {
  const [categories, setCategories] = useState<string[]>([]);
  useEffect(() => { getCategories().then(setCategories); }, []);

  return (
    <div className="page">
      <div className="page-header">
        <span className="eyebrow">BROWSE BY MOOD</span>
        <h1>Find your corner of the library.</h1>
        <p>Explore collections built around what you want to learn, feel or become.</p>
      </div>
      <div className="category-grid">
        {categories.map((category, index) => {
          const Icon = icons[index % icons.length];
          return (
            <Link className="category-card" key={category} to={`/books?category=${encodeURIComponent(category)}`}>
              <div className="category-icon"><Icon size={25} /></div>
              <h3>{category}</h3>
              <p>Explore {category.toLowerCase()} books</p>
              <span><ArrowRight size={17} /></span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
