import { getPage } from "@/src/utils/getPage";
import NotFound from "@/app/not-found";
import BlogList from "@/src/views/BlogList";

interface GenerateMetadataProps {
  params: Promise<{
    slug?: string[];
  }>;
}

interface Metadata {
  title: string;
}

export async function generateMetadata(
  props: GenerateMetadataProps
): Promise<Metadata> {
  const params = await props.params;
  try {
    const path = params?.slug?.join("/") || "/";
    const pageContent = await getPage(path);
    const page = pageContent?.pageAsset?.page;
    const title = page?.friendlyName || page?.title || "Default Title";

    return {
      title,
    };
  } catch (e) {
    return {
      title: "not found",
    };
  }
}

export default async function Page() {

  const pageContent = await getPage('/blog');
  const { content } = pageContent || {};

  if (!pageContent) {
    return <NotFound />;
  }

  const navigation = (content as any)?.navigation?.children;

  return <BlogList navigation={navigation} {...pageContent} />;
}
