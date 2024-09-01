import Head from 'next/head'

export default function Metatags({description}) {
    return (
        <Head>
            <meta charset="utf-8" />
            <title>{description.title}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="description" content={(description.desc) ? description.desc : "Khoa Nguyễn is a software engineer in Hanoi, Vietnam. He enjoys building software with Reactjs and dealing with algorithms and data structures."}/>
            <meta name="keywords" content={(description.keywords) ? `${description.keywords}, Blog, Khoa Nguyen, Khoa Nguyễn, Khoa Nguyen, Khoa Nguyn, Nguyễn Đăng Khoa, Post` : "React, Nextjs, Next JS, Typescript, Cpp, Coding, Language, JavaScript, Reactjs, Khoa Nguyen Blog, Khoa Nguyen, Software Development, Software Engineer, Frontend Developer, Frontend Engineer, Web Developer, KhoaNguyen, Khoa Nguyen Dev, Graphic Designer, Nodejs, Nguyễn Đăng Khoa, Khoa Nguyễn"}/>
            <meta name="author" content="Khoa Nguyen" />
            <meta name="robots" content="index, follow" />
            <meta name="revisit-after" content="1 days" />
            <meta name="language" content="en" />
            <meta name="copyright" content="Khoa Nguyen" />
            <meta name="application-name" content="Khoa Nguyen Website" />
            <meta name="theme-color" content="#000000" />
            <meta name="msapplication-TileColor" content="#000000" />
            <meta name="msapplication-TileImage" content="/favicon/ms-icon-144x144.png" />
            <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
            <meta name="theme-color" content="#000000" />
            <link rel="apple-touch-icon" sizes="57x57" href="/favicon/apple-icon-57x57.png" />
            <link rel="apple-touch-icon" sizes="60x60" href="/favicon/apple-icon-60x60.png" />
            <link rel="apple-touch-icon" sizes="72x72" href="/favicon/apple-icon-72x72.png" />
            <link rel="apple-touch-icon" sizes="76x76" href="/favicon/apple-icon-76x76.png" />
            <link rel="apple-touch-icon" sizes="114x114" href="/favicon/apple-icon-114x114.png" />
            <link rel="apple-touch-icon" sizes="120x120" href="/favicon/apple-icon-120x120.png" />
            <link rel="apple-touch-icon" sizes="144x144" href="/favicon/apple-icon-144x144.png" />
            <link rel="apple-touch-icon" sizes="152x152" href="/favicon/apple-icon-152x152.png" />
            <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-icon-180x180.png" />
            <link rel="icon" type="image/png" sizes="192x192" href="/favicon/android-icon-192x192.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="96x96" href="/favicon/favicon-96x96.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
            <link rel="manifest" href="/manifest.json" />
            <meta name="msapplication-TileColor" content="#000000" />
            <meta name="msapplication-TileImage" content="/image/ms-icon-144x144.png" />
            <meta name="theme-color" content="#000000" />
            {/* <!-- Open Graph / Facebook --> */}
            <meta property="og:type" content="website"/>
            <meta property="og:url" content={description.url}/>
            <meta property="og:title" content={description.title}/>
            <meta property="og:description" content={(description.desc) ? description.desc : "Khoa Nguyễn is a software engineer in Hanoi, Vietnam. He enjoys building software with Reactjs and dealing with algorithms and data structures."}/>
            <meta property="og:image" content="/favicon/wall.png"/>
            <meta property="og:image:alt" content="Khoa Nguyen"/>
            <meta property="og:image:width" content="1200"/>
            <meta property="og:image:height" content="630"/>
            {/* <!-- Twitter --> */}
            <meta property="twitter:card" content="summary_large_image"/>
            <meta property="twitter:url" content={description.url}/>
            <meta property="twitter:title" content={description.title}/>
            <meta property="twitter:description" content={(description.desc) ? description.desc : "Khoa Nguyễn is a software engineer in Hanoi, Vietnam. He enjoys building software with Reactjs and dealing with algorithms and data structures."}/>
            <meta property="twitter:image" content="https://khoanguyen.codes/favicon/wall.png"/>
            <meta property="twitter:image:alt" content="Khoa Nguyen"/>
            <meta property="twitter:image:width" content="1200"/>
            <meta property="twitter:image:height" content="630"/>
            {/* <!-- SEO--> */}
            <meta name="googlebot" content="notranslate"/>
            <meta name="author" content="Khoa Nguyễn"/>
            <meta name="copyright" content="Khoa Nguyễn"/>
            <meta name="application-name" content="Khoa Nguyễn"/>
        </Head>
    )
}