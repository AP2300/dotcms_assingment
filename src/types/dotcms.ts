// DotCMS related types
export interface DotCMSPageProps {
  pageAsset: any;
  navigation?: any;
  content?: any;
  graphql?: any;
}

export interface PageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

export interface GenerateMetadataProps {
  params: Promise<{
    slug?: string[];
  }>;
}

export interface Metadata {
  title?: string;
  description?: string;
  openGraph?: {
    title?: string;
    description?: string;
    images?: string[];
  };
}
