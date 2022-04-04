import NextLink from "next/link";
import { connect } from "react-redux";
import store from "@redux/store";
import Router from "next/router";
// export default NextLink;

const Link = ({ store, href = '', children }) => {
    if (store) {
        const url = `/${store.store_name.replaceAll(" ", '-').trim()}/${store.store_id}`
        return (
            <NextLink href={`${url}${href}`}>{children}</NextLink>
        )
    }
    return (
        <NextLink href={`${href}`}>{children}</NextLink>
    )
}
const mapStateToProps = state => ({
    store: state.store.info
})
export default connect(mapStateToProps)(Link);

// 
export const redirect = (href = '') => {
    const state = store.getState()
    const info = state.store.info
    if (info) {
        return Router.push(`/${info.store_name.replaceAll(" ", '-').trim()}/${info.store_id}${href}`)
    }
    return Router.push
}

export const getBasePath = () => {
    const state = store.getState()
    const info = state.store.info
    if (info) {
        return `/${info.store_name.replaceAll(" ", '-').trim()}/${info.store_id}`
    }
    return '/'
}