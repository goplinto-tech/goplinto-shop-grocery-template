// HOC/withAuth.jsx
import { useEffect } from 'react'
import Router from 'next/router'
import { connect } from "react-redux";

import Loader from '../loading/loader';

// Action
import { authShowToggle } from '../../redux/user/user-action'


const Protecter = ({ WrappedComponent, authToggle, authshow, authestore, ...props }) => {
    // checks whether we are on client / browser or server.

    if (typeof window !== "undefined") {
        // const Router = useRouter();
        // If there is no access token we redirect to "/" page.
        if (!props.user) {
            useEffect(() => {
                // Router.back()
                authToggle()
                if (!authshow && !props.user) {
                    Router.push(`/`)
                }
            }, [props.user])
            return <Loader />;
        }
        // If this is an accessToken we just render the component that was passed with all its props
        return <WrappedComponent {...props} />;
    };
    // If we are on server, return null
    return null;
};

const mapStateToProps = state => ({
    user: state.user.currentUser,
    authshow: state.user.show,
    authestore: state.store.info
})
const mapDispatchToProps = dispatch => ({
    authToggle: () => dispatch(authShowToggle()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Protecter);