/**
 * A Jsx button for use
 * @param  {String | function} children Selector for the element
 * @param  {String} title   Title of the button or link
 * @param  {String} type    Specify the button will be the Link or Button
 * @param  {String} href    If Button is link then provide a href value
 * @param  {object} props   Other props that should be injected like onClick function
 * @return {function}      Return the Jsx button
 */

// import Link from "@components/link"
// import Link from "@components/link"
import Link from "next/link"

const Button = ({ children = "", title = "", type = 'button', className = '', href = "/", disabled = false, ...props }) => {
    return (
        <>
            {
                type == 'link' ?
                    <Link href={href}  {...props}>
                        <a className={`custom-button text-center ${' '}${className} ${disabled && 'disabled'}`} {...props}>
                            {children || title || 'Click'}
                        </a>
                    </Link>
                    :
                    <button className={`text-center custom-button outline-none ${' '}${className}`} type={type} disabled={disabled} {...props}>
                        {children || title || 'Click'}
                    </button>
            }
        </>
    )
}

export default Button
