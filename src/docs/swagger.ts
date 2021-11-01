import components from "./components";
import paths from "./paths";
import servers from "./servers";

// https://www.section.io/engineering-education/documenting-node-js-rest-api-using-swagger/
export default {
  openapi: "3.0.3", // present supported openapi version
  info: {
    title: "Countries Search-Desk",
    description: "A simple countries search-engine",
    version: "1.0.0", // version number
    contact: {
      name: "Emma NWAMAIFE",
      email: "me-and-you@gmail.com",
      url: "https://munagidi.com",
    },
  },
  tags: {
    name: "Country-Search operations",
  },
  servers,
  components,
  paths,
};
