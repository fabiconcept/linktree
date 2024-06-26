const apiKey = process.env.NEXT_PUBLIC_SMTP_API;


export const EmailJs = async (
    recipientName,
    recipientEmail,
    subject,
    htmlContent
) => {
    const headers = new Headers({
        'accept': 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json',
    });

    const body = JSON.stringify({
        sender: {
            name: "Not Link Tree - Fabiconcept",
            email: "noreply@this-is-not-linktree.com",
        },
        to: [
            {
                email: recipientEmail,
                name: recipientName,
            },
        ],
        subject,
        htmlContent,
    });

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers,
        body,
    });

    return response;
}