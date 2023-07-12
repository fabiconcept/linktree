export const generateMetaData = ({ params: { userId } }) =>{
    return ({
        title: `${userId} links`
    });
};

export default function UserLinksPage({ params: { userId } }) {
    return (
        <div className="p-6">{userId}</div>
    );
}