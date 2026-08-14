import { PROPERTIES } from "./properties";

export function PropertyRow() {
  return (
    <div className="pgrid7" aria-label="Simple Media Network consumer properties">
      {PROPERTIES.map((p) => (
        <div key={p.key} className="plogo" aria-label={`${p.name} — ${p.tag}`}>
          {p.logo ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img className="logo" src={p.logo} alt={`${p.name} logo`} loading="lazy" />
          ) : (
            <div className="fallback">{p.name}</div>
          )}
          <div className="cap">{p.tag}</div>
        </div>
      ))}
    </div>
  );
}
