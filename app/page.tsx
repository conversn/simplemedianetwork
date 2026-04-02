import fs from "node:fs";
import path from "node:path";
import Script from "next/script";

const HOMEPAGE_PATH = path.join(
  process.cwd(),
  "simple-media-network-source",
  "index.html",
);

function getHomepageParts() {
  const html = fs.readFileSync(HOMEPAGE_PATH, "utf8");
  const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/);
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/);

  if (!styleMatch || !bodyMatch) {
    throw new Error("Could not parse homepage source HTML.");
  }

  const styles = styleMatch[1]
    .replaceAll("'Source Serif 4', Georgia, serif", "var(--font-serif), Georgia, serif")
    .replaceAll(
      "'Inter', system-ui, -apple-system, sans-serif",
      "var(--font-sans), system-ui, -apple-system, sans-serif",
    );

  const body = bodyMatch[1].replaceAll("./images/", "/images/");

  return { body, styles };
}

export default function HomePage() {
  const { body, styles } = getHomepageParts();

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/js/main.js" strategy="afterInteractive" />
    </>
  );
}
