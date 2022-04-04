import axios from "axios";

const baseUrl ="https://api.publicapis.org/entries";
export const getProducts=()=> axios.get(baseUrl)