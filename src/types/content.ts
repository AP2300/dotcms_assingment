// Content types for DotCMS content models

export interface Author {
  firstName: string;
  lastName: string;
  inode: string;
}

export interface Blog {
  identifier: string;
  title: string;
  teaser?: string;
  description?: string;
  image?: string;
  inode?: string;
  urlMap?: string;
  postingDate?: string;
  modDate?: string; // Alternative date field
  author?: Author | Author[]; // Support both single and array
}

export interface Activity {
  title: string;
  description?: string;
  shortDescription?: string;
  image?: string;
  inode?: string;
  urlMap?: string;
}

export interface Product {
  title: string;
  description?: string;
  image?: string;
  inode?: string;
  retailPrice?: number;
  urlMap?: string;
}

export interface Destination {
  identifier: string;
  title: string;
  description?: string;
  image?: string;
  inode?: string;
  urlMap?: string;
  modDate?: string;
}

export interface YouTube {
  id?: string;
  title?: string;
  author?: string;
  length?: string;
  thumbnailLarge?: string;
}

export interface Hero {
  title: string;
  caption?: string;
  description?: string;
  image: string;
  inode?: string;
  link?: string;
  buttonText?: string;
}

export interface Recommendation {
  title: string;
  subtitle?: string;
  image?: string;
  inode?: string;
  urlMap?: string;
}
