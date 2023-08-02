import { Inter } from 'next/font/google'
import NavBar from '../components/General Components/NavBar'
import CheckSession from './general components/CheckSession'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Link Tree | Dashboard',
    description: 'This is a Link tree Clone Web App Developed by Fabiconcept.',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Toaster 
                    position="bottom-right"
                />
                <div className='w-screen h-screen max-w-screen max-h-screen overflow-y-auto relative bg-black bg-opacity-[.05] p-2 flex flex-col'>
                    <NavBar />
                    <CheckSession/>
                    {children}
                </div>
            </body>
        </html>
    )
}