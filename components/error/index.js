
const ErrorPage = ({ message = 'Somthing went wrong!.', statusCode = 500 }) => (
    <div className="flex w-full justify-center items-center" style={{ minHeight: '80vh' }}>
        <div className="text-center">
            <p className="text-lg red-color font-semibold">{message}</p>
            <p className="text-2xl font-medium">{statusCode}</p>
        </div>
    </div>
)
export default ErrorPage;