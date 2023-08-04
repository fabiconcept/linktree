import { Inter } from 'next/font/google'
import NavBar from '../components/General Components/NavBar'
import CheckSession from './general components/CheckSession'
import { Toaster } from 'react-hot-toast'
import Preview from './general components/Preview'

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
                    <CheckSession />

                    <div className="flex sm:px-3 px-2 h-full overflow-y-hidden">
                        {children}
                        <Preview />
                    </div>

                </div>
            </body>
        </html>
    )
}