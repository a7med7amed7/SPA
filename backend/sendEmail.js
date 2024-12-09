const mailjet = require('node-mailjet')
    .apiConnect(process.env.MAILJET_API_KEY, process.env.MAILJET_SECRET_KEY);
const send = (title, data) => {
    console.log("SEND EMAIL")
    console.log(data);
    let htmlProductsTable = `
    <table border="1" cellpadding="5" cellspacing="0" style="width: 100%; margin-top: 20px; border-collapse: collapse;">
    <thead>
    <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total Paid</th>
                </tr>
                </thead>
                <tbody>
                `;
    let cost = 0;
    data.products.forEach(product => {
        cost += product.cost;
        htmlProductsTable += `
            <tr>
                <td>${product.name}</td>
                <td>${product.price}$</td>
                <td>${product.quantity}</td>
                <td>${product.cost}$</td>
            </tr>
        `;
    });

    htmlProductsTable += `
        </tbody>
    </table>
    `; const htmlBody = `
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
    <hr />
    ${htmlProductsTable}
    <h3>Total Paid : ${cost}$</h3>
    `
    const request = mailjet
        .post('send', { version: 'v3.1' })
        .request({
            Messages: [
                {
                    From: {
                        Email: "aboz7amed7@gmail.com",
                        Name: "Ahmed Hamed"
                    },
                    To: [
                        {
                            Email: data.email,
                            Name: `${data.firstName} ${data.lastName}`
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