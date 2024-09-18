import Head from 'next/head'

export default function MetaTags({description}) {
    return (
        <Head>
            <meta charSet="utf-8" />
            <title>{(description.title) ? description.title : "Khoa Nguyễn"}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="description" content={(description.desc) ? description.desc : "Xin chào, tớ là Khoa Nguyễn. Tớ là sinh viên chuyên ngành Kỹ thuật phần mềm tại Đại học FPT. Hiện tại tớ cũng đang là freelancer thiết kế đồ hoạ và phát triển một số dự án cá nhân liên quan tới chuyên ngành."}/>
            <meta name="keywords" content="Blog, Khoa Nguyen, Khoa Nguyễn, Khoa Nguyn, Nguyễn Đăng Khoa, Post , React, Nextjs, Next JS, Typescript, Cpp, Coding, Language, JavaScript, Reactjs, Khoa Nguyen Blog, Software Development, Software Engineer, Frontend Developer, Frontend Engineer, Web Developer, KhoaNguyen, Khoa Nguyen Dev, Graphic Designer, Nodejs, Khoa Nguyen Codes"/>
            <meta name="author" content="Khoa Nguyễn" />
            <meta name="robots" content="index, follow" />
            <meta name="revisit-after" content="1 days" />
            <meta name="language" content="vi" />
            <meta name="copyright" content="Khoa Nguyen" />
            <meta name="application-name" content="Khoa Nguyen" />
            <meta name="msapplication-TileColor" content="#000000" />
            <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
            <meta name="msapplication-config" content="/browserconfig.xml" />
            <meta name="theme-color" content="#000000" />
            <link rel="canonical" href={description.url || "https://khoanguyen.codes"}/>
            <link rel="icon" type="image/x-icon" href="/favicon.ico"/>
            <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
            <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
            <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
            <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
            <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
            <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
            <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
            <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
            <link rel="icon" type="image/png" sizes="36x36" href="/favicon-36x36.png" />
            <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
            <link rel="icon" type="image/png" sizes="72x72" href="/favicon-72x72.png" />
            <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
            <link rel="icon" type="image/png" sizes="144x144" href="/favicon-144x144.png" />
            <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png"/>
            <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png"/>
            <link rel="icon" href="/favicon-96x96.png" sizes="96x96" type="image/png"/>
            <link rel="manifest" href="/manifest.json" />
            <meta name="msapplication-TileColor" content="#000000" />
            <meta name="msapplication-TileImage" content="/image/ms-icon-144x144.png" />
            {/* <!-- Open Graph / Facebook --> */}
            <meta property="og:site_name" content="Khoa Nguyen"></meta>
            <meta property="og:type" content="website" />
            <meta property="og:url" content={description.url || "https://khoanguyen.codes"} />
            <meta property="og:title" content={description.title} />
            <meta property="og:description" content={description.desc || "Xin chào, tớ là Khoa Nguyễn. Tớ là sinh viên chuyên ngành Kỹ thuật phần mềm tại Đại học FPT. Hiện tại tớ cũng đang là freelancer thiết kế đồ hoạ và phát triển một số dự án cá nhân liên quan tới chuyên ngành."} />
            <meta property="og:image" content={description.img} />
            <meta property="og:image:alt" content="Khoa Nguyen" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="fb:app_id" content="1881282985689458" />
            {/* <!-- Twitter --> */}
            <meta property="twitter:card" content="summary_large_image"/>
            <meta property="twitter:url" content={description.url || "https://khoanguyen.codes"} />
            <meta property="twitter:title" content={description.title}/>
            <meta property="twitter:description" content={(description.desc) ? description.desc : "Xin chào, tớ là Khoa Nguyễn. Tớ là sinh viên chuyên ngành Kỹ thuật phần mềm tại Đại học FPT. Hiện tại tớ cũng đang là freelancer thiết kế đồ hoạ và phát triển một số dự án cá nhân liên quan tới chuyên ngành của mình."}/>
            <meta property="twitter:image" content={description.img}/>
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