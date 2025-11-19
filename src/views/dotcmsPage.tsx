"use client";

import { DotCMSLayoutBody, useEditableDotCMSPage } from "@dotcms/react";
import { DotCMSPageRendererMode } from "@dotcms/types";
import { contentTypesComponents } from "@/src/components/content-types";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";

interface DotCMSPageProps {
  pageAsset: any;
  navigation?: any;
  content?: any;
  graphql: any;
}

const DotCMSPage = (pageContent: DotCMSPageProps) => {
  const { navigation } = pageContent;
  const { content, pageAsset } = useEditableDotCMSPage(pageContent);

  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      {pageAsset?.layout.header && <Navbar navItems={navigation} />}
      <main 
        id="main-content" 
        className="flex-1 flex flex-col gap-12 w-full container px-4 xl:px-0"
        role="main"
      >
        {pageAsset && (
          <DotCMSLayoutBody
            page={pageAsset}
            components={contentTypesComponents}
            mode={
              (process.env.NEXT_PUBLIC_DOTCMS_MODE ??
                "production") as DotCMSPageRendererMode
            }
          />
        )}
      </main>
      {pageAsset?.layout.footer && (
        <Footer navItems={navigation} {...(typeof content === "object" && content !== null ? content : {})} />
      )}
    </div>
  );
};

export default DotCMSPage;
