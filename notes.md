# Notes

## Template

## LinkedIn

### Indonesian

Judul Artikel:
[Judul Artikel Anda]

Intro:
Halo, Profesional LinkedIn!

Saya dengan senang hati ingin berbagi artikel terbaru saya: "[Judul Artikel Anda]". Dalam artikel ini, saya membahas [Deskripsi Singkat tentang Isi Artikel].

Tujuan:
Artikel ini ditujukan untuk [Siapa Target Audiens], dengan harapan dapat [Apa yang Anda Ingin Pembaca Dapatkan dari Artikel Ini].

Ajakan Bertindak:
Saya sangat menghargai feedback dan pandangan Anda! Silakan baca dan beri tahu saya pikiran Anda di kolom komentar.

👉 Baca artikel lengkapnya di sini: [URL Artikel]

Terima kasih atas dukungan Anda!

### English

Judul Artikel:
[Your Article Title]

Intro:
Hello, LinkedIn Professionals!

I'm excited to share my latest article with you: "[Your Article Title]". In this piece, I explore [Brief Description of the Article Content].

Objective:
This article is intended for [Who the Target Audience Is], aiming to [What You Want the Reader to Take Away from the Article].

Call to Action:
I would greatly appreciate your feedback and thoughts! Please take a moment to read and let me know your insights in the comments section.

👉 Read the full article here: [Article URL]

Thank you for your support!

## Twitter

### Indonesian

🚀 Just dropped: "[Judul Artikel Anda]"!

📝 Dalam artikel ini, saya jelaskan tentang [Deskripsi Singkat tentang Isi Artikel]. Cocok untuk [Siapa Target Audiens] yang ingin [Apa yang Anda Ingin Pembaca Dapatkan dari Artikel Ini].

👀 Baca & beri tahu saya pendapat Anda! #TagRelevan #TopikRelevan

🔗 [URL Artikel]

👉 RT & favorit jika Anda menemukan ini berguna!

### English

🚀 Just dropped: "[Your Article Title]"!

📝 In this article, I delve into [Brief Description of the Article Content]. Perfect for [Who the Target Audience Is] looking to [What You Want the Reader to Take Away from the Article].

👀 Read & let me know your thoughts! #RelevantTag #RelevantTopic

🔗 [Article URL]

👉 RT & favorite if you find this useful!

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

## Excalidraw file cause: vercel error no such file or directory, open '/var/task/

> This error only happens on vercel

Issue: <https://github.com/vercel/next.js/issues/52711>
Solution: <https://github.com/vercel/next.js/issues/52711#issuecomment-1855735947>
