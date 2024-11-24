import simpleRest from "@refinedev/simple-rest";
import { API_URL, client } from "./httpClient";

export const dataProvider = simpleRest(API_URL, client);
