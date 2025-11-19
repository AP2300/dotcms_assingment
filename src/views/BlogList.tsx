"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDebounce } from "@/src/hooks/useDebounce";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import BlogCard from "@/src/components/blog-components/BlogCard";
import { LoadingState } from "@/src/components/blog-components/LoadingState";
import { EmptyState } from "@/src/components/blog-components/ErrorState";
import SearchBar from "../components/blog-components/SearchBar";

interface DotCMSPageProps {
  pageAsset: any;
  navigation?: any;
  content?: any;
  graphql: any;
}

interface Blog {
  identifier: string;
  title: string;
  teaser?: string;
  description?: string;
  image?: string;
  inode?: string;
  urlMap?: string;
  modDate?: string;
  author?: Array<{ firstName: string; lastName: string; inode: string }>;
}

const BlogList = (pageResponse: DotCMSPageProps) => {
  const { navigation, content } = pageResponse;
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const allBlogs = content?.blogs || [];

  // Filter blogs based on search query
  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      if (!debouncedSearchQuery.trim()) {
        setFilteredBlogs(allBlogs);
      } else {
        const filtered = allBlogs.filter((blog: Blog) =>
          blog.title?.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
        );
        setFilteredBlogs(filtered);
      }
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [debouncedSearchQuery, allBlogs]);

  console.log("Filtered Blogs:", filteredBlogs);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar navItems={navigation} />

      <main className="flex-1 container mx-auto px-4 pb-24 mt-36 md:pt-44">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col gap-4 mb-12 text-center"
        >
          <h1 className="text-4xl sm:text-5xl font-bold">
            Travel Blog
          </h1>
          <p className="text-gray-400 max-w-3xl mx-auto text-sm sm:text-lg">
            Get inspired to experience the world. Our writers will give you
            their first-hand stories and recommendations that will inspire,
            excite you, and help you make the best decisions for planning your
            next adventure.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-12"
        >
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </motion.div>

        {/* Results Count */}
        {!isLoading && filteredBlogs.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 text-sm text-gray-400"
          >
            Showing {filteredBlogs.length} of {allBlogs.length} blog{allBlogs.length !== 1 ? "s" : ""}
          </motion.div>
        )}

        {/* Loading State */}
        {isLoading && <LoadingState count={6} type="grid" />}

        {/* Blog Grid */}
        {!isLoading && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredBlogs.map((blog: Blog) => (
                  <BlogCard
                    key={blog.identifier}
                    title={blog.title}
                    teaser={blog.teaser}
                    description={blog.description}
                    image={blog.image}
                    inode={blog.inode}
                    urlMap={blog.urlMap}
                    postingDate={blog.modDate}
                    author={blog.author?.[0] || { firstName: "", lastName: "", inode: "" }}
                  />
                ))}
              </AnimatePresence>
            </div>
          </>
        )}

        {/* No Results */}
        {!isLoading && filteredBlogs.length === 0 && (
          <EmptyState
            title="No blogs found"
            description="No blogs found matching your search criteria. Try adjusting your search."
            icon="sad"
            showClearButton={!!searchQuery}
            onClear={() => setSearchQuery("")}
          />
        )}
      </main>

      <Footer navItems={navigation} {...content} />
    </div>
  );
}

export default BlogList;




