const fs = require("fs");
const path = require("path");
const { request, gql } = require("graphql-request");

const endpoint = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const EXTERNAL_DATA_URL = process.env.NEXT_PUBLIC_SITEMAP_URL;

// Define your GraphQL queries directly as string literals
const GET_ALL_BLOGS = gql`
  query Blogs($pagination: PaginationArg, $filters: BlogFiltersInput) {
    blogs(pagination: $pagination, filters: $filters) {
      data {
        attributes {
          slug
          title
          publishedAt
        }
      }
    }
  }
`;
// Define other queries similarly...
const GET_ALL_ARTICLES = gql`
  query articles($filters: ArticleFiltersInput, $pagination: PaginationArg) {
    articles(filters: $filters, pagination: $pagination) {
      data {
        id
        attributes {
          title
          slug
          excerpt

          publishedAt
        }
      }
    }
  }
`;
async function fetchBlogs() {
  const data = await request(
    endpoint,
    GET_ALL_BLOGS,
    (variables = {
      pagination: {
        limit: 2000,
      },
    })
  );
  return data?.blogs?.data;
}
async function fetchArticles() {
  const data = await request(
    endpoint,
    GET_ALL_ARTICLES,
    (variables = {
      pagination: {
        limit: 2000,
      },
    })
  );
  return data?.articles?.data;
}
async function fetchTools() {
  let response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}aiTool/get-aiTool?getAllNames=true&isLive=true`,
    {
      headers: {
        "Content-Type": "application/json", // Replace 'Custom-Header' with your actual header and 'Value' with its value
      },
    }
  );
  let res = await response.json();

  const data = res?.payload?.names?.map(({ slugId }) => ({
    title: slugId,
  }));
  return await data;
}
async function fetchGpts() {
  let response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}app/get-app?getAllNames=true&isLive=true`,
    {
      headers: {
        "Content-Type": "application/json", // Replace 'Custom-Header' with your actual header and 'Value' with its value
      },
    }
  );
  let res = await response.json();
  const data = res?.payload?.names?.map(({ slugId }) => ({
    title: slugId,
  }));
  return await data;
}
// Define other fetch functions similarly...
function generateToolsUrls(data, url = "") {
  const limitedData = data.slice(0, 1000);

  return limitedData
    .map(
      (item) => `
      <url>
        <loc>${`${EXTERNAL_DATA_URL}/${url}/${item?.title}`}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.7</priority>
      </url>
    `
    )
    .join("");
}
function generateGptsUrls(data, url = "") {
  const limitedData = data.slice(0, 3000);

  return limitedData
    .map(
      (item) => `
      <url>
        <loc>${`${EXTERNAL_DATA_URL}/${url}/${item?.title}`}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.7</priority>
      </url>
    `
    )
    .join("");
}

function generateUrls(data, url = "") {
  return data
    .map(
      (item) => `
      <url>
        <loc>${`${EXTERNAL_DATA_URL}/${url}/${item.attributes.slug}`}</loc>
        <lastmod>${new Date(
          item.attributes.publishedAt
        )?.toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.7</priority>
      </url>
    `
    )
    .join("");
}
function generateArricleUrls(data, url = "") {
  return data
    .map(
      (item) => `
      <url>
        <loc>${`${EXTERNAL_DATA_URL}/${url}/${item.attributes.slug}`}</loc>
        <lastmod>${new Date(item.attributes.updatedAt).toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.7</priority>
      </url>
    `
    )
    .join("");
}

