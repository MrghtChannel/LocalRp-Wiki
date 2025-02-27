const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  remarkPlugins: [
    require('remark-directive'),
    require('remark-frontmatter'),
    require('remark-gfm'),
    require('remark-math'),
  ],
  rehypePlugins: [require('rehype-raw')],
});

/** @type {import('next').NextConfig} */
const nextConfig = withMDX({
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
});

module.exports = nextConfig;
