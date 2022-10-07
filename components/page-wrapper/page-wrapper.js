import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import Head from "next/head";
import Auth from "@components/auth/auth";
import Loader from "@components/loading/loader";
import NavBar from "@components/navbar/navbar";
import Footer from '@components/Footer'
import Popup from "@components/popup/popup";
import { useMediaQuery } from 'react-responsive'
import absoluteUrl from 'next-absolute-url'

import {
    getShopInfoStart, getShopSeoStart, getShopSettingsStart, getSocialProfileStart, getShopDisplaySettingsStart, getPageCountStart, getBannerStart,
    getCategoryStart,
    getSubCategoryStart,
    getShopWidgets,
    getStorePolicies,
} from "@redux/shop/shop-action";
import { createSeasionId } from "services/pickytoClient";
import { getWalletBalance } from "@redux/user/user-action";


function hexToRGB(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }
}

const verifier = ({ widgets, getShopWidgets, user, children, isLogin, store, getShopInfo, getShopSeo, getShopSettings, getSocialProfile, getShopDisplaySettings, getPageCount, getCategories, getSubCategories, getBanner, getWalletBalance, seo,storeInfo,getStorePolicies }) => {
    const router = useRouter()
    const exceptionRouteinMobile = ['/account/profile']
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 900px)' })
    const { displaySettings } = store
    // console.log("seo",seo);
    useEffect(() => {
        const { origin } = absoluteUrl()
        var myDynamicManifest = {
            "name": `${store?.info?.store_name}`,
            "short_name": `${store?.info?.store_name}`,
            "description": `${store?.info?.store_name}`,
            "display": "standalone",
            "scope": `${origin}`,
            "start_url": `${origin}`,
            "background_color": "#ffffff",
            "theme_color": "#ffffff",
            "icons": [{
                "src": `${store?.info?.logo_img_url}`,
                "sizes": "512x512",
                "type": "image/png"
            }]
        }
        const stringManifest = JSON.stringify(myDynamicManifest);
        const blob = new Blob([stringManifest], { type: 'application/json' });
        const manifestURL = URL.createObjectURL(blob);
        document.querySelector('#my-manifest-placeholder').setAttribute('href', manifestURL);

    }, [store.info])

    // calling wallet api
    useEffect(() => {
        if (user != null) {
            getWalletBalance({ customerId: user.customer_id, storeId: store?.info?.store_id })
        }
    }, [user, store.info])

    useEffect(() => {
        var seassion_id
        const storeId = process.env.NEXT_PUBLIC_DEFAULT_STORE_ID
        if (!store.isReadyToGo && storeId) {
            if (!user?.customer_id) {
                seassion_id = createSeasionId()
            }
            else {
                seassion_id = user.customer_id
            }
            getBanner(storeId)
            getShopSeo(storeId);
            getShopInfo({ storeId, seassion_id });
            getPageCount(storeId)
            getShopSettings(storeId);
            getSocialProfile(storeId);
            getShopDisplaySettings(storeId)
            getCategories(storeId)
            getShopWidgets(storeId)
            getStorePolicies(storeId)
        }
    }, [router])

    useEffect(() => { // Setting store colors
        if (typeof window !== 'undefined') {
            let themeColors = {
                // color: displaySettings.primary_color || '#fff',
                color: '#fff',
                bgColor: '#F58634',
                bgColor50: hexToRGB('0.13'),
                fillColor: '#d85a5a',
                // navColor: 'transparent',
                footerColor: '#242424',
            }
            if (displaySettings) {
                themeColors = {
                    // color: displaySettings.primary_color || '#fff',
                    color: '#fff',
                    bgColor: displaySettings.secondary_color.includes('#') ? displaySettings.secondary_color : '#' + displaySettings.secondary_color || '#F58634', // #48887B
                    bgColor50: hexToRGB(displaySettings.primary_color, '0.13') || 'rgba(246, 75, 93, 0.13)',
                    fillColor: displaySettings.primary_color.includes('#') ? displaySettings.primary_color : '#' + displaySettings.primary_color || '#d85a5a',
                    navColor: displaySettings.primary_color.includes('#') ? displaySettings.primary_color : '#' + displaySettings.primary_color || '#F9F6ED',
                    // navColor: displaySettings.navbar_color || 'transparent',
                    footerColor: displaySettings.primary_color.includes('#') ? displaySettings.primary_color : '#' + displaySettings.primary_color || '#203934',
                }

            }
            const head = document.getElementById('style')
            const style = (` <style>
            .radio-custom input[type="radio"]:checked+label {
                background-color: white;
                border-color:${themeColors.bgColor};
                color:${themeColors.bgColor};
              }
            .ant-tabs-nav .ant-tabs-tab-active {
                border: 3px solid ${themeColors.bgColor} !important;
                border-radius:8px !important;
                background-color: white !important;
              }
                    .btn-border{
                    border-color: ${themeColors.bgColor};
                    }
                    .nav-border{
                    border-color: ${themeColors.navColor};
                    }
                    .btn-bg {
                    background-color: ${themeColors.bgColor};
                    }
                    .btn-bg-revese {
                    background-color: ${themeColors.color};
                    }
                    .btn-bg-light {
                    background-color: ${themeColors.bgColor50};
                    }
                    .btn-color {
                    color: ${themeColors.color};
                    }
                    .btn-color-revers {
                    color: ${themeColors.bgColor};
                    }
                    .input-focus:focus {
                    border-color: ${themeColors.bgColor};
                    }
                    .btn-hover-color {
                    transition: 0.1s ease-in-out;
                    }
                    .btn-hover-color:hover {
                    color: ${themeColors.bgColor};
                    }
                    .btn-hover-revers:hover {
                    color: ${themeColors.color};
                    background-color:${themeColors.bgColor}
                    }
                    .btn-nav-color {
                    color: $black-color-75;
                    fill: $black-color-75;
                    }
                    .btn-nav-color-active {
                    color: ${themeColors.bgColor};
                    fill: ${themeColors.bgColor};
                    }
                    .nav-bg{
                        background-color: ${themeColors.navColor}!important;
                    }
                    .nav-items-color{
                        color: ${displaySettings?.navbar_color ? displaySettings?.navbar_color : '#fff'}!important;
                    }
                    .btn-nav-color-active{
                        color: ${themeColors.bgColor};
                    }
                    .footer-bg{
                        background-color: ${themeColors.footerColor}
                    }
                    .empty-cart-svg path {
                        fill : ${themeColors.fillColor}
                    }
                    .cat-active{
                        background: transparent linear-gradient(90deg, #d85a5a00 0%, ${hexToRGB(themeColors.bgColor, '0.25')} 100%) 0% 0% no-repeat padding-box;
                        border-right: 4px solid ${themeColors.bgColor};
                    }
                    .cat-active{
                    }
                    .border-static {
                        border-color : ${themeColors.bgColor};
                    }
                    .border-color:hover {
                        border-color : ${themeColors.bgColor}
                    }
                    input[type=radio]:checked:after {
                        background-color : ${themeColors.bgColor};
                        box-shadow : 0px 0px 0px 2px ${themeColors.bgColor};
                    }
                    input[type=radio]:checked:after {
                        background-color : ${themeColors.bgColor};
                        box-shadow : 0px 0px 0px 2px ${themeColors.bgColor};
                    }
                  }
                </style>`)
            head.innerHTML = style
        }
    }, [displaySettings])
    if (!store.isReadyToGo) {
        return <Loader />
    }



    console.log("seo store", seo,store)
    return (
        <>
            <Head>
                {widgets != null ?
                    widgets?.GOOGLE_MERCHANT_CENTER ?
                        widgets?.GOOGLE_MERCHANT_CENTER?.record_status == "ACTIVE" ?
                            <meta name="google-site-verification" content={widgets != null && widgets?.GOOGLE_MERCHANT_CENTER?.integration_attributes?.verificationCode} />
                            : ""
                        : ""
                    : ""
                }
                {/* <title>{store ? store.info.store_name : 'GoPlinto'}</title> */}
                <title>{seo ? seo.seo_title : storeInfo ? storeInfo.store_name : 'GoPlinto'}</title>
                <link rel="shortcut icon" href={displaySettings ? displaySettings?.favicon_img_url ? displaySettings.favicon_img_url : store ? store?.info ? store.info.logo_img_url ? store.info.logo_img_url : '/img/goplinto_favicon.ico' : '/img/goplinto_favicon.ico' : '/img/goplinto_favicon.ico' : '/img/goplinto_favicon.ico'} type="image/x-icon" />
                {/* <meta name="description" content={store ? store.info.store_desc : 'GoPlinto'} /> */}
                <meta name="description" content={seo ? seo?.seo_desc : storeInfo ? storeInfo.store_desc : 'GoPlinto'} />

                {/* <meta property="og:title" content={seo?seo.seo_title:store ? store?.info?.store_name : 'GoPlinto'}></meta>
                <meta property="og:description" content={seo?seo?.seo_desc: store ? store.info.store_desc : 'GoPlinto'}></meta>
                <meta property="og:image" content={store ? store.info.logo_img_url : 'https://www.goplinto.com/assets/images/goplinto-logo-white-480x97.png'}></meta>
                <meta property="og:image:secure_url" content={store ? store.info.logo_img_url : 'https://www.goplinto.com/assets/images/goplinto-logo-white-480x97.png'}></meta> */}


            </Head>
            <NavBar />
            <main>{children}</main>
            <Footer />
            {
                isLogin && <Auth />
            }
            <Popup />
        </>
    )
}

const mapStateToProps = state => ({
    store: state.store,
    storeInfo: state.store.info,
    seo: state.store.seo,
    // displaySettings: state.store.displaySettings,
    isReadyToGo: state.store.isReadyToGo,
    isLogin: !state.user.currentUser,
    user: state.user.currentUser,
    widgets: state.store.widgets,
})
const mapDispatchToProps = dispatch => ({
    getBanner: (shopId) => dispatch(getBannerStart(shopId)),
    getShopSeo: (shopId) => dispatch(getShopSeoStart(shopId)),
    getShopInfo: (shopId) => dispatch(getShopInfoStart(shopId)),
    getPageCount: (shopId) => dispatch(getPageCountStart(shopId)),
    getShopSettings: (shopId) => dispatch(getShopSettingsStart(shopId)),
    getSocialProfile: (shopId) => dispatch(getSocialProfileStart(shopId)),
    getStorePolicies: (shopId) => dispatch(getStorePolicies(shopId)),
    getShopDisplaySettings: (storeId) => dispatch(getShopDisplaySettingsStart(storeId)),
    getCategories: (storeId) => dispatch(getCategoryStart(storeId)),
    getSubCategories: (storeId) => dispatch(getSubCategoryStart(storeId)),
    getWalletBalance: (data) => dispatch(getWalletBalance(data)),
    getShopWidgets: (data) => dispatch(getShopWidgets(data))
})

const HOC = connect(mapStateToProps, mapDispatchToProps)(verifier)
const PageWrapper = WrappedComponent => {

    return (props) => <HOC>
        <WrappedComponent {...props} />
    </HOC>
}
export default PageWrapper;
