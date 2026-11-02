import { ImageResponse } from "next/og";
export const alt = "Brian Bazooband — Your next chapter. Built for the web.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
 return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#080A10", color: "#F5F7FF", fontFamily: "sans-serif", backgroundImage: "radial-gradient(ellipse at 100% 0%, #252d66 0%, #080a10 65%)" }}><div style={{ display: "flex", fontSize: 28 }}>Brian Bazooband<span style={{ color: "#6C7CFF" }}>.</span></div><div style={{ display: "flex", flexDirection: "column", fontSize: 80, letterSpacing: -5, lineHeight: 1.05 }}><span>Your next chapter.</span><span style={{ color: "#8d9aff" }}>Built for the web.</span></div><div style={{ display: "flex", fontSize: 22, color: "#9BA4B8" }}>Independent developer. Intentional design.</div></div>, size);
}
