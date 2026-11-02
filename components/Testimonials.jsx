"use client";
import { Quote } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { usePreferences } from "./Providers";
import { Reveal, SectionHeading } from "./UI";
export default function Testimonials() {
 const { t, language } = usePreferences();
 const reviews = siteConfig.testimonials.filter(review => review.verified && review.name && review.quote?.en && review.quote?.es);
 if (!reviews.length) return null;
 return <section className="section container"><SectionHeading {...t.testimonials} /><div className="reviews-grid">{reviews.map((review, i) => <Reveal className="review" key={i}><Quote size={25} aria-hidden="true" /><blockquote>{review.quote[language]}</blockquote><p>{review.name}{review.role?.[language] && <span>{review.role[language]}</span>}</p></Reveal>)}</div></section>;
}
