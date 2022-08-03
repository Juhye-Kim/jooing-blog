import blog, { ga, redirects } from "./src/blog.tsx";

blog({
  title: "Blog",
  author: "jooing",
  avatar: "./ry.jpg",
  avatarClass: "full",
  links: [
    { title: "GitHub", url: "https://github.com/juhye-kim" },
  ],
  background: "#fff",
  middlewares: [
    ga("UA-91675022-1"),
    redirects({
      "iocp-links.html": "iocp_links",
      "rant.html": "rant",
    }),
  ],
});
