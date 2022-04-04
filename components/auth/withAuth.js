// HOC/withAuth.jsx

import { useRouter } from "next/router";
import { connect } from "react-redux";

import { authShowToggle } from "../../redux/user/user-action";
import Protecter from "./protecter";

// const Protecter = ({ WrappedComponent, user, error, authToggle, ...props }) => {
//     // checks whether we are on client / browser or server.
//     if (typeof window !== "undefined") {
//         const Router = useRouter();
//         // If there is no access token we redirect to "/" page.
//         if (!user) {
//             authToggle();
//             return null;
//         }
//         // If this is an accessToken we just render the component that was passed with all its props
//         return <WrappedComponent {...props} />;
//     }
//     // If we are on server, return null
//     return null;
// };

const withAuth = (WrappedComponent) => {
    return (props) => <Protecter WrappedComponent={WrappedComponent} {...props} />
    // return ({ user, error, authToggle, ...props }) => {
    //     // checks whether we are on client / browser or server.
    //     if (typeof window !== "undefined") {
    //         const Router = useRouter();
    //         // If there is no access token we redirect to "/" page.
    //         if (!user) {
    //             authToggle();
    //             return null;
    //         }
    //         // If this is an accessToken we just render the component that was passed with all its props
    //         return <WrappedComponent {...props} />;
    //     }
    //     // If we are on server, return null
    //     return null;
    // };
};

export default withAuth;
// export default connect(mapStateToProps, mapDispatchToProps)(withAuth);