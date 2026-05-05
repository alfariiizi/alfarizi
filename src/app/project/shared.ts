import {
  getHighlightedProjects,
  getNonHighlightedProjects,
} from "@/lib/content-utils.js";
import { projects } from ".velite/index";

export const highlightedProjects = getHighlightedProjects(projects);
export const nonHighlightedProjects = getNonHighlightedProjects(projects);
export const sortedProjects = [...highlightedProjects, ...nonHighlightedProjects];
