export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
        },
        sitemap: 'https://ya-links.vercel.app/sitemap.xml',
    }
}