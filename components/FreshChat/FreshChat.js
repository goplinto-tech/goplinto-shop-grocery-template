import Head from 'next/head';
import React, { useState } from 'react';
import { connect } from "react-redux";

const FreshChat = ({widgets}) => {
    // const [freshChatCodekey, setFreshChatCodekey] = useState(null)
    // if (typeof window != 'undefined' && widgets != null) {
    //     const parser = new DOMParser();
    //     if (widgets?.FRESHCHAT?.record_status == "ACTIVE" && widgets?.FRESHCHAT?.integration_attributes?.code) {
    //         const freshchatcode = parser.parseFromString(widgets?.FRESHCHAT?.integration_attributes?.code, "text/html")
    //         const key = freshchatcode.head.getElementsByTagName('script')[0].src
    //         if (!freshChatCodekey) {
    //             setFreshChatCodekey(key)
    //         }
    //     }
    // }

    return (
        <>

            {widgets != null ?
                widgets?.FRESHCHAT ?
                    widgets?.FRESHCHAT?.record_status == "ACTIVE" ?
                        <>
                            <Head>
                            <script src={`//in.fw-cdn.com/${widgets?.FRESHCHAT?.integration_attributes?.key}.js`} chat='true'></script>
                            </Head>
                        </>
                        :
                        ""
                    :
                    ""
                :
                ""
            }
        </>
    );
};

const mapStateToProps = state => ({
    widgets: state.store.widgets,
})
export default connect(mapStateToProps)(FreshChat);