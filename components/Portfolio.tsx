"use client";
import { useEffect, useState } from "react";
import Studio from "./Studio";
import DetailDialog from "./DetailDialog";
import { projects, contact, type Detail } from "../lib/content";

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
            <a href="#work">Work</a>
            <a href="#about">About</a>
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
                <a className="primary" href="#work">
                  Explore my work <span>↘</span>
                </a>
                <a className="secondary" href="#about">
                  A bit about me ↗
                </a>
              </div>
            </div>
            <Studio paused={paused} />
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
                <i style={{ background: "#536b66" }}></i>After hours
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
          <section id="work">
            <div className="section-heading">
              <h2>
                A few things I’ve imagined
                <span style={{ color: "#9ba581", fontSize: "30px" }}>.</span>
              </h2>
              <span>01 — SELECTED CONCEPTS</span>
            </div>
            <div className="projects">
              <button
                className="project"
                onClick={() => setDetail(projects.grove)}
              >
                <div className="project-art">
                  <div className="mock-browser">
                    <div className="browser-bar">•••</div>
                    <div className="mock-content">
                      <div className="mock-brand">
                        grove<span>Find your green ↗</span>
                      </div>
                      <div className="mock-title">
                        A little green.
                        <br />A better everyday.
                      </div>
                      <span className="mock-tag">Meet your next plant ↗</span>
                    </div>
                  </div>
                  <div className="mock-plant" aria-hidden="true">
                    🌱
                  </div>
                </div>
                <div className="project-info">
                  <div>
                    <h3>Grove — Room to grow</h3>
                    <p>Sample concept · Web design / Digital experience</p>
                  </div>
                  <span className="arrow">↗</span>
                </div>
              </button>
              <button
                className="project"
                onClick={() => setDetail(projects.tempo)}
              >
                <div className="project-art">
                  <div className="orbit"></div>
                  <div className="orbit"></div>
                  <div className="phone">
                    <div className="phone-notch"></div>
                    <small>MONDAY, AT YOUR PACE</small>
                    <h4>
                      Find your
                      <br />
                      own rhythm.
                    </h4>
                    <div className="mood">
                      <span>☀</span>
                      <span>◔</span>
                      <span>☁</span>
                      <span>✳</span>
                    </div>
                    <div className="phone-chart">
                      <i style={{ height: "30%" }}></i>
                      <i style={{ height: "60%" }}></i>
                      <i style={{ height: "48%" }}></i>
                      <i style={{ height: "80%" }}></i>
                      <i style={{ height: "65%" }}></i>
                      <i style={{ height: "90%" }}></i>
                      <i style={{ height: "72%" }}></i>
                    </div>
                    <div className="phone-footer">
                      A little progress is still progress. ↗
                    </div>
                  </div>
                </div>
                <div className="project-info">
                  <div>
                    <h3>Tempo — A gentler routine</h3>
                    <p>Sample concept · Product design / Mobile app</p>
                  </div>
                  <span className="arrow">↗</span>
                </div>
              </button>
            </div>
          </section>
          <section className="about" id="about">
            <div>
              <div className="eyebrow" style={{ marginBottom: "20px" }}>
                Beyond the screen
              </div>
              <h2>
                A curious mind.
                <br />A work in progress.
              </h2>
            </div>
            <div>
              <p>
                This is where your story goes: what you love making, how you
                approach a challenge, and the small things that make you, you. A
                few honest sentences will say more than a long list of
                buzzwords.
              </p>
              <div className="tags">
                <span>Your craft</span>
                <span>Your interests</span>
                <span>Something unexpected</span>
              </div>
              <p style={{ fontSize: "10px", marginTop: "20px" }}>
                Draft biography · personalize with your own story
              </p>
            </div>
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
          <span>Portfolio concept · Illustrative projects & avatar</span>
        </footer>
      </div>
      <DetailDialog detail={detail} onClose={() => setDetail(null)} />
    </>
  );
}
