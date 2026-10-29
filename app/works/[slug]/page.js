import { notFound } from 'next/navigation';
import { PROJECTS } from '../../data/projects';
import CaseStudyView from './CaseStudyView';

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: 'Project Not Found — PixelMutiny DigiMedia',
      description: 'The requested case study could not be located in the PixelMutiny DigiMedia archive.',
    };
  }

  const title = `${project.client} — ${project.title} | PixelMutiny DigiMedia`;
  const description = project.challenge.length > 160 
    ? `${project.challenge.slice(0, 157)}...` 
    : project.challenge;

  return {
    title,
    description,
    alternates: {
      canonical: `/works/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `/works/${slug}`,
      type: 'article',
      images: [
        {
          url: project.heroImg,
          width: 1200,
          height: 750,
          alt: `${project.client} - ${project.title}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [project.heroImg],
    },
  };
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  const projectIndex = PROJECTS.findIndex((p) => p.slug === slug);

  if (projectIndex === -1) {
    notFound();
  }

  const project = PROJECTS[projectIndex];

  // Circular previous and next project navigation
  const prevIndex = (projectIndex - 1 + PROJECTS.length) % PROJECTS.length;
  const nextIndex = (projectIndex + 1) % PROJECTS.length;

  const prevProject = PROJECTS[prevIndex];
  const nextProject = PROJECTS[nextIndex];

  // Structured Data (JSON-LD CreativeWork)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: `${project.client} — ${project.title}`,
    headline: project.title,
    description: project.challenge,
    image: project.heroImg,
    creator: {
      '@type': 'Organization',
      name: 'PixelMutiny DigiMedia Private Limited',
      url: 'https://pixelmutiny.com',
    },
    datePublished: `${project.year}-01-01`,
    genre: project.category,
    keywords: project.deliverables.join(', '),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CaseStudyView
        project={project}
        prevProject={prevProject}
        nextProject={nextProject}
      />
    </>
  );
}
