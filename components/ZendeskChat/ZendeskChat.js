import Head from 'next/head';
import React, { useState } from 'react';
import { connect } from "react-redux";


const ZendeskChat = ({ widgets }) => {
    
    return (
        <>

            {widgets != null ?
                widgets?.ZENDESK ?
                    widgets?.ZENDESK?.record_status == "ACTIVE" ?
                        <>
                            <Head>
                            <script id="ze-snippet" src={`https://static.zdassets.com/ekr/snippet.js?key=${widgets?.ZENDESK?.integration_attributes?.key}`}> </script>
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
export default connect(mapStateToProps)(ZendeskChat);