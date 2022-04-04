export const getStaticPropsHandler = async (context) => {
    console.log(context, 'fromHere');
    return {
        props: {}
    }
}
