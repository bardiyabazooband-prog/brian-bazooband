import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import About from "@/components/About";
import Process from "@/components/Process";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { contactReady } from "@/lib/contact-server";
export const dynamic = "force-dynamic";
export default function Home() {
 return <><Navbar /><main id="main"><Hero /><Services /><Portfolio /><About /><Process /><Pricing /><Testimonials /><FAQ /><Contact ready={contactReady()} /></main><Footer year={new Date().getFullYear()} /></>;
}
