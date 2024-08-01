import { getServerSideSitemap } from "next-sitemap";
const { request, gql } = require("graphql-request");
const endpoint = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const EXTERNAL_DATA_URL = process.env.NEXT_PUBLIC_SITEMAP_URL;

const GET_ALL_BLOGS = gql`
  query Blogs($pagination: PaginationArg, $filters: BlogFiltersInput) {
    blogs(pagination: $pagination, filters: $filters) {
      data {
        attributes {
          title
          slug
          createdAt
          updatedAt
          publishedAt
        }
      }
    }
  }
`;

async function fetchBlogs() {
  const variables = {
    pagination: {
      limit: 3000,
    },
  };

  const data = await request(endpoint, GET_ALL_BLOGS, variables);
  return data?.blogs?.data;
}

async function fetchGPTs(page = 1, limit = 500) {
  let response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}app/get-app?getAllNames=true&status=approved&page=${page}&limit=${limit}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  let res = await response.json();
  return res?.payload?.names;
}

async function fetchGPTCounts(page = 1, limit = 500) {
  let response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}app/get-app?getAllNames=true&status=approved&page=1&limit=1`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  let res = await response.json();
  return res?.payload?.counts;
}
async function fetchTools(page = 1, limit = 500) {
  let response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}aiTool/get-aiTool?getAllNames=true&isLive=true&status=approved&page=${page}&limit=${limit}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  let res = await response.json();
  return (
    res?.payload?.names?.map(({ slugId, updatedAt }) => ({
      title: slugId,
      updatedAt: updatedAt,
    })) || []
  );
}
async function fetchToolsCounts(page = 1, limit = 500) {
  let response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}aiTool/get-aiTool?getAllNames=true&isLive=true&status=approved&page=1&limit=1`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  let res = await response.json();
  return res?.payload?.counts;
}
async function fetchAllCategory() {
  let response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}aiToolCategory/get-category?status=active&limit=1000`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  let res = await response.json();
  return res?.payload?.aiToolCategory || [];
}

async function fetchAllGPTCategory() {
  let response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}mainCategory/get?status=active`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  let res = await response.json();
  return res?.payload?.categorys || [];
}

function generateUrlsTools(data, url = "") {
  return data
    ?.map(
      (item) => `
      <url>
        <loc>${`${EXTERNAL_DATA_URL}/tools/${item}`}</loc>
        <lastmod>${new Date()?.toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.7</priority>
      </url>
    `
    )
    .join("");
}

function generateUrlsBlogs(data, url = "") {
  return data
    ?.map(
      (item) => `
      <url>
        <loc>${`${EXTERNAL_DATA_URL}/blogs/${item}`}</loc>
        <lastmod>${new Date()?.toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.7</priority>
      </url>
    `
    )
    .join("");
}

async function generateToolsSitemap(ctx) {
  const toolsData = await fetchToolsCounts();
  const chunks = chunkArray11(toolsData, TOOLS_PER_SITEMAP);

  const sitemapPromises = chunks.map(async (chunk, index) => {
    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${generateUrlsTools(chunk)}
    </urlset>`;

    const filename = `tools-${index + 1}.xml`;
    return filename;
  });

  const sitemapFiles = await Promise.all(sitemapPromises);
  return getServerSideSitemap(ctx, generateUrls(sitemapFiles));
}

async function generateToolsChunksSitemap(ctx) {
  const digitMatch = ctx.req.url.match(/tools-(\d+)\.xml/);
  const toolsData = await fetchTools(digitMatch[1], 500);
  return getServerSideSitemap(ctx, generateToolsChunksUrls(toolsData));
}

async function generateBlogSitemap(ctx) {
  const blogData = await fetchBlogs();

  const chunks = chunkArray(blogData, TOOLS_PER_SITEMAP);

  // Fetch other data similarly...
  const sitemapPromises = chunks.map(async (chunk, index) => {
    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${generateUrlsBlogs(chunk)}
    </urlset>`;

    const filename = `blogs-${index + 1}.xml`;
    return filename;
  });

  const sitemapFiles = await Promise.all(sitemapPromises);

  return getServerSideSitemap(ctx, generateUrls(sitemapFiles));
}

async function generateBlogsChunksSitemap(ctx) {
  const blogData = await fetchBlogs();
  const digit = ctx.req.url.match(/blogs-(\d+)\.xml/)[1];

  const chunks = chunkArray(blogData, TOOLS_PER_SITEMAP);

  return getServerSideSitemap(ctx, generateBlogsChunksUrls(chunks[digit - 1]));
}

