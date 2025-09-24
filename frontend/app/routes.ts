import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("list", "routes/products.list.tsx"),
    route("create", "routes/products.create.tsx"),
] satisfies RouteConfig;
