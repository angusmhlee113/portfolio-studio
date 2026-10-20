"use client";
import { useEffect, useState } from "react";
import Studio from "./Studio";
import DetailDialog from "./DetailDialog";
import { experience, education, contact, type Detail } from "../lib/content";

export default function Portfolio() {
  const [theme, setTheme] = useState("day");
  const [reducedMotion, setReducedMotion] = useState(false);
  const [detail, setDetail] = useState<Detail | null>(null);
  const paused = reducedMotion;
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    document.body.dataset.theme = theme;
    return () => {
      delete document.body.dataset.theme;
    };
  }, [theme]);
  useEffect(() => {
    document.documentElement.classList.toggle("no-motion", paused);
    return () => document.documentElement.classList.remove("no-motion");
  }, [paused]);
  return (
    <>
      <div className="wrap">
        <header>
          <a className="logo" href="#" aria-label="Angus home">
            angus<span>✳</span>
          </a>
          <nav aria-label="Main navigation">
            <a href="#experience">Experience</a>
            <a href="#education">Education</a>
            <a href="#contact">Say hello ↗</a>
          </nav>
          <div className="status">
            <span className="dot"></span>A portfolio in the making
          </div>
        </header>
        <main>
          <div className="hero">
            <div className="intro">
              <div className="eyebrow">Welcome to my little corner</div>
              <h1>
                Good ideas.
                <br />A little play.
                <br />
                <em>A lot of care.</em>
              </h1>
              <p>
                Hey, I’m Angus. This is a little world for the things I make,
                the ideas I explore, and whatever comes next.
              </p>
              <div className="actions">
                <a className="primary" href="#experience">
                  View my experience <span>↘</span>
                </a>
                <a className="secondary" href="#education">
                  My education ↗
                </a>
              </div>
            </div>
            <Studio
              paused={paused}
              night={theme === "night"}
              daydream={theme === "lilac"}
            />
          </div>
          <div className="studio-controls">
            <span>A small space. Endless possibilities.</span>
            <div className="themes" aria-label="Choose a visual direction">
              <button
                className="theme"
                onClick={() => setTheme("day")}
                aria-pressed={theme === "day"}
              >
                <i style={{ background: "#a8b98c" }}></i>Daylight
              </button>
              <button
                className="theme"
                onClick={() => setTheme("night")}
                aria-pressed={theme === "night"}
              >
                <i style={{ background: "#536b66" }}></i>Night
              </button>
              <button
                className="theme"
                onClick={() => setTheme("lilac")}
                aria-pressed={theme === "lilac"}
              >
                <i style={{ background: "#b9a3d5" }}></i>Daydream
              </button>
            </div>
          </div>
          <section
            className="resume-section"
            id="experience"
            aria-labelledby="experience-heading"
          >
            <div className="section-heading">
              <h2 id="experience-heading">
                Work Experience<span className="section-dot">.</span>
              </h2>
              <span>01 — MY PROFESSIONAL JOURNEY</span>
            </div>
            <ol className="resume-list">
              {experience.map((entry) => (
                <li className="resume-entry" key={entry.id}>
                  <div className="resume-period">{entry.period}</div>
                  <div className="resume-details">
                    <h3>{entry.title}</h3>
                    <p className="resume-organization">{entry.organization}</p>
                    <p>{entry.description}</p>
                    <ul className="resume-highlights">
                      {entry.highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </section>
          <section
            className="resume-section"
            id="education"
            aria-labelledby="education-heading"
          >
            <div className="section-heading">
              <h2 id="education-heading">
                Education<span className="section-dot">.</span>
              </h2>
              <span>02 — WHERE I LEARNED</span>
            </div>
            <p className="resume-note">
              Placeholder entry · add your school, qualification, and dates.
            </p>
            <ol className="resume-list">
              {education.map((entry) => (
                <li className="resume-entry" key={entry.id}>
                  <div className="resume-period">{entry.period}</div>
                  <div className="resume-details">
                    <h3>{entry.title}</h3>
                    <p className="resume-organization">{entry.organization}</p>
                    <p>{entry.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
          <section className="contact" id="contact">
            <div>
              <div className="eyebrow">The next good idea starts somewhere</div>
              <h2>Let’s make something matter.</h2>
              <p>
                A space for collaborations, conversations, and a friendly hello.
              </p>
            </div>
            <button
              className="primary"
              id="contact-button"
              onClick={() => setDetail(contact)}
            >
              Say hello <span>↗</span>
            </button>
          </section>
        </main>
        <footer className="footer">
          <span>angus✳ &nbsp; A little world, made with care.</span>
          <span>
            Portfolio draft · Experience, education & a little personality
          </span>
        </footer>
      </div>
      <DetailDialog detail={detail} onClose={() => setDetail(null)} />
    </>
  );
}
