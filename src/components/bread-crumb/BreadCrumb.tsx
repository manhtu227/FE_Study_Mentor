'use client';

import { TBreadCrumbProps } from '@core/models/bread-crumb.model';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const NextBreadcrumb = ({
    homeElement,
    separator,
    containerClasses,
    listClasses,
    activeClasses,
    capitalizeLinks,
}: TBreadCrumbProps) => {
    const paths = usePathname();
    const pathNames = paths && paths.split('/').filter((path) => path);

    return paths !== '/' ? (
        <div>
            <ul className={containerClasses}>
                <li className={listClasses}>
                    <Link href={'/'} className='no-underline text-blue-800'>
                        {homeElement}
                    </Link>
                </li>
                {pathNames && pathNames.length > 0 && separator}
                {pathNames &&
                    pathNames.map((link, index) => {
                        const href = `/${pathNames.slice(0, index + 1).join('/')}`;
                        const itemClasses =
                            paths === href ? `${listClasses} ${activeClasses}` : listClasses;
                        const itemLink = capitalizeLinks
                            ? link[0].toUpperCase() + link.slice(1, link.length)
                            : link;
                        return (
                            <React.Fragment key={index}>
                                <li className={itemClasses}>
                                    <Link href={href} className='no-underline text-black-800'>
                                        {itemLink}
                                    </Link>
                                </li>
                                {pathNames.length !== index + 1 && separator}
                            </React.Fragment>
                        );
                    })}
            </ul>
        </div>
    ) : (
        <></>
    );
};

export default NextBreadcrumb;
