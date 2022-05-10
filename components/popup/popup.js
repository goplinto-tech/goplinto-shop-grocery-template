import { logOutCancel } from "@redux/UI/ui-action";
import { logOutStart } from "@redux/user/user-action";
import { connect } from "react-redux";
import { Button } from "@components/inputs";

const Popup = ({ logout, logoutStart, logOutCancel }) => {
    return (
        <>
            {
                !!logout &&
                <div className="fixed inset-0 bg-gray-400 z-30 bg-opacity-80" style={{ zIndex: 10002 }}>
                    <div className=" absolute left-1/2 h-fit bottom-0 sm:bottom-auto sm:top-1/2 bg-white rounded-md w-full -translate-x-1/2 sm:-translate-y-1/2 p-4 sm:p-10" style={{ maxWidth: '556px' }}>
                        <div className="title-c">
                            <h2 className="text-center text-3xl text-red-500 m-auto"> {'Sure?'}</h2>
                            {/* <Button className='bg-transparent dark-blue p-2' onClick={clearError}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z" />
                                    <path fillRule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z" />
                                </svg>
                            </Button> */}
                        </div>
                        <div className='my-8 text-center'>
                            <p className='text-base font-medium'>Are you sure? You want to log out !</p>
                        </div>
                        <div className="mt-10 flex justify-between space-x-4 text-lg text-white">
                            <Button className="py-3 w-full  font-semibold hover:bg-red-500 hover:text-white text-red-500 border-2 border-red-500 rounded transition-all " type="button" onClick={() => { logoutStart(); logOutCancel() }} >{'Yes'}</Button>
                            <Button className="py-3 w-full bg-red-500  font-semibold   border-2  rounded transition-all" type="button" onClick={() => { logOutCancel() }} >{'No, wait'}</Button>
                        </div>

                    </div>
                </div>
            }
        </>
    )
}

const mapDispatchToProps = dispatch => ({
    logoutStart: () => dispatch(logOutStart()),
    logOutCancel: () => dispatch(logOutCancel())
})

const mapStateToProps = state => ({
    logout: state.ui.logout
})

export default connect(mapStateToProps, mapDispatchToProps)(Popup);