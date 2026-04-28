"use client";

/**
 * Infinite logo strip — loop math and measurement follow lms-core
 * `HomePartnersBlock` / `home-partners-marquee` (Mini-SaaS-LMS/lms-core):
 * two abutting sets, LTR isolate, zero gap on the track, stride refined with
 * `getBoundingClientRect` after layout (avoids blank band at loop reset).
 */

import Image from "next/image";
import type { CSSProperties } from "react";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import type { SuccessPartnerPublic } from "@/lib/api";
import { resolvePartnerLogoSrc } from "@/lib/partner-logo-url";

const MARQUEE_LOOP_SECONDS = Math.min(120, Math.max(16, 40));

function LogoCell({
  p,
  duplicate,
  onLogoPainted,
}: {
  p: SuccessPartnerPublic;
  duplicate: boolean;
  onLogoPainted?: () => void;
}) {
  const src = resolvePartnerLogoSrc(p.logoUrl);
  const alt = p.label?.trim() || "Partner logo";
  const inner = (
    <div
      className="relative h-14 w-32 md:h-16 md:w-40 shrink-0 flex items-center justify-center px-2"
      data-clients-marquee-slot
    >
      <Image
        src={src}
        alt={duplicate ? "" : alt}
        fill
        className="object-contain"
        sizes="(max-width: 768px) 128px, 160px"
        unoptimized={src.includes(".svg")}
        onLoadingComplete={onLogoPainted}
      />
    </div>
  );
  if (duplicate) {
    return <div className="shrink-0 opacity-80">{inner}</div>;
  }
  if (p.websiteUrl) {
    return (
      <a
        href={p.websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 opacity-80 hover:opacity-100 transition-opacity"
      >
        {inner}
      </a>
    );
  }
  return <div className="shrink-0">{inner}</div>;
}

export function PartnersMarquee({ list }: { list: SuccessPartnerPublic[] }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const setARef = useRef<HTMLDivElement>(null);
  const setBRef = useRef<HTMLDivElement>(null);
  const [marqueeAnimate, setMarqueeAnimate] = useState(false);

  const listKey = list.map((p) => p.id).join("\0");

  const layoutMarquee = useCallback((): void => {
    const t = trackRef.current;
    const aEl = setARef.current;
    const bEl = setBRef.current;
    const vpEl = viewportRef.current;
    if (!t || !aEl || !bEl || !vpEl) return;

    const slotCount = aEl.querySelectorAll("[data-clients-marquee-slot]").length;
    /**
     * Prefer `clientWidth` (content box). Per lms-core: mixing with `getBoundingClientRect().width`
     * can mismatch stride vs RTL scrollbar placement.
     */
    const clientW = vpEl.clientWidth;
    const rectW = Math.round(vpEl.getBoundingClientRect().width);
    const cw = Math.max(1, clientW > 0 ? clientW : rectW);
    if (cw < 1 || slotCount < 1) {
      setMarqueeAnimate(false);
      t.removeAttribute("data-marquee-shift");
      t.style.removeProperty("--clients-marquee-shift-px");
      return;
    }

    const aw = aEl.offsetWidth;
    if (aw < 4) {
      setMarqueeAnimate(false);
      t.removeAttribute("data-marquee-shift");
      t.style.removeProperty("--clients-marquee-shift-px");
      return;
    }

    t.style.setProperty("--clients-marquee-shift-px", `-${aw}px`);
    t.setAttribute("data-marquee-shift", "50%");
    setMarqueeAnimate(true);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const ar = aEl.getBoundingClientRect();
        const br = bEl.getBoundingClientRect();
        const strideDom = br.left - ar.left;
        if (!Number.isFinite(strideDom) || strideDom < 4) return;
        const px = Math.ceil(strideDom - 1e-3);
        t.style.setProperty("--clients-marquee-shift-px", `-${px}px`);
      });
    });
  }, []);

  const syncMarqueeShift = useCallback(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(layoutMarquee);
    });
  }, [layoutMarquee]);

  useLayoutEffect(() => {
    if (list.length === 0) return;

    layoutMarquee();
    const track = trackRef.current;
    const a = setARef.current;
    const b = setBRef.current;
    if (!track || !a || !b) return;

    requestAnimationFrame(() => {
      requestAnimationFrame(layoutMarquee);
    });

    const ro = new ResizeObserver(() => {
      layoutMarquee();
    });
    const vp = track.parentElement;
    if (vp) ro.observe(vp);

    const onWinResize = (): void => {
      layoutMarquee();
    };
    const onWinLoad = (): void => {
      layoutMarquee();
    };
    window.addEventListener("resize", onWinResize);
    if (document.readyState === "complete") {
      requestAnimationFrame(() => {
        requestAnimationFrame(layoutMarquee);
      });
    } else {
      window.addEventListener("load", onWinLoad);
    }

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", onWinResize);
      window.removeEventListener("load", onWinLoad);
    };
  }, [list, listKey, layoutMarquee]);

  const trackStyle: CSSProperties = {
    gap: 0,
    columnGap: 0,
    rowGap: 0,
    ...(marqueeAnimate
      ? {
          ["--clients-marquee-duration" as string]: `${MARQUEE_LOOP_SECONDS}s`,
        }
      : {}),
  };

  return (
    <div
      ref={viewportRef}
      className="clients-marquee-viewport group w-full max-w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      data-marquee-ready={marqueeAnimate ? "true" : "false"}
      dir="ltr"
    >
      <div
        ref={trackRef}
        dir="ltr"
        className={`clients-marquee-track w-max ${marqueeAnimate ? "clients-marquee-track--animate" : ""}`}
        style={trackStyle}
      >
        <div ref={setARef} className="clients-marquee-set flex shrink-0 flex-nowrap items-center gap-10 md:gap-16">
          {list.map((p) => (
            <LogoCell key={p.id} p={p} duplicate={false} onLogoPainted={syncMarqueeShift} />
          ))}
        </div>
        <div
          ref={setBRef}
          className="clients-marquee-set flex shrink-0 flex-nowrap items-center gap-10 md:gap-16"
          aria-hidden
        >
          {list.map((p) => (
            <LogoCell key={`dup-${p.id}`} p={p} duplicate onLogoPainted={syncMarqueeShift} />
          ))}
        </div>
      </div>
    </div>
  );
}
