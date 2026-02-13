import { projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { Link } from "react-router-dom";

interface ProjectGridProps {
  limit?: number;
}

export function ProjectGrid({ limit }: ProjectGridProps) {
  const displayedProjects = limit ? projects.slice(0, limit) : projects;

  // Determine variant based on position
  // Pattern: Row 1: [large, small], Row 2: [small, large], Row 3: [large, small], etc.
  const getVariant = (index: number): "large" | "small" => {
    const row = Math.floor(index / 2);
    const col = index % 2;

    // Odd rows (0, 2, 4...): first is large, second is small
    // Even rows (1, 3, 5...): first is small, second is large
    if (row % 2 === 0) {
      return col === 0 ? "large" : "small";
    } else {
      return col === 0 ? "small" : "large";
    }
  };

  return (
    <section className="pt-8 pb-20 md:pb-32 bg-black">
      <div className="container">
        {/* Grid - 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-12 items-start">
          {displayedProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              variant={getVariant(index)}
            />
          ))}
        </div>

        {limit && projects.length > limit && (
          <div className="mt-16 md:mt-24 text-center">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold px-8 py-4 rounded-full border border-white/[0.12] bg-white/[0.05] text-white hover:bg-white/[0.1] transition-all duration-300 group"
            >
              Plus d'études de cas
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}