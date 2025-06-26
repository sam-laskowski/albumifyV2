import Link from "next/link";
import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="p-8">
      <div className="container max-w-3xl">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center space-x-6 md:order-2">
            <Link
              href="https://github.com/sam-laskowski"
              target="_blank"
              rel="noreferrer noopener"
              className="text-muted-foreground hover:text-foreground"
            >
              <span className="sr-only">GitHub</span>
              <FaGithub
                aria-hidden="true"
                className="h-5 w-5"
              />
            </Link>
            <Link
              href="https://linkedin.com/in/sam-laskowski"
              target="_blank"
              rel="noreferrer noopener"
              className="text-muted-foreground hover:text-foreground"
            >
              <span className="sr-only">LinkedIn</span>
              <FaLinkedin
                aria-hidden="true"
                className="h-5 w-5"
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
