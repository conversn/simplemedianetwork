type InfoPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  sections: Array<{
    heading: string;
    body: string[];
  }>;
};

const pageStyles = `
  :root {
    color-scheme: light;
  }

  body {
    color: #24302a;
    background:
      radial-gradient(circle at top, rgba(74, 107, 92, 0.12), transparent 30%),
      linear-gradient(180deg, #fafaf8 0%, #f2f1eb 100%);
    font-family: var(--font-sans), system-ui, sans-serif;
  }

  .info-shell {
    min-height: 100vh;
    padding: 48px 20px 72px;
  }

  .info-card {
    max-width: 860px;
    margin: 0 auto;
    background: rgba(255, 255, 255, 0.88);
    border: 1px solid rgba(36, 48, 42, 0.08);
    border-radius: 28px;
    box-shadow: 0 20px 60px rgba(18, 24, 20, 0.08);
    backdrop-filter: blur(12px);
    padding: 32px 24px;
  }

  .info-back {
    color: #4a6b5c;
    text-decoration: none;
    font-size: 0.95rem;
    font-weight: 600;
  }

  .info-eyebrow {
    margin: 24px 0 12px;
    color: #6a7d71;
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  .info-title {
    margin: 0;
    color: #101511;
    font-family: var(--font-serif), Georgia, serif;
    font-size: clamp(2.2rem, 7vw, 4.25rem);
    font-weight: 400;
    line-height: 1.04;
    letter-spacing: -0.04em;
  }

  .info-intro {
    margin: 20px 0 0;
    max-width: 48rem;
    color: #435249;
    font-size: 1.08rem;
    line-height: 1.8;
  }

  .info-section {
    margin-top: 32px;
    padding-top: 24px;
    border-top: 1px solid rgba(36, 48, 42, 0.08);
  }

  .info-section h2 {
    margin: 0 0 12px;
    color: #101511;
    font-family: var(--font-serif), Georgia, serif;
    font-size: 1.7rem;
    font-weight: 500;
  }

  .info-section p {
    margin: 0 0 14px;
    color: #435249;
    line-height: 1.8;
  }

  @media (min-width: 768px) {
    .info-shell {
      padding: 72px 32px 96px;
    }

    .info-card {
      padding: 48px;
    }
  }
`;

export function SharedInfoPage({
  eyebrow,
  title,
  intro,
  sections,
}: InfoPageProps) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: pageStyles }} />
      <main className="info-shell">
        <article className="info-card">
          <a className="info-back" href="/">
            Back to network overview
          </a>
          <p className="info-eyebrow">{eyebrow}</p>
          <h1 className="info-title">{title}</h1>
          <p className="info-intro">{intro}</p>
          {sections.map((section) => (
            <section className="info-section" key={section.heading}>
              <h2>{section.heading}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
        </article>
      </main>
    </>
  );
}
