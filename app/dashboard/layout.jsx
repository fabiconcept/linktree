import { Inter } from 'next/font/google'
import NavBar from '../components/General Components/NavBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Link Tree | Dashboard',
    description: 'This is a Link tree Clone Web App Developed by Fabiconcept.',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">

            <body className={inter.className}>
                <div className='w-screen h-screen overflow-y-auto relative bg-black bg-opacity-[.05] p-2 flex flex-col'>
                    <NavBar />

                    {children}
                </div>
            </body>
        </html>
    )
}