import Link from "next/link";
import Router from "next/router";

export default Link

export const redirect = (href = '') => {
    return Router.push(`/${href}`)
}

export const getBasePath = () => {
    return '/'
}