// Generated from the original CSS measurements; edit class utilities here.
// Marker classes scope ancestor and hover variants without global selectors.
const styles = {
  "page": "m-home-page [container-type:inline-size] w-full overflow-hidden",
  "hero": "m-home-hero relative [aspect-ratio:1672_/_941] overflow-hidden [background:#ececec] [--ig-size:44px] [--logo-w:calc(var(--ig-size)_*_2)] [--nav-h:calc(var(--logo-w)_*_0.9157_+_2_*_max(10px,_0.8cqw))] max-[700px]:[aspect-ratio:1253_/_2226] max-[700px]:[--ig-size:30px]",
  "cover": "m-home-cover object-cover",
  "navbar": "m-home-navbar fixed [z-index:49] [inset:var(--announce-h)_0_auto] [height:var(--nav-h)] [background:rgba(255,_255,_255,_0.55)] [backdrop-filter:blur(14px)_saturate(1.4)] [border-bottom:1px_solid_rgba(255,_255,_255,_0.6)] [box-shadow:0_1px_12px_rgba(0,_0,_0,_0.04)] [pointer-events:none] opacity-0 [transition:opacity_0.3s_ease] data-[visible]:opacity-100",
  "logoMark": "m-home-logoMark fixed [z-index:50] [left:3cqw] [top:calc(var(--announce-h)_+_(var(--nav-h)_-_var(--logo-w)_*_0.9157)_/_2)] [width:var(--logo-w)] [height:calc(var(--logo-w)_*_0.9157)] overflow-hidden [pointer-events:none] [animation:brandAppear_0.6s_ease-out_both] motion-reduce:[animation:none] [&_img]:absolute [&_img]:max-w-none [&_img]:[width:calc(var(--logo-w)_*_1.4976)] [&_img]:[height:auto] [&_img]:[left:calc(var(--logo-w)_*_-0.1855)] [&_img]:[top:calc(var(--logo-w)_*_-0.2217)] [&_img]:[filter:grayscale(1)_brightness(0.9)_contrast(10)]",
  "instagram": "m-home-instagram fixed [z-index:50] [right:3cqw] [top:calc(var(--announce-h)_+_(var(--nav-h)_-_max(44px,_var(--ig-size)))_/_2)] [width:max(44px,_var(--ig-size))] [height:max(44px,_var(--ig-size))] flex items-center justify-center [color:var(--color-ink)] [transition:opacity_0.2s_ease] hover:[opacity:0.6] [&_svg]:flex-none [&_svg]:[width:var(--ig-size)] [&_svg]:[height:var(--ig-size)]",
  "welcome": "m-home-welcome [background:linear-gradient(90deg,_#f3f4f6,_#fafafa)] [padding:7cqw_0_7.5cqw] flex flex-col items-center text-center max-[700px]:[padding:14cqw_6cqw]",
  "eyebrow": "m-home-eyebrow m-0 [font-size:clamp(18px,_4.8cqw,_30px)] [letter-spacing:0.5em] font-medium [color:#1a1a1a85]",
  "welcomeRule": "m-home-welcomeRule [width:1px] [height:3cqw] [background:#bdbdbd] [margin:1.8cqw_0_2.4cqw] max-[700px]:[height:8cqw] max-[700px]:[margin:4cqw_0_5cqw]",
  "welcomeQuote": "m-home-welcomeQuote m-0 [max-width:52cqw] [font-size:clamp(15px,_1.4cqw,_22px)] [line-height:1.75] [color:#444] [text-wrap:balance] max-[700px]:max-w-none",
  "about": "m-home-about grid [grid-template-columns:minmax(0,_1fr)_minmax(0,_1fr)] [background:#f6f6f7] max-[700px]:[grid-template-columns:minmax(0,_1fr)]",
  "aboutCopy": "m-home-aboutCopy relative [padding:5cqw_5cqw_5cqw_5.5cqw] flex flex-col justify-center max-[700px]:[padding:10cqw_6cqw_12cqw]",
  "aboutTitle": "m-home-aboutTitle [margin:0_0_1.2cqw_-1.5cqw] font-normal [font-size:5.6cqw] [line-height:1.35] [color:#1a1a1a85] max-[700px]:[margin:0_0_4cqw_-1cqw] max-[700px]:[font-size:14cqw]",
  "aboutText": "m-home-aboutText relative [border-left:1px_solid_#bdbdbd] [padding-left:1.4cqw] [font-size:max(15px,_1cqw)] [line-height:1.7] [color:#555] flex flex-col [gap:1.2cqw] [text-wrap:pretty] [&_p]:m-0 max-[700px]:[font-size:15px] max-[700px]:[gap:14px] max-[700px]:[padding-left:16px]",
  "aboutImage": "m-home-aboutImage relative [min-height:60cqw] overflow-hidden max-[700px]:[min-height:110cqw]",
  "footer": "m-home-footer relative [background:var(--color-burgundy)] text-white [padding:6cqw_5.5cqw] overflow-hidden [&_a]:text-white max-[700px]:[padding:14cqw_6cqw]",
  "footerGrid": "m-home-footerGrid grid [grid-template-columns:minmax(0,_22cqw)_minmax(0,_1fr)] [gap:4cqw] items-center max-[700px]:[grid-template-columns:minmax(0,_1fr)] max-[700px]:[gap:10cqw]",
  "footerNav": "m-home-footerNav flex flex-col [gap:1.6cqw] [&_a]:[font-size:clamp(18px,_1.7cqw,_28px)] [&_a]:[font-weight:300] max-[700px]:[gap:14px]",
  "footerMain": "m-home-footerMain flex flex-col items-start",
  "founder": "m-home-founder relative [width:max(120px,_10cqw)] [height:max(120px,_10cqw)] [border-radius:50%] overflow-hidden [&_img]:object-cover [&_img]:[object-position:47%_0%] [&_img]:[transform:scale(1.5)] [&_img]:[transform-origin:46%_8%]",
  "footerText": "m-home-footerText [margin:2cqw_0_0] [max-width:44cqw] [font-size:clamp(15px,_1.35cqw,_22px)] [line-height:1.45] [font-weight:300] text-white [text-wrap:pretty] max-[700px]:max-w-none max-[700px]:[margin-top:24px]",
  "copyright": "m-home-copyright [margin:1.4cqw_0_0] [font-size:clamp(13px,_1.1cqw,_18px)] text-white [font-weight:300] max-[700px]:[margin-top:14px]",
  "consultation": "m-home-consultation [.m-home-footer_&]:[margin-top:2.4cqw] [.m-home-footer_&]:flex [.m-home-footer_&]:items-center [.m-home-footer_&]:[gap:1.4cqw] [.m-home-footer_&]:bg-white [.m-home-footer_&]:[color:#4a4a4a] [.m-home-footer_&]:[border-radius:999px] [.m-home-footer_&]:[padding:0.9cqw_2cqw] [.m-home-footer_&]:[font-size:clamp(14px,_1.25cqw,_20px)] [.m-home-footer_&]:font-medium max-[700px]:[.m-home-footer_&]:[margin-top:28px] max-[700px]:[.m-home-footer_&]:[gap:14px] max-[700px]:[.m-home-footer_&]:[padding:12px_24px]",
  "arrow": "m-home-arrow [width:1.3cqw] [height:1.3cqw] [min-width:14px] [min-height:14px]",
  "footerLinks": "m-home-footerLinks flex flex-col [gap:2cqw] [margin-top:3cqw] [&_a]:flex [&_a]:items-center [&_a]:[gap:1.4cqw] [&_a]:[font-size:clamp(18px,_1.6cqw,_26px)] [&_a]:[font-weight:300] [&_a]:[padding-left:1cqw] max-[700px]:[gap:20px] max-[700px]:[margin-top:32px] max-[700px]:[&_a]:[gap:14px] max-[700px]:[&_a]:[padding-left:0]",
} as const;

export default styles;
