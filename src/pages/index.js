import HomePage from "@/module/home";
export const runtime = "experimental-edge";
export default function Home({ seoData }) {
  return (
    <>
      <HomePage seoData={seoData} />
    </>
  );
}
