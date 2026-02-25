/**
 * composables/useSEO.ts
 * SEO Meta Tags Manager for Vue 3
 * Manages page titles, descriptions, and other meta tags
 */

interface SEOConfig {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  canonical?: string;
}

export function useSEO(config: SEOConfig) {
  const baseTitle = "Rohan Jadav - Full Stack Developer | Creative Studio Portfolio";
  const baseDomain = "https://yourdomain.com";

  // Set page title
  if (config.title) {
    document.title = `${config.title} | Rohan Jadav`;
  } else {
    document.title = baseTitle;
  }

  // Update or create meta description
  updateMetaTag(
    "name",
    "description",
    config.description ||
      "Full Stack Developer specializing in React, Vue.js, JavaScript, and Tailwind CSS"
  );

  // Update or create keywords meta tag
  if (config.keywords) {
    updateMetaTag("name", "keywords", config.keywords);
  }

  // Update Open Graph tags
  if (config.ogTitle) {
    updateMetaTag("property", "og:title", config.ogTitle);
  }
  if (config.ogDescription) {
    updateMetaTag("property", "og:description", config.ogDescription);
  }
  if (config.ogImage) {
    updateMetaTag("property", "og:image", config.ogImage);
  }

  // Update Twitter tags
  if (config.twitterTitle) {
    updateMetaTag("name", "twitter:title", config.twitterTitle);
  }
  if (config.twitterDescription) {
    updateMetaTag("name", "twitter:description", config.twitterDescription);
  }

  // Update canonical link
  updateCanonicalLink(config.canonical || baseDomain);
}

/**
 * Update or create a meta tag
 */
function updateMetaTag(
  attribute: "name" | "property",
  value: string,
  content: string
) {
  let element = document.querySelector(`meta[${attribute}="${value}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, value);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

/**
 * Update canonical link
 */
function updateCanonicalLink(url: string) {
  let link = document.querySelector("link[rel='canonical']");

  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }

  link.setAttribute("href", url);
}

/**
 * Generate structured data for a page
 */
export function generateStructuredData(type: "article" | "product" | "person", data: Record<string, any>) {
  const baseData = {
    "@context": "https://schema.org",
    "@type": type,
    ...data,
  };

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(baseData);
  document.head.appendChild(script);
}
