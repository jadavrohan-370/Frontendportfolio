import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../layouts/HomeView.vue";
import AboutView from "../layouts/AboutView.vue";
import ProjectsView from "../layouts/ProjectsView.vue";
import ContactView from "../layouts/ContactView.vue";

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0, behavior: "smooth" }),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
    },
    {
      path: "/projects",
      name: "projects",
      component: ProjectsView,
    },
    {
      path: "/contact",
      name: "contact",
      component: ContactView,
    },
  ],
});

export default router;
