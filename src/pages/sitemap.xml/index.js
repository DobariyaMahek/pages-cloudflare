import { getServerSideSitemap } from "next-sitemap";
const { request, gql } = require("graphql-request");
const endpoint = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const EXTERNAL_DATA_URL = process.env.NEXT_PUBLIC_SITEMAP_URL;

// Fetch all stattic paths
const GET_SEO_DATA = gql`
  query StaticMetatags($pagination: PaginationArg) {
    staticMetatags(pagination: $pagination) {
      data {
        attributes {
          slug
          metaTitle
          createdAt
          updatedAt
          publishedAt
          show_in_sitemap
        }
      }
    }
  }
`;

async function fetchStaticPages() {
  const variables = {
    pagination: {
      limit: 2000,
    },
  };

  const data = await request(endpoint, GET_SEO_DATA, variables);
  return data?.staticMetatags?.data;
}

function generateUrls(data, ctx, url = "") {
  const dat = data.map((item) => ({
    loc: `${EXTERNAL_DATA_URL}/${item.attributes.slug}`,
    lastmod: new Date(item.attributes.updatedAt).toISOString(),
    changefreq: "daily",
    priority:
      item.attributes.slug === "terms-condition" ||
      item.attributes.slug === "privacy-policy"
        ? 0.7
        : 1,
  }));

  return dat;
}

async function generateStaticSitemap(ctx) {
  const staticData = await fetchStaticPages();
  const filteredPath = staticData.filter((route) => {
    return !["home", "error", "bookmark", "gpt-bookmark"].includes(
      route?.attributes?.slug
    );
  });
  const siteMapPath = [
    {
      attributes: {
        slug: "sitemap/category.xml",
        updatedAt: new Date().toISOString(),
        show_in_sitemap: true,
      },
    },
    {
      attributes: {
        slug: "sitemap/gpt-category.xml",
        updatedAt: new Date().toISOString(),
        show_in_sitemap: true,
      },
    },
    {
      attributes: {
        slug: "sitemap/blog.xml",
        updatedAt: new Date().toISOString(),
        show_in_sitemap: true,
      },
    },
    {
      attributes: {
        slug: "sitemap/tool.xml",
        updatedAt: new Date().toISOString(),
        show_in_sitemap: true,
      },
    },
    {
      attributes: {
        slug: "sitemap/gpt.xml",
        updatedAt: new Date().toISOString(),
        show_in_sitemap: true,
      },
    },
  ];

  const finalRoutes = [
    {
      attributes: {
        slug: "",
        updatedAt: new Date().toISOString(),
        show_in_sitemap: true,
      },
    },
    ...filteredPath,
    ...siteMapPath,
  ];

  return getServerSideSitemap(ctx, generateUrls(finalRoutes, ctx));
}

export async function getServerSideProps(ctx) {
  return await generateStaticSitemap(ctx);
}

export default function Site() {}
