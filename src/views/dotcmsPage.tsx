"use client";

import { DotCMSLayoutBody } from "@dotcms/react";
import { DotCMSPageRendererMode } from "@dotcms/types";
import { contentTypesComponents } from "@/src/components/content-types";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";

interface DotCMSPageProps {
  pageAsset: any;
  navigation?: any;
  content?: any;
}

const DotCMSPage = ({ pageAsset, navigation, content }: DotCMSPageProps) => {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      {pageAsset?.layout.header && <Navbar navItems={navigation} />}
      <main className="flex-1 w-full container px-4 sm:px-0">
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
      {pageAsset?.layout.footer && <Footer navItems={navigation} {...content} />}
    </div>
  );
};

export default DotCMSPage;
