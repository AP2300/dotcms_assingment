import { getPage } from "@/src/utils/getPage";
import NotFound from "./not-found";
import DotCMSPage from "@/src/views/dotcmsPage";

interface HomeProps {
  params: {
    slug?: string[];
  };
}

export default async function Home({ params }: HomeProps) {
  const path = params?.slug?.join("/") || "/";
  const pageContent = await getPage(path);
  const { pageAsset, content } = pageContent || {};
  if (!pageContent) {
    return <NotFound />;
  }

  const navigation = (content as any)?.navigation?.children;

  return <DotCMSPage pageAsset={pageAsset} navigation={navigation} content={content} />;
}
