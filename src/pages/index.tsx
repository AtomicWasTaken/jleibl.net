import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useSmoothScroll } from '../hooks/useSmoothScroll';

const Header = dynamic(() => import('../components/layout/Header').then(mod => ({ default: mod.Header })));
const Hero = dynamic(() => import('../components/sections/Hero').then(mod => ({ default: mod.Hero })));
const About = dynamic(() => import('../components/sections/About').then(mod => ({ default: mod.About })));
const Work = dynamic(() => import('../components/sections/Work').then(mod => ({ default: mod.Work })));
const Footer = dynamic(() => import('../components/layout/Footer').then(mod => ({ default: mod.Footer })));

export default function Home() {
  useSmoothScroll();

  return (
      <div className="min-h-screen theme-transition">
        <Head>
          <title>Jan-Marlon Leibl • Fullstack Software Developer | PHP & TypeScript Expert</title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          
          <meta name="title" content="Jan-Marlon Leibl • Fullstack Software Developer | PHP & TypeScript Expert" />
          <meta name="description" content="Experienced Fullstack Developer specializing in PHP and TypeScript. Creating high-performance web applications and digital experiences with modern technologies." />
          <meta name="keywords" content="Software Development, PHP Developer, TypeScript, Fullstack Engineer, Web Development, System Architecture, MySQL, React, Performance Optimization" />
          <meta name="author" content="Jan-Marlon Leibl" />
          <meta name="robots" content="index, follow" />

          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://jleibl.net/" />
          <meta property="og:title" content="Jan-Marlon Leibl • Fullstack Software Developer" />
          <meta property="og:description" content="Experienced Fullstack Developer specializing in PHP and TypeScript. Creating high-performance web applications and digital experiences with modern technologies." />
          <meta property="og:image" content="https://jleibl.net/profile-image.jpg" />
          <meta property="og:image:width" content="400" />
          <meta property="og:image:height" content="400" />
          <meta property="og:image:alt" content="Jan-Marlon Leibl - Fullstack Software Developer" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content="https://jleibl.net/" />
          <meta name="twitter:title" content="Jan-Marlon Leibl • Fullstack Software Developer" />
          <meta name="twitter:description" content="Experienced Fullstack Developer specializing in PHP and TypeScript. Creating high-performance web applications and digital experiences with modern technologies." />
          <meta name="twitter:image" content="https://jleibl.net/profile-image.jpg" />
          <meta name="twitter:image:alt" content="Jan-Marlon Leibl - Fullstack Software Developer" />

          <link rel="icon" href="/profile-image.jpg" type="image/jpeg" />
          <link rel="canonical" href="https://jleibl.net/" />
        </Head>

      <Header />
      <Hero />
      <About />
      <Work />
      <Footer />
      </div>
  );
}
