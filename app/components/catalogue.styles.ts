// Generated from the original CSS measurements; edit class utilities here.
// Marker classes scope ancestor and hover variants without global selectors.
const styles = {
  "bars": "m-catalogue-bars flex flex-col [gap:0.2cqw]",
  "bar": "m-catalogue-bar [--bar-h:8.2cqw] [--bar-h-open:max(84px,_11.5cqw)] [--bar-ease:cubic-bezier(0.22,_0.61,_0.36,_1)] relative [height:var(--bar-h)] [min-height:var(--bar-h)] overflow-hidden flex items-center w-full p-0 border-0 [background:#222] text-white [font:inherit] cursor-pointer [transition:min-height_1.1s_var(--bar-ease)] hover:text-white focus-visible:[outline-offset:-4px] focus-visible:[outline-color:#fff] [@media(hover:hover)]:hover:[min-height:var(--bar-h-open)] focus-visible:[min-height:var(--bar-h-open)] max-[700px]:[--bar-h:max(64px,_16cqw)] max-[700px]:[--bar-h-open:max(84px,_22cqw)] motion-reduce:[transition:none]",
  "barMedia": "m-catalogue-barMedia absolute [inset:0] overflow-hidden [pointer-events:none]",
  "barImage": "m-catalogue-barImage object-cover [object-position:center_45%] [transition:transform_1.4s_var(--bar-ease)] [@media(hover:hover)]:[.m-catalogue-bar:hover_&]:[transform:scale(1.05)] [.m-catalogue-bar:focus-visible_&]:[transform:scale(1.05)] motion-reduce:[transition:none]",
  "barShade": "m-catalogue-barShade absolute [inset:0] [background:rgba(0,_0,_0,_0.32)] [transition:opacity_1.1s_ease] [@media(hover:hover)]:[.m-catalogue-bar:hover_&]:opacity-0 [.m-catalogue-bar:focus-visible_&]:opacity-0 motion-reduce:[transition:none]",
  "barTitle": "m-catalogue-barTitle relative [flex:1] flex flex-col items-center [transition:transform_1.1s_var(--bar-ease)] [@media(hover:hover)]:[.m-catalogue-bar:hover_&]:[transform:translateY(-1.1cqw)] [.m-catalogue-bar:focus-visible_&]:[transform:translateY(-1.1cqw)] max-[700px]:[padding:0_6cqw] motion-reduce:[transition:none]",
  "barName": "m-catalogue-barName whitespace-nowrap text-center font-black [font-size:2.05cqw] [letter-spacing:-0.03cqw] [text-shadow:0_2px_14px_rgba(0,_0,_0,_0.35)] [transition:transform_1.1s_var(--bar-ease)] [@media(hover:hover)]:[.m-catalogue-bar:hover_&]:[transform:scale(1.08)] [.m-catalogue-bar:focus-visible_&]:[transform:scale(1.08)] max-[700px]:[white-space:normal] max-[700px]:[font-size:max(11px,_3.4cqw)] max-[700px]:[line-height:1.15] motion-reduce:[transition:none]",
  "barBrowse": "m-catalogue-barBrowse absolute [top:100%] [margin-top:0.7cqw] flex items-center [gap:1cqw] opacity-0 [transition:opacity_0.9s_ease_0.15s] [@media(hover:hover)]:[.m-catalogue-bar:hover_&]:opacity-100 [.m-catalogue-bar:focus-visible_&]:opacity-100 motion-reduce:[transition:none]",
  "barBrowseLabel": "m-catalogue-barBrowseLabel [font-size:max(10px,_0.7cqw)] [letter-spacing:0.3em] font-bold",
  "barBrowseIcon": "m-catalogue-barBrowseIcon [width:max(30px,_2.4cqw)] [height:max(30px,_2.4cqw)] [border-radius:50%] [border:1px_solid_rgba(255,_255,_255,_0.6)] [background:rgba(20,_20,_20,_0.45)] flex items-center justify-center [&_svg]:[width:45%] [&_svg]:[height:45%]",
  "overlay": "m-catalogue-overlay fixed [inset:0] [z-index:100] [background:rgba(17,_17,_17,_0.55)] [backdrop-filter:blur(6px)] [overflow-y:auto] [padding:4vh_4vw]",
  "modal": "m-catalogue-modal [max-width:1600px] [margin:0_auto] bg-white [box-shadow:0_30px_80px_rgba(0,_0,_0,_0.25)]",
  "modalHeader": "m-catalogue-modalHeader sticky [top:-4vh] [z-index:2] bg-white flex items-center [gap:clamp(16px,_2.4vw,_36px)] [padding:clamp(20px,_3vw,_48px)_clamp(20px,_3.6vw,_60px)] [border-bottom:1px_solid_#eee] max-[700px]:[flex-wrap:wrap]",
  "modalEyebrow": "m-catalogue-modalEyebrow [font-size:clamp(10px,_0.8vw,_13px)] [letter-spacing:0.4em] font-semibold [color:#8a8a8a] whitespace-nowrap max-[700px]:[flex-basis:100%] max-[700px]:[order:-1]",
  "modalTitle": "m-catalogue-modalTitle m-0 [flex:1] min-w-0 font-black [font-size:clamp(22px,_3.2vw,_52px)] [line-height:1] [letter-spacing:-0.02em]",
  "modalClose": "m-catalogue-modalClose flex-none [width:clamp(40px,_3.4vw,_56px)] [height:clamp(40px,_3.4vw,_56px)] [border-radius:50%] border-0 [background:#f2f2f2] [font-size:clamp(18px,_1.4vw,_24px)] [color:var(--color-ink)] cursor-pointer",
  "modalGrid": "m-catalogue-modalGrid grid [grid-template-columns:repeat(auto-fill,_minmax(min(100%,_260px),_1fr))] [gap:clamp(16px,_2.2vw,_40px)] [padding:clamp(20px,_3.6vw,_60px)]",
  "tile": "m-catalogue-tile relative block w-full [aspect-ratio:4_/_5] overflow-hidden p-0 border-0 [background:#f2f2f2] cursor-zoom-in [&_img]:object-cover [&_img]:[transition:transform_0.6s_ease] [&:hover_img]:[transform:scale(1.04)] [&:focus-visible_img]:[transform:scale(1.04)] motion-reduce:[&_img]:[transition:none]",
  "tileBadge": "m-catalogue-tileBadge absolute [top:12px] [right:12px] [z-index:1] [width:24px] [height:24px] [fill:#fff] [filter:drop-shadow(0_1px_3px_rgba(0,_0,_0,_0.45))]",
  "empty": "m-catalogue-empty m-0 [padding:clamp(60px,_8vw,_140px)_20px] text-center [font-size:clamp(18px,_1.6vw,_26px)] [color:#888]",
} as const;

export default styles;
