import React, { useRef, useState, useEffect } from "react";

export default function PinkCarousel() {
  const images = [
    "https://www.w3schools.com/howto/img_nature_wide.jpg",
    "https://www.w3schools.com/howto/img_snow_wide.jpg",
    "https://www.w3schools.com/howto/img_mountains_wide.jpg",
    "https://www.w3schools.com/howto/img_nature_wide.jpg",
    "https://www.w3schools.com/howto/img_snow_wide.jpg",
  ];

  const [active, setActive] = useState(2); // center image index
  const stripRef = useRef(null);

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;

    const imgs = strip.querySelectorAll(".pc-image");
    const target = imgs[active];
    if (target) {
      const offset =
        target.offsetLeft -
        (strip.clientWidth / 2 - target.clientWidth / 2);

      strip.scrollTo({ left: offset, behavior: "smooth" });
    }
  }, [active]);

  function prev() {
    setActive((s) => (s > 0 ? s - 1 : 0));
  }

  function next() {
    setActive((s) => (s < images.length - 1 ? s + 1 : images.length - 1));
  }

  return (
    <div className="pc-root">
      <style>{`
        .pc-root { font-family: Inter, Arial, sans-serif; }
        .pc-hero { position: relative; background: #f1cfe0; padding: 48px 20px 120px; overflow: hidden; }

        /* background curves */
        .pc-hero::before, .pc-hero::after {
          content: '';
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 130%;
          height: 180px;
          background: #f1cfe0;
        }

        .pc-hero::before {
          top: -140px;
          border-bottom-left-radius: 50% 100%;
          border-bottom-right-radius: 50% 100%;
        }

        .pc-hero::after {
          bottom: -140px;
          border-top-left-radius: 50% 100%;
          border-top-right-radius: 50% 100%;
        }

        .pc-container { max-width: 1100px; margin: 0 auto; position: relative; z-index: 2; }
        .pc-title { text-align: center; margin-top: 8px; font-weight: 800; font-size: 48px; }
        .pc-sub { text-align: center; opacity: 0.7; margin-top: 6px; }

        /* STRIP */
        .pc-strip-wrap { margin-top: 40px; display: flex; justify-content: center; }
        .pc-strip { width: 100%; max-width: 900px; overflow-x: auto; scroll-behavior: smooth; }
        
        .pc-strip-inner {
          display: flex;
          gap: 20px;
          padding: 20px 40px;
          transform: perspective(1600px) rotateX(12deg);
        }

        /* BASE IMAGE STYLE */
        .pc-image {
          flex: 0 0 30%;
          height: 260px;
          border-radius: 10px;
          object-fit: cover;
          transition: 400ms cubic-bezier(.2,.9,.2,1);
          opacity: 0.25;
          transform-style: preserve-3d;
        }

        /* CENTER SMALL */
        .pc-image.center {
          transform: translateY(-20px) scale(0.85);
          opacity: 1;
          z-index: 5;
        }

        /* LEFT BIGGER + CURVED */
        .pc-image.left {
          transform: rotateY(30deg) translateY(10px) scale(1.05);
          transform-origin: center right;
          opacity: 1;
          z-index: 3;
        }

        /* RIGHT BIGGER + CURVED */
        .pc-image.right {
          transform: rotateY(-30deg) translateY(10px) scale(1.05);
          transform-origin: center left;
          opacity: 1;
          z-index: 3;
        }

        /* HIDE OTHER IMAGES */
        .pc-image.hidden {
          opacity: 0;
          pointer-events: none;
          transform: scale(0.7);
        }

        .pc-controls { display:flex; gap:12px; justify-content:center; margin-top: 20px; }
        .pc-btn { width:44px; height:44px; border-radius:50%; border:2px solid black; background:transparent; cursor:pointer; display:flex; align-items:center; justify-content:center; }
      `}</style>

      <section className="pc-hero">
        <div className="pc-container">

          <h1 className="pc-title">BECOMING A<br />WEBFLOW WIZARD</h1>
          <div className="pc-sub">Interactions, Layout, & Custom Code</div>

          <div className="pc-strip-wrap">
            <div className="pc-strip" ref={stripRef}>
              <div className="pc-strip-inner">
                {images.map((src, i) => {
                  let cls = "pc-image";

                  if (i === active) cls += " center";
                  else if (i === active - 1) cls += " left";
                  else if (i === active + 1) cls += " right";
                  else cls += " hidden";

                  return (
                    <img
                      key={i}
                      src={src}
                      alt={slide-${i}}
                      className={cls}
                      onClick={() => setActive(i)}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          <div className="pc-controls">
            <button className="pc-btn" onClick={prev}>←</button>
            <button className="pc-btn" onClick={next}>→</button>
          </div>

        </div>
      </section>
    </div>
  );
}