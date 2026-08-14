export const partnerLanderStyles = `
:root{
  --canvas:#FFFFFF; --sand:#F4F1EA; --evergreen:#1F4A3A; --evergreen-soft:#EDF2EF;
  --ink:#15211C; --muted:#5B6660; --gold:#E4CDA1; --hairline:#E3DFD5;
  --serif:'Playfair Display',Georgia,serif; --sans:'Inter',system-ui,sans-serif; --mono:'IBM Plex Mono',monospace;
  --r-tile:18px; --r-img:20px; --r-band:28px; --r-pill:999px;
  --ease:cubic-bezier(.22,.61,.36,1);
}
.smn-partner *{box-sizing:border-box;margin:0;padding:0}
.smn-partner{font-family:var(--sans);color:var(--ink);background:var(--canvas);line-height:1.6;-webkit-font-smoothing:antialiased}
.smn-partner .wrap{max-width:1140px;margin:0 auto;padding:0 38px}
.smn-partner .eyebrow{font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:var(--evergreen);font-weight:600}
.smn-partner h1,.smn-partner h2,.smn-partner h3{font-family:var(--serif);font-weight:400;color:var(--ink);line-height:1.12;letter-spacing:-.01em}
.smn-partner h1{font-size:52px}
.smn-partner h2{font-size:34px}
.smn-partner h3{font-size:21px}
.smn-partner .accent{font-style:italic;color:var(--evergreen)}
.smn-partner p{font-size:17px;color:var(--ink);max-width:64ch}
.smn-partner .muted{color:var(--muted)}
.smn-partner .lede{font-size:19px;color:var(--muted);max-width:60ch}
.smn-partner section{padding:96px 0}
.smn-partner .band{background:var(--sand);border-radius:var(--r-band);padding:76px}
.smn-partner .band-soft{background:var(--evergreen-soft);border-radius:var(--r-band);padding:76px}
.smn-partner .band-wrap{max-width:1216px;margin:0 auto;padding:0 38px}
.smn-partner .pill{display:inline-flex;align-items:center;gap:8px;background:var(--evergreen);color:#fff;font-family:var(--sans);font-size:15px;font-weight:500;padding:14px 26px;border-radius:var(--r-pill);text-decoration:none;border:none;cursor:pointer;transition:opacity .24s var(--ease)}
.smn-partner .pill:hover{opacity:.9}
.smn-partner .pill:focus-visible{outline:3px solid var(--evergreen);outline-offset:3px}
.smn-partner .pill-ghost{background:transparent;color:var(--evergreen);border:1px solid var(--evergreen)}
.smn-partner .micro{font-size:13px;color:var(--muted);margin-top:14px}
.smn-partner .goldrule{width:72px;height:2px;background:var(--gold);border:0;margin:18px 0 0}
.smn-partner nav{border-bottom:1px solid var(--hairline)}
.smn-partner nav .wrap{display:flex;align-items:center;justify-content:space-between;padding-top:22px;padding-bottom:22px;flex-wrap:wrap;gap:14px}
.smn-partner .brand{font-family:var(--serif);font-size:20px;letter-spacing:-.01em}
.smn-partner .brand small{font-family:var(--sans);font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--muted);display:block;margin-top:2px}
.smn-partner .hero{display:grid;grid-template-columns:1fr 1.15fr;gap:56px;align-items:center}
.smn-partner .hero h1{margin:18px 0 22px}
.smn-partner .hero .controls{font-family:var(--serif);font-size:19px;color:var(--ink);margin:6px 0 26px}
.smn-partner .shot{background:#fff;border:1px solid var(--hairline);border-radius:var(--r-img);box-shadow:0 24px 60px -28px rgba(21,33,28,.35);overflow:hidden}
.smn-partner .shot .bar{display:flex;gap:7px;padding:14px 16px;border-bottom:1px solid var(--hairline);background:#fbfaf7}
.smn-partner .shot .bar i{width:11px;height:11px;border-radius:50%;background:var(--hairline);display:inline-block}
.smn-partner .shot .ph{aspect-ratio:16/10;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;background:repeating-linear-gradient(135deg,#faf9f5,#faf9f5 14px,#f4f1ea 14px,#f4f1ea 28px);color:var(--muted);text-align:center;padding:24px}
.smn-partner .shot .ph-tag{font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--evergreen);font-weight:600}
.smn-partner .shot img{display:block;width:100%;height:auto}
.smn-partner .phone-shot{display:flex;justify-content:center;align-items:center;background:linear-gradient(180deg,#faf9f5 0%,#f4f1ea 100%);padding:40px 24px;border-radius:var(--r-img);border:1px solid var(--hairline);box-shadow:0 24px 60px -28px rgba(21,33,28,.35)}
.smn-partner .phone-shot .device{width:260px;max-width:100%;background:#0a0a0a;border-radius:32px;padding:8px;box-shadow:0 30px 60px -30px rgba(21,33,28,.55)}
.smn-partner .phone-shot .device img{display:block;width:100%;height:auto;border-radius:24px}
.smn-partner .phone-strip{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;background:linear-gradient(180deg,#faf9f5 0%,#f4f1ea 100%);padding:32px 20px;border-radius:var(--r-img);border:1px solid var(--hairline);box-shadow:0 24px 60px -28px rgba(21,33,28,.35)}
.smn-partner .phone-strip .device{background:#0a0a0a;border-radius:22px;padding:5px;box-shadow:0 18px 40px -24px rgba(21,33,28,.5)}
.smn-partner .phone-strip .device img{display:block;width:100%;height:auto;border-radius:17px}
.smn-partner .phone-strip .cap{font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--evergreen);font-weight:600;text-align:center;margin-top:8px}
.smn-partner .grid{display:grid;gap:16px}
.smn-partner .g4{grid-template-columns:repeat(4,1fr)}
.smn-partner .g3{grid-template-columns:repeat(3,1fr)}
.smn-partner .g2{grid-template-columns:1fr 1.05fr;gap:56px;align-items:center}
.smn-partner .tile{background:#fff;border-radius:var(--r-tile);padding:28px;transition:box-shadow .24s var(--ease)}
.smn-partner .tile:hover{box-shadow:0 18px 40px -24px rgba(21,33,28,.28)}
.smn-partner .tile h3{margin-bottom:8px}
.smn-partner .tile p{font-size:15px;color:var(--muted)}
.smn-partner .klabel{font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:var(--evergreen);font-weight:600;margin-bottom:10px}
.smn-partner .flow{font-family:var(--mono);font-size:14px;color:var(--evergreen);letter-spacing:.02em}
.smn-partner .steps{display:grid;grid-template-columns:repeat(4,1fr);gap:28px;margin-top:36px}
.smn-partner .step .n{font-family:var(--serif);font-size:30px;color:var(--evergreen)}
.smn-partner .step h3{font-size:18px;margin:6px 0 6px}
.smn-partner .step p{font-size:14px;color:var(--muted)}
.smn-partner .qual{columns:2;column-gap:40px;max-width:720px;margin-top:24px}
.smn-partner .qual li{list-style:none;padding:9px 0 9px 26px;position:relative;font-size:16px;break-inside:avoid}
.smn-partner .qual li:before{content:"";position:absolute;left:0;top:16px;width:9px;height:9px;border:1.5px solid var(--evergreen);border-radius:50%}
.smn-partner .metricnote{font-size:12px;color:var(--muted);font-style:italic;margin-top:16px}
.smn-partner .metric .v{font-family:var(--serif);font-size:36px;color:var(--ink)}
.smn-partner .metric .l{font-size:13px;color:var(--muted);margin-top:4px}
.smn-partner form .row{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px}
.smn-partner label{display:block;font-size:13px;font-weight:500;margin-bottom:8px}
.smn-partner select,.smn-partner input,.smn-partner textarea{width:100%;font-family:var(--sans);font-size:15px;padding:12px 14px;border:1px solid var(--hairline);border-radius:10px;background:#fff;color:var(--ink)}
.smn-partner select:focus,.smn-partner input:focus,.smn-partner textarea:focus{outline:3px solid var(--evergreen);outline-offset:1px;border-color:var(--evergreen)}
.smn-partner .form-consent{font-size:12px;color:var(--muted);margin-top:14px;max-width:70ch}
.smn-partner .form-status{font-size:14px;margin-top:16px;color:var(--evergreen);font-weight:500}
.smn-partner .form-status.error{color:#8a1f1f}
.smn-partner footer{border-top:1px solid var(--hairline);padding:44px 0;margin-top:20px}
.smn-partner footer .wrap{display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:20px}
.smn-partner .powered{font-size:13px;color:var(--muted)}
.smn-partner .disc{font-size:12px;color:var(--muted);max-width:60ch;margin-top:10px}
.smn-partner .cta-band{text-align:left}
.smn-partner .cta-lede{max-width:60ch;margin-bottom:28px}
.smn-partner .cta-row{display:flex;align-items:center;gap:18px;flex-wrap:wrap}
.smn-partner .cta-row .micro{margin-top:0;font-family:var(--mono);font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted)}

/* Tablet */
@media(max-width:1024px){
  .smn-partner .wrap,.smn-partner .band-wrap{padding:0 28px}
  .smn-partner .band,.smn-partner .band-soft{padding:56px 44px}
  .smn-partner section{padding:80px 0}
  .smn-partner h1{font-size:44px}
  .smn-partner .hero{gap:40px}
}

/* Phone landscape / small tablet */
@media(max-width:860px){
  .smn-partner .wrap,.smn-partner .band-wrap{padding:0 20px}
  .smn-partner .hero,.smn-partner .g2{grid-template-columns:1fr}
  .smn-partner .g4{grid-template-columns:1fr 1fr}
  .smn-partner .g3{grid-template-columns:1fr}
  .smn-partner .steps{grid-template-columns:1fr 1fr}
  .smn-partner .qual{columns:1}
  .smn-partner h1{font-size:38px}
  .smn-partner h2{font-size:28px}
  .smn-partner .band,.smn-partner .band-soft{padding:44px 28px;border-radius:20px}
  .smn-partner section{padding:56px 0}
  .smn-partner form .row{grid-template-columns:1fr}
  .smn-partner .phone-shot{padding:32px 20px}
  .smn-partner .phone-shot .device{width:220px}
  .smn-partner .phone-strip{grid-template-columns:repeat(3,1fr);gap:10px;padding:20px 12px}
  .smn-partner .lede{font-size:17px}
  .smn-partner .hero .controls{font-size:17px}
  .smn-partner .hero h1{margin:14px 0 18px}
  .smn-partner nav .wrap{padding-top:16px;padding-bottom:16px}
  .smn-partner .brand{font-size:17px}
  .smn-partner .brand small{font-size:10px}
  .smn-partner .pill{padding:12px 22px;font-size:14px}
}

/* Phone */
@media(max-width:640px){
  .smn-partner .wrap,.smn-partner .band-wrap{padding:0 16px}
  .smn-partner section{padding:44px 0}
  .smn-partner .band,.smn-partner .band-soft{padding:32px 22px;border-radius:18px}
  .smn-partner h1{font-size:32px;line-height:1.15}
  .smn-partner h2{font-size:24px}
  .smn-partner h3{font-size:18px}
  .smn-partner p{font-size:16px}
  .smn-partner .lede{font-size:16px}
  .smn-partner .hero .controls{font-size:16px}
  .smn-partner .hero{gap:32px}
  .smn-partner .g4{grid-template-columns:1fr;gap:12px}
  .smn-partner .steps{grid-template-columns:1fr;gap:22px}
  .smn-partner .tile{padding:22px}
  .smn-partner .tile h3{font-size:16px}
  .smn-partner .tile p{font-size:14px}
  .smn-partner .phone-shot{padding:24px 14px}
  .smn-partner .phone-shot .device{width:200px;border-radius:26px;padding:6px}
  .smn-partner .phone-shot .device img{border-radius:20px}
  .smn-partner .phone-strip{padding:16px 10px;gap:8px}
  .smn-partner .phone-strip .device{border-radius:18px;padding:4px}
  .smn-partner .phone-strip .device img{border-radius:14px}
  .smn-partner .phone-strip .cap{font-size:10px;margin-top:6px;letter-spacing:.1em}
  .smn-partner .pill{width:100%;justify-content:center;padding:14px 22px;font-size:15px;min-height:52px;text-align:center}
  .smn-partner nav .wrap .pill{width:auto;padding:10px 18px;font-size:13px;min-height:44px}
  .smn-partner nav .wrap{gap:12px}
  .smn-partner .brand small{display:block}
  .smn-partner .cta-row{gap:14px}
  .smn-partner .cta-row .pill{width:100%}
  .smn-partner footer .wrap{flex-direction:column;align-items:flex-start;gap:14px}
  .smn-partner .powered{font-size:12px}
  .smn-partner .goldrule{margin-top:14px}
}

/* Small phone */
@media(max-width:380px){
  .smn-partner h1{font-size:28px}
  .smn-partner h2{font-size:22px}
  .smn-partner .band,.smn-partner .band-soft{padding:26px 18px}
  .smn-partner .phone-strip{grid-template-columns:1fr;gap:14px}
  .smn-partner .phone-strip .device{max-width:180px;margin:0 auto}
}

/* ============================================================
   Partner Hub additions — property row + buying cards + pillars
   ============================================================ */
.smn-partner .pgrid7{display:grid;grid-template-columns:repeat(7,1fr);gap:14px;margin-top:34px}
.smn-partner .plogo{background:#fff;border:1px solid var(--hairline);border-radius:var(--r-tile);padding:22px 16px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;min-height:120px;text-align:center;transition:box-shadow .24s var(--ease)}
.smn-partner .plogo:hover{box-shadow:0 14px 30px -20px rgba(21,33,28,.22)}
.smn-partner .plogo .logo{max-width:100%;max-height:36px;width:auto;height:auto;object-fit:contain}
.smn-partner .plogo .fallback{font-family:var(--serif);font-size:17px;color:var(--ink);line-height:1.2}
.smn-partner .plogo .cap{font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted)}
.smn-partner .buycards{display:grid;grid-template-columns:repeat(2,1fr);gap:18px;margin-top:36px}
.smn-partner .buycard{background:#fff;border:1px solid var(--hairline);border-radius:var(--r-tile);padding:32px;display:flex;flex-direction:column;gap:16px;transition:box-shadow .24s var(--ease),transform .24s var(--ease)}
.smn-partner .buycard:hover{box-shadow:0 20px 44px -24px rgba(21,33,28,.28);transform:translateY(-2px)}
.smn-partner .buycard .eyebrow{font-size:10px}
.smn-partner .buycard h3{font-size:22px;font-family:var(--serif);color:var(--ink);line-height:1.2}
.smn-partner .buycard .source{font-family:var(--mono);font-size:12px;color:var(--evergreen);letter-spacing:.04em;text-transform:uppercase}
.smn-partner .buycard p{font-size:15px;color:var(--muted);max-width:none}
.smn-partner .buycard .crit{font-size:13px;color:var(--muted);letter-spacing:.02em;line-height:1.5}
.smn-partner .buycard .crit strong{color:var(--ink);font-weight:500}
.smn-partner .buycard .cta{margin-top:auto;display:inline-flex;align-items:center;gap:8px;color:var(--evergreen);font-family:var(--sans);font-size:14px;font-weight:600;text-decoration:none;padding-top:4px}
.smn-partner .buycard .cta:hover{opacity:.75}
.smn-partner .buycard.other{background:var(--sand);border-color:transparent}
.smn-partner .pillars{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;margin-top:36px}
.smn-partner .pillar{padding:24px 0}
.smn-partner .pillar .n{font-family:var(--mono);font-size:12px;color:var(--evergreen);letter-spacing:.14em;text-transform:uppercase;margin-bottom:10px}
.smn-partner .pillar h3{font-family:var(--serif);font-size:20px;color:var(--ink);margin-bottom:8px}
.smn-partner .pillar p{font-size:14px;color:var(--muted);max-width:none}

/* Universal form additions */
.smn-partner .uform{background:#fff;border:1px solid var(--hairline);border-radius:var(--r-tile);padding:36px;margin-top:24px}
.smn-partner .uform h3{font-family:var(--serif);font-size:22px;margin-bottom:6px}
.smn-partner .uform .fh{font-size:14px;color:var(--muted);margin-bottom:24px}
.smn-partner .uform .row3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:18px;margin-bottom:18px}
.smn-partner .uform .row2{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-bottom:18px}
.smn-partner .uform .row1{margin-bottom:18px}
.smn-partner .uform textarea{min-height:96px;resize:vertical}
.smn-partner .uform .submit{margin-top:12px;display:flex;align-items:center;gap:16px;flex-wrap:wrap}

@media(max-width:1024px){
  .smn-partner .pgrid7{grid-template-columns:repeat(4,1fr)}
  .smn-partner .pillars{grid-template-columns:repeat(2,1fr)}
  .smn-partner .uform .row3{grid-template-columns:1fr 1fr}
}
@media(max-width:860px){
  .smn-partner .pgrid7{grid-template-columns:repeat(3,1fr)}
  .smn-partner .buycards{grid-template-columns:1fr}
  .smn-partner .uform{padding:26px 22px}
}
@media(max-width:640px){
  .smn-partner .pgrid7{grid-template-columns:repeat(2,1fr);gap:10px}
  .smn-partner .plogo{min-height:96px;padding:18px 12px}
  .smn-partner .plogo .logo{max-height:30px}
  .smn-partner .plogo .fallback{font-size:15px}
  .smn-partner .pillars{grid-template-columns:1fr}
  .smn-partner .buycard{padding:24px}
  .smn-partner .buycard h3{font-size:19px}
  .smn-partner .uform .row3,.smn-partner .uform .row2{grid-template-columns:1fr;gap:14px}
  .smn-partner .uform{padding:22px 18px}
  .smn-partner .uform .submit .pill{width:100%}
}
`;
