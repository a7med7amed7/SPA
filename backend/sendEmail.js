const mailjet = require('node-mailjet')
    .apiConnect(process.env.MAILJET_API_KEY, process.env.MAILJET_SECRET_KEY);
const send = (title, data) => {
    console.log("SEND EMAIL")
    const htmlBody = `
    <h1>Your order is begin shipped</h1>
    <h3>Details</h3>
    <ul>
    <li>First Name : ${data.firstName}</li>
    <li>Last Name : ${data.lastName}</li>
    <li>Country : ${data.country}</li>
    <li>City : ${data.city}</li>
    <li>Address : ${data.address}</li>
    <li>Zip/Postal Code : ${data.zipCode}</li>
    <li>Phone : ${data.phone}</li>
    <li>Email : ${data.email}</li>
    </ul>
    `
    const request = mailjet
        .post('send', { version: 'v3.1' })
        .request({
            Messages: [
                {
                    From: {
                        Email: "aboz7amed7@gmail.com",
                        Name: "Mailjet Pilot"
                    },
                    To: [
                        {
                            Email: "aboz7amed7@gmail.com",
                            Name: "passenger 1"
                        }
                    ],
                    Subject: title,
                    TextPart: "Your order is begin shipped!",
                    HTMLPart: htmlBody
                }
            ]
        })

    request
        .then((result) => {
            console.log(result.body)
        })
        .catch((err) => {
            console.log(err.statusCode)
        })
}
module.exports = send;