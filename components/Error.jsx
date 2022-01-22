import React from 'react';

export default function Error({children}) {
    return <div className='flex h-[90vh] w-full justify-center items-center text-[40px] font-[300] text-blue'>
        <div>{children ? children: "Error occured."}</div>
    </div>;
}
