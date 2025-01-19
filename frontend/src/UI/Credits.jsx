import React from "react";
import { FaDribbble, FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";

export default function Credits() {
  return (
    <div className="min-h-screen bg-base-100 px-4 py-12">
      <div className="max-w-2xl mx-auto space-y-12 text-center">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-serif italic">
            Credits & Acknowledgments
          </h1>
          <p className="text-base-content/60">
            With gratitude to those who made this possible
          </p>
        </div>

        {/* TMDB Attribution */}
        <div className="card bg-base-100 shadow">
          <div className="card-body space-y-4">
            <div className="flex justify-center">
              <img
                src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg?height=32&width=200"
                alt="TMDB Logo"
                className="h-8 w-auto"
              />
            </div>
            <p className="text-sm text-base-content/60">
              This product uses the TMDB API but is not endorsed or certified by
              TMDB. All movie data and images are provided by The Movie
              Database.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-serif italic">Inspiration & Credits</h2>
          <div className="card bg-base-100 shadow">
            <div className="card-body space-y-4">
              <div className="space-y-2">
                <a
                  href="https://dribbble.com/shots/5542414-Movie-Discovery-App"
                  className="inline-flex items-center gap-2 text-base-content/60 hover:text-base-content transition-colors">
                  <FaDribbble className="h-5 w-5" />
                  <span>UI Design Inspiration on Dribbble</span>
                </a>
              </div>

              <div className="space-y-2">
                <p className="text-base-content/60">
                  Name inspired by{" "}
                  <a
                    href="https://www.instagram.com/toallthefilms/"
                    className="text-primary hover:text-primary-focus underline decoration-dotted">
                    @toallthefilms
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Note */}
        <div className="card bg-base-100 shadow">
          <div className="card-body space-y-4">
            <h2 className="text-2xl font-serif italic">A Note of Thanks</h2>
            {/* <p className="font-italianno text-base-content/60 tracking-wider text-2xl leading-relaxed">
              "All those moments will be lost in time, like tears in rain. "
              <br />
              <span className="font-medium">— Roy Batty, Blade Runner</span>
            </p> */}
            <p className="text-base-content/60 leading-relaxed">
              This project was crafted with love for cinema and a desire to help
              others discover great films.
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="pt-4 text-sm text-base-content/50">
          <div className="flex justify-center gap-6">
            <a
              href="https://x.com/bhaskar__jha"
              className="inline-flex items-center gap-2 text-base-content/60 hover:text-base-content transition-colors">
              <FaTwitter className="h-5 w-5" />
            </a>
            <a
              href="https://github.com/gw-dg"
              className="inline-flex items-center gap-2 text-base-content/60 hover:text-base-content transition-colors">
              <FaGithub className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/bhaskar-jha-89226a218/"
              className="inline-flex items-center gap-2 text-base-content/60 hover:text-base-content transition-colors">
              <FaLinkedin className="h-5 w-5" />
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
