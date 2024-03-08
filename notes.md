# Notes

## Source

- Copy code block button:
  - <https://claritydev.net/blog/copy-to-clipboard-button-nextjs-mdx-rehype>
  - <https://www.tybarho.com/articles/adding-a-copy-button-mdx-code-snippets>
  - <https://github.com/spheronFdn/portfolio-template/blob/main/contentlayer.config.ts>
  - <https://twitter.com/shadcn/status/1609999434766745600/photo/1>

## Decision

### Not using static params

I decide to not using generate static params. It's because my priority of **optimizing image**. Optimizing image need 2 package:

- probe-image-size: to get image size for width and height props. It's necessary to prevent layout shifting.
- plaiceholder: to get base64 data blur for placeholder.

Both package need to know where the image is located. So, all external image should be work, but all internal/local image will not work. But then I realized that all assets that placed inside of `public` folder will available at root directory. Ex: `/images/logo.png` will available at `http://localhost:3000/images/logo.png`. Because of `http://localhost:3000` have to exist, the nextjs server must be at run. Either with `yarn dev` or `yarn start`.

So, using static params will cause an error on build (`yarn build`), because static params will generate static page. And when I build it, the `http://localhost:3000` is not available.

The solution is:

1. Using dynamic page
2. Using fs to locate the assets

For now, I choose first solution. The drawback is I cannot using static params. But it get the job done.

> Maybe in the future I will choose second solution in order to use static params.
