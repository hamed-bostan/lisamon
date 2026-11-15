// Generated from the original CSS measurements; edit class utilities here.
// Marker classes scope ancestor and hover variants without global selectors.
const styles = {
  "lightbox": "m-lightbox-lightbox fixed [inset:0] [z-index:200] [background:rgba(17,_17,_17,_0.82)] [backdrop-filter:blur(10px)]",
  "track": "m-lightbox-track flex w-full h-full [overflow-x:auto] [overscroll-behavior-x:contain] [scroll-snap-type:x_mandatory] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
  "slide": "m-lightbox-slide [flex:0_0_100%] box-border flex items-center justify-center [padding:clamp(56px,_7vh,_90px)_clamp(16px,_4vw,_80px)] [scroll-snap-align:center] [scroll-snap-stop:always]",
  "image": "m-lightbox-image block [max-width:100%] [max-height:100%] object-contain [box-shadow:0_30px_80px_rgba(0,_0,_0,_0.4)]",
  "close": "m-lightbox-close absolute [width:56px] [height:56px] [border-radius:50%] border-0 [background:rgba(38,_38,_38,_0.9)] text-white cursor-pointer flex items-center justify-center [top:clamp(14px,_2.4vw,_28px)] [right:clamp(14px,_2.4vw,_28px)] [&_svg]:[width:22px] [&_svg]:[height:22px] focus-visible:[outline-color:#fff]",
  "nav": "m-lightbox-nav absolute [width:56px] [height:56px] [border-radius:50%] border-0 [background:rgba(38,_38,_38,_0.9)] text-white cursor-pointer flex items-center justify-center [&_svg]:[width:22px] [&_svg]:[height:22px] focus-visible:[outline-color:#fff] [top:50%] [transform:translateY(-50%)] [transition:opacity_0.2s_ease] disabled:opacity-0 disabled:[pointer-events:none]",
  "prev": "m-lightbox-prev [left:clamp(14px,_2.4vw,_28px)]",
  "next": "m-lightbox-next [right:clamp(14px,_2.4vw,_28px)]",
  "dots": "m-lightbox-dots absolute [left:50%] [bottom:clamp(18px,_3vh,_34px)] [transform:translateX(-50%)] flex [gap:10px]",
  "dot": "m-lightbox-dot [width:44px] [height:44px] p-0 border-0 [border-radius:50%] bg-transparent cursor-pointer flex items-center justify-center after:content-[''] after:[width:9px] after:[height:9px] after:[border-radius:50%] after:[background:rgba(255,_255,_255,_0.65)] aria-[current=true]:after:bg-white focus-visible:[outline-color:#fff]",
} as const;

export default styles;