async function fetchRoutes() {
  const pagesDir = path.join(process.cwd(), "src/pages");
  const files = fs.readdirSync(pagesDir);
  const extractedRoutes = files
    .filter((staticPage) => {
      return ![
        "_app.js",
        "_document.js",
        "error.js",
        "index.js",
        "api",
        "sitemap.xml.js",
        "career-details",
        "case-study-details",
        "error",
        "solutions",
        "job-details",
      ].includes(staticPage);
    })
    .map((staticPagePath) => {
      return `${staticPagePath.replace(/\.js$/, "").replace(/\.jsx$/, "")}`;
    }); // Remove file extension

  return extractedRoutes;
}
function generateNormalUrls(routes) {
  return routes
    .map((route) => {
      return `
        <url>
          <loc>${`${EXTERNAL_DATA_URL}/${route}`}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>daily</changefreq>
          <priority>1.0</priority>
        </url>`;
    })
    .join("");
}
async function generateStaticSitemap() {
  try {
    const dynamicRoutes = await fetchRoutes();
    // Filter dynamic routes
    const filteredRoutes = dynamicRoutes.filter((route) => {
      return ![
        "_app.js",
        "_document.js",
        "_error.js",
        "index.js",

        "aitoolslistpop",
        "aitoolslist",
        "article",
        "user",
        "payment-successful",
        "featuredyourtool",
        "tool",
        "auth",
        "populartools",
      ].includes(route);
    });

    // Generate sitemap content
    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${generateNormalUrls(filteredRoutes)}
      </urlset>`;

    // Write sitemap to public directory
    const sitemapPath = path.join(__dirname, "../public", "sitemap.xml");
    fs.writeFileSync(sitemapPath, sitemapContent);
  } catch (error) {
  }
}

async function generateBlogSitemap() {
  const blogData = await fetchBlogs();
  // Fetch other data similarly...
  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${generateUrls(blogData, "blog")}
    </urlset>`;

  fs.writeFileSync(
    path.join(__dirname, "../public", "blog-sitemap.xml"),
    sitemapContent
  );
}
async function generateArticleSitemap() {
  const articleData = await fetchArticles();
  // Fetch other data similarly...
  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${generateArricleUrls(articleData, "article")}
    </urlset>`;

  fs.writeFileSync(
    path.join(__dirname, "../public", "article-sitemap.xml"),
    sitemapContent
  );
}
async function generateToolsSitemap() {
  const toolsData = await fetchTools();

  // Fetch other data similarly...
  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${generateToolsUrls(toolsData, "tool")}
    </urlset>`;

  fs.writeFileSync(
    path.join(__dirname, "../public", "tools-sitemap.xml"),
    sitemapContent
  );
}
async function generateGptSitemap() {
  const toolsData = await fetchGpts();

  // Fetch other data similarly...
  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${generateGptsUrls(toolsData, "gpt-store")}
    </urlset>`;

  fs.writeFileSync(
    path.join(__dirname, "../public", "gpts-sitemap.xml"),
    sitemapContent
  );
}

const TOOLS_PER_SITEMAP = 500;

async function generateToolsSitemap() {
  const toolsData = await fetchTools();

  const chunks = chunkArray(toolsData, TOOLS_PER_SITEMAP);

  // Generate individual sitemaps for each chunk
  const sitemapPromises = chunks.map(async (chunk, index) => {
    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${generateToolsUrls(chunk)}
      </urlset>`;

    const filename = `tools-sitemap-${index + 1}.xml`;
    const filepath = path.join(__dirname, "../public", filename);

    await fs.promises.writeFile(filepath, sitemapContent);
    return filename;
  });

  // Wait for all sitemaps to be generated
  const sitemapFiles = await Promise.all(sitemapPromises);

  // Generate the main sitemap with links to individual sitemaps
  const mainSitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${sitemapFiles
        .map(
          (filename) => `
        <sitemap>
          <loc>${`${EXTERNAL_DATA_URL}/${filename}`}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
        </sitemap>
      `
        )
        .join("")}
    </sitemapindex>`;

  const mainSitemapPath = path.join(__dirname, "../public", "tool-sitemap.xml");
  await fs.promises.writeFile(mainSitemapPath, mainSitemapContent);
}

function chunkArray(array, chunkSize) {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

function generateToolsUrls(data) {
  return data
    .map(
      (item) => `
    <url>
      <loc>${`${EXTERNAL_DATA_URL}/tool/${item.title}`}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.7</priority>
    </url>
  `
    )
    .join("");
}

async function fetchTools() {
  let response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}aiTool/get-aiTool?getAllNames=true&isLive=true`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  let res = await response.json();
  return res?.payload?.names?.map(({ slugId }) => ({ title: slugId })) || [];
}
async function generateGPTsSitemap() {
  const gptsData = await fetchGPTs();

  const chunks = chunkArray(gptsData, TOOLS_PER_SITEMAP);

  // Generate individual sitemaps for each chunk
  const sitemapPromises = chunks.map(async (chunk, index) => {
    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${generateGPTsUrls(chunk)}
      </urlset>`;

    const filename = `gpts-sitemap-${index + 1}.xml`;
    const filepath = path.join(__dirname, "../public", filename);

    await fs.promises.writeFile(filepath, sitemapContent);
    return filename;
  });

  // Wait for all sitemaps to be generated
  const sitemapFiles = await Promise.all(sitemapPromises);

  // Generate the main sitemap with links to individual sitemaps
  const mainSitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${sitemapFiles
        .map(
          (filename) => `
        <sitemap>
          <loc>${`${EXTERNAL_DATA_URL}/${filename}`}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
        </sitemap>
      `
        )
        .join("")}
    </sitemapindex>`;

  const mainSitemapPath = path.join(__dirname, "../public", "gpt-sitemap.xml");
  await fs.promises.writeFile(mainSitemapPath, mainSitemapContent);
}

function chunkArray(array, chunkSize) {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

function generateGPTsUrls(data) {
  return data
    .map(
      (item) => `
    <url>
      <loc>${`${EXTERNAL_DATA_URL}/gpt/${item.title}`}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.7</priority>
    </url>
  `
    )
    .join("");
}

async function fetchGPTs() {
  let response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}app/get-app?getAllNames=true&status=approved`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  let res = await response.json();
  return res?.payload?.names?.map(({ slugId }) => ({ title: slugId })) || [];
}

function generateSitemap() {
  generateStaticSitemap();
  generateBlogSitemap();
  generateToolsSitemap();
  generateGPTsSitemap();
}

generateSitemap();
