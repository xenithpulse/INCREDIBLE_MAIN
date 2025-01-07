// General SEO Configuration for the Website
export const websiteSEO = {
  // Title of the website displayed in the browser tab and search results
  title: "Incredible Homes: Premium Home Decor & Household Items in Pakistan",

  // Meta description for search engines; concise summary of what the website offers
  description: "Discover exceptional home decor & household items at Incredible Homes. We offer high-quality products, meticulous craftsmanship, & delivery across Pakistan. Shop now!",

  // Canonical URL to avoid duplicate content issues and specify the preferred version of the page
  canonical: "https://theincrediblehomes.com/", // Updated domain for the main website

  openGraph: {
    // Open Graph metadata for social media sharing (e.g., Facebook, LinkedIn)
    url: "https://theincrediblehomes.com/",  // URL to be shared on social platforms
    title: "Incredible Homes: Premium Home Decor & Household Items in Pakistan",  // Title for social platforms
    description: "Discover exceptional home decor & household items at Incredible Homes. We offer high-quality products, meticulous craftsmanship, & delivery across Pakistan. Shop now!",  // Description for social media preview
    images: [
      {
        url: 'https://theincrediblehomes.com/images/og-image.jpg', // Image for social media preview (OG Image)
        width: 1200, // Width of the image
        height: 630, // Height of the image
        alt: "Incredible Homes: Premium Home Decor & Household Items in Pakistan", // Alt text for the image
      },
    ],
    site_name: 'Incredible Homes',  // Site name for social media sharing
  },

  // Additional meta tags that help improve SEO and specify directives for search engine crawlers
  additionalMetaTags: [
    {
      name: 'keywords',  // A list of keywords to help search engines index the site properly
      content: "home decor, household items, home furnishings, furniture, decor, home accessories, Pakistan, online shopping, new arrivals, interior design, premium quality, handcrafted, meticulously crafted",
    },
    {
      name: 'robots',  // Tells search engine crawlers whether to index and follow the page
      content: 'index, follow',
    },
    {
      name: 'googlebot',  // Specific instructions for Google's search engine crawler
      content: 'index, follow',
    },
  ],
};

// Dynamic SEO Configuration for Each Product Page
export const generateProductSEO = (product) => {
    // Default product description if not provided
    const productDescription = product.description || "Discover more about this product at Incredible Homes!";

  return {
    // Title for the product page (appears in the browser tab and search results)
    title: `${product.title} | Incredible Homes - Premium Home Decor`,

    // Meta description for the product page (max 155 characters for search results)
    description: productDescription.substring(0, 155) + "...",

    // Canonical URL for the product page (avoids duplicate content issues)
    canonical: `https://theincrediblehomes.com/products/${product.slug}`,  // Dynamic URL based on product slug

    openGraph: {
      // Open Graph metadata for social media sharing (e.g., Facebook, LinkedIn)
      url: `https://theincrediblehomes.com/products/${product.slug}`,  // URL of the product page
      title: `${product.title} | Incredible Homes - Premium Home Decor`,  // Title for social media sharing
      description: productDescription.substring(0, 155) + "...",  // Product description for preview
      images: [{ url: product.images[0], alt: `Image of ${product.title}` }],  // Product image for social sharing
      type: 'product',  // Specifies the content type for social media sharing (important for e-commerce)
    },

    // Additional meta tags for the product page to help search engines index the page
    additionalMetaTags: [
      {
        name: 'robots',  // Directs search engine crawlers to index and follow the product page
        content: 'index, follow',
      },
      {
        name: 'googlebot',  // Tells Googlebot to index and follow the product page
        content: 'index, follow',
      },
    ],
  };
};
