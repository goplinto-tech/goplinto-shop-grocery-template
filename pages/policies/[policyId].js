import PageWrapper from '@components/page-wrapper/page-wrapper';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import "react-quill/dist/quill.bubble.css";

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const Index = ({ storePolicies }) => {
    const router = useRouter()
    const [policyContent, setPolicyContent] = useState("")
    useEffect(() => {
        console.log("storePolicies", storePolicies)
        const { policyId } = router.query
        if (policyId) {
            const content = storePolicies.filter(item => item.policy_id == policyId)
            setPolicyContent(content[0].content)
        }

        console.log("policyId", content)
    }, [router.isReady, storePolicies])


    return (
        <div className='p-20'>
            <ReactQuill
                value={policyContent}
                readOnly={true}
                theme={'bubble'}
            />
        </div>
    );
};

const mapStateToProps = state => ({
    storePolicies: state.store.storePolicies
})

export default connect(mapStateToProps)(PageWrapper(Index));