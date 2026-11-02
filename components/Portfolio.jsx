"use client";

import { useState } from "react";
import { ArrowUpRight, Globe2 } from "lucide-react";
import { usePreferences } from "./Providers";
import { siteConfig } from "@/lib/site-config";
import { Reveal, SectionHeading } from "./UI";

function ProjectFavicon({ project }) {
  const [failed, setFailed] = useState(false);
  let iconUrl = project.faviconUrl;
  if (!iconUrl) {
    try {
      iconUrl = new URL("/favicon.ico", project.url).href;
    } catch {
      iconUrl = "";
    }
  }

  return (
    <span className="project-list-icon" aria-hidden="true">
      {!failed && iconUrl ? (
        /* Favicons are tiny external site assets; use their native URL with a reliable fallback. */
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={iconUrl}
          alt=""
          width="32"
          height="32"
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : (
        <Globe2 size={25} strokeWidth={1.7} />
      )}
    </span>
  );
}

export default function Portfolio() {
  const { t, language } = usePreferences();

  return (
    <section id="work" className="section work-section">
      <div className="container">
        <SectionHeading {...t.work} />
        <div className="project-list">
          {siteConfig.projects.map((project) => (
            <Reveal className="project-list-row" key={project.id}>
              <ProjectFavicon project={project} />
              <div className="project-list-copy">
                <h3>{project.name}</h3>
                <p>{project.description?.[language] || project.description?.en || ""}</p>
                <span className="project-list-domain">
                  {new URL(project.url).hostname.replace(/^www\./, "")}
                </span>
              </div>
              <a
                className="project-list-visit"
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${t.work.visitProject}: ${project.name}`}
              >
                <span>{t.work.visitProject}</span>
                <ArrowUpRight size={20} aria-hidden="true" />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
