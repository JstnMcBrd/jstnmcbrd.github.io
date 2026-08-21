/**
 * Identity facts about the site owner, shared by the rendered page and the
 * JSON-LD in `<head>` so the two cannot drift apart.
 *
 * Only claims the site already makes in prose belong here — this data is
 * published as machine-readable assertions.
 */

export interface SocialLink {
  label: string;
  href: string;
}

export const name = "Justin McBride";

export const description = "Personal portfolio of Justin McBride.";

export const jobTitle = "Graduate Student";

export const affiliation = {
  name: "Brigham Young University",
  url: "https://www.byu.edu",
};

export const knowsAbout = ["TypeScript", "Python", "Rust"];

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/JstnMcBrd" },
  { label: "Hugging Face", href: "https://huggingface.co/JstnMcBrd" },
  { label: "LinkedIn", href: "https://linkedin.com/in/jstnmcbrd" },
  { label: "X / Twitter", href: "https://x.com/JstnMcBrd" },
];
