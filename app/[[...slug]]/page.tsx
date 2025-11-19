import { getPage } from "@/src/utils/getPage";
import NotFound from "@/app/not-found";
import DotCMSPage from "@/src/views/DotcmsPage";
import { redirect } from "next/navigation";
import { PageProps, GenerateMetadataProps, Metadata } from "@/src/types";

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

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const path = slug?.join("/") || "/";
  const pageContent = await getPage(path);
  const { content } = pageContent || {};

  if (!pageContent) {
    return <NotFound />;
  }

  const navigation = (content as any)?.navigation?.children;

  return <DotCMSPage navigation={navigation} {...pageContent} />;
}
