import React, { ReactNode } from 'react'
import Topbar from './Topbar'

interface LayoutProps {
    children: ReactNode
}
const Layout = ({ children }: LayoutProps) => {
    return (
        <div className='h-full w-full'>
            <Topbar />
            <main className='h-full w-full mt-10'>{children}</main>
        </div>
    )
}

export default Layout