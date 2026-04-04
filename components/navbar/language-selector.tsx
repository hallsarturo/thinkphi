'use client';

// import { ChevronDownIcon } from '@heroicons/react/16/solid';
import { useRouter, usePathname } from 'next/navigation';

export default function LanguageSelector() {
    const router = useRouter();
    const pathname = usePathname();

    function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const newLocale = e.target.value;
        const segments = pathname.split('/');
        segments[1] = newLocale;
        router.push(segments.join('/'));
    }

    return (
        <>
            {/* <label
                htmlFor="language-toggle"
                className="block text-sm/6 font-medium text-gray-900"
            ></label>
            <div className="grid grid-cols-1"> */}
            <select
                onChange={handleChange}
                id="language"
                name="language-toggle"
                defaultValue="EN"
                className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-4 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-600 sm:text-sm/6 cursor-pointer"
            >
                <option value="en">EN</option>
                <option value="es">ES</option>
            </select>
            {/* <ChevronDownIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                /> */}
            {/* </div> */}
        </>
    );
}
