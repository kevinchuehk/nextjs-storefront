import Navbar from './navbar'


export default function Layout({ children }) {
    return (
        <div data-theme="cmyk">
            <Navbar />
            <main>{children}</main>
        </div>
    )
}