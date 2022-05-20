import React from 'react';

const WishlistSkeleton = () => {
    return (
        <div className="h-full   border-gray-200 rounded-lg overflow-hidden">
            <div className=" w-32 h-32 sm:w-40 sm:h-40 animate-pulse bg-gray-400 shrink-0 object-cover object-center"></div>
            <div className="px-6 pt-6">
                <h1 className="w-1/2 mb-3 sm:mb-4 h-4 sm:h-6 animate-pulse bg-gray-500"></h1>
                <h2 className="bg-gray-400 animate-pulse h-3 sm:h-4 w-1/4 mb-2"></h2>
                <p className="leading-relaxed mb-3 w-full h-2 sm:h-3 animate-pulse bg-gray-400"></p>
                <div className="block items-center flex-wrap ">
                    <a className="bg-indigo-300 h-4 animate-pulse mt-2 w-52 inline-flex items-center md:mb-2 lg:mb-0">

                    </a>

                </div>
            </div>
        </div>
    );
};

export default WishlistSkeleton;