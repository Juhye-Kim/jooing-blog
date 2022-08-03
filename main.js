import blog, { ga, redirects } from "./src/blog.tsx";

blog({
  title: "Blog",
  author: "jooing",
  avatar: "./ry.jpg",
  avatarClass: "full",
  description: '🍩',
  links: [
    { title: "GitHub", url: "https://github.com/juhye-kim" },
  ],
  background: "#F4F4F4",
  coverTextColor: "#000",
  middlewares: [
    ga("UA-91675022-1"),
    redirects({
      "iocp-links.html": "iocp_links",
      "rant.html": "rant",
    }),
  ],
});