async function generateGPTSitemap(ctx) {
  const gptsData = await fetchGPTCounts();

  const chunks = chunkArray11(gptsData, TOOLS_PER_SITEMAP);

  // Fetch other data similarly...
  const sitemapPromises = chunks.map(async (chunk, index) => {
    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${generateUrlsBlogs(chunk)}
    </urlset>`;

    const filename = `gpts-${index + 1}.xml`;
    return filename;
  });

  const sitemapFiles = await Promise.all(sitemapPromises);

  return getServerSideSitemap(ctx, generateUrls(sitemapFiles));
}

async function generateGPTsChunksSitemap(ctx) {
  const digitMatch = ctx.req.url.match(/gpts-(\d+)\.xml/);
  const gptsData = await fetchGPTs(digitMatch[1], 500);

  return getServerSideSitemap(ctx, generateGPTsChunksUrls(gptsData));
}

const TOOLS_PER_SITEMAP = 500;

function generateUrls(data, url = "") {
  const dat = data?.map((item) => ({
    loc: `${EXTERNAL_DATA_URL}/sitemap/${item}`,
    lastmod: new Date().toISOString(),
  }));

  return dat;
}

function generateCategoryUrls(data, url = "") {
  const dat = data?.map((item) => ({
    loc: `${EXTERNAL_DATA_URL}/${url}/${item?.title}`,
    lastmod: new Date(item?.updatedAt).toISOString(),
    changefreq: "daily",
    priority: 1,
  }));
  return dat;
}

function generateToolsChunksUrls(data, url = "") {
  const dat = data?.map((item) => ({
    loc: `${EXTERNAL_DATA_URL}/tool/${item?.title}`,
    lastmod: new Date(item?.updatedAt).toISOString(),
    changefreq: "daily",
    priority: 1,
  }));
  return dat;
}

function generateBlogsChunksUrls(data, url = "") {
  const dat = data?.map((item) => ({
    loc: `${EXTERNAL_DATA_URL}/blog/${item?.attributes?.slug}`,
    lastmod: new Date(item?.attributes?.updatedAt).toISOString(),
    changefreq: "daily",
    priority: 1,
  }));

  return dat;
}

function generateGPTsChunksUrls(data, url = "") {
  const dat = data?.map((item) => ({
    loc: `${EXTERNAL_DATA_URL}/gpt/${item?.slugId}`,
    lastmod: new Date(item?.updatedAt).toISOString(),
    changefreq: "daily",
    priority: 1,
  }));

  return dat;
}

async function generateCategorySitemap(ctx) {
  const categoryData = await fetchAllCategory();
  const finalCategoryPath = categoryData
    .map((obj) =>
      obj.aiToolSubCategory.map((sub) => ({
        title: sub.slugId,
        updatedAt: sub.updatedAt,
      }))
    )
    .flat();
  return getServerSideSitemap(
    ctx,
    generateCategoryUrls(finalCategoryPath, "category")
  );
}

async function generateGPTCatSitemap(ctx) {
  const GPTCategoryData = await fetchAllGPTCategory();
  const finalCategoryPath = GPTCategoryData.map((obj) =>
    obj.category.map((sub) => ({ title: sub.slugId, updatedAt: sub.updatedAt }))
  ).flat();
  return getServerSideSitemap(
    ctx,
    generateCategoryUrls(finalCategoryPath, "gpt-category")
  );
}

function chunkArray(array, chunkSize) {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

function chunkArray11(array, chunkSize) {
  const chunks = [];
  for (let i = 0; i < array; i += chunkSize) {
    const end = i + chunkSize > array ? array : i + chunkSize;
    chunks.push(Array.from({ length: end - i }, (_, k) => k + i));
  }
  return chunks;
}

export async function getServerSideProps(ctx) {
  const toolsData = await fetchToolsCounts();
  const blogData = await fetchBlogs();
  const gptsData = await fetchGPTCounts();

  // const toolsChunks = chunkArray(toolsData, TOOLS_PER_SITEMAP);
  const blogsChunks = chunkArray(blogData, TOOLS_PER_SITEMAP);

  const result = Math.ceil(gptsData / 500);
  const toolResult = Math.ceil(toolsData / 500);
  switch (true) {
    case ctx.req.url.includes("tool.xml"):
      return await generateToolsSitemap(ctx);

    case ctx.req.url.includes("tools-") &&
      ctx.req.url.match(/tools-(\d+)\.xml/)[1] <= toolResult:
      return await generateToolsChunksSitemap(ctx);

    case ctx.req.url.includes("blog.xml"):
      return await generateBlogSitemap(ctx);

    case ctx.req.url.includes("blogs-") &&
      ctx.req.url.match(/blogs-(\d+)\.xml/)[1] <= blogsChunks?.length:
      return await generateBlogsChunksSitemap(ctx);

    case ctx.req.url.includes("gpt.xml"):
      return await generateGPTSitemap(ctx);

    case ctx.req.url.includes("gpts-") &&
      ctx.req.url.match(/gpts-(\d+)\.xml/)[1] <= result:
      return await generateGPTsChunksSitemap(ctx);

    case ctx.req.url.startsWith("/sitemap/category.xml"):
      return await generateCategorySitemap(ctx);

    case ctx.req.url.startsWith("/sitemap/gpt-category.xml"):
      return await generateGPTCatSitemap(ctx);

    default:
      ctx.res.setHeader("Location", "/");
      ctx.res.statusCode = 302;
      ctx.res.end();
      return { props: {} };
  }
}

export default function Site() {}
