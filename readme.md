<h1>(A) Technical Assessment</h1>
<h2>1.0 Features of Assessment</h2>
A simple automated chatbot is created to greet customers for the first time and 
reply to their enquiries about the description, price and shipping fee of a specific product.
<br>
If customer is interested to buy an product, an email will be sent to the business owner with full product details including
description, price and shipping fee.

<h2>2.0 Setup</h2>
<h3>2.1 Facebook Page Access Token</h3>
<ol>
    <li>On the App Dashboard > Messenger > Settings > Access Tokens, retrieve the access token of your facebook page.</li>
    <li>Jot down the page access token, it will be used in <strong>2.2 Run Project and API</strong>.</li>
</ol>
<h3>2.2 Run Project and API</h3>
<ol>
    <li>Please download the project.</li>
    <li>Run <i>npm install</i> to install packages.</li>
    <li>Run <i>npm run start</i></li>
    <li>Run <i>node dist/server.js</i> to start this project locally.</li>
    <li>Run <strong>4.1 Create Client</strong> to register with your email address(for email notification purpose) 
        and FB page access token. This API will return client ID, which will be used in <strong>2.3 Setup Webhook on Meta</strong>
    </li>
    <li>Setup ngrok and run <code>ngrok http 8080</code></li>
</ol>
<h3>2.3 Setup Webhook on Meta</h3>
<ol>
    <li>On the App Dashboard > Webhooks, make sure to register the callback url with the correct path ({SERVER_URL}/webhook/messaging/{CLIENT_ID}).</li>
    <li>The 'Verify Token' is JER-TEST-MESSAGING</li>
    <li>Make sure to subscribe <code>messages</code> object.</li>
</ol>

<h2>3.0 Assumptions</h2>
<ul>
    <li>During testing, developer has subscribed <code>messages</code> on the App Dashboard > Webhooks.</li>
    <li>After receiving email notification when customer sends <code>/buy product-xyz</code>, it is assumed that the customer
service will contact the customer for further details including delivery address, payment method, contact details, etc.</li>
    <li>Email content is not formatted or beautified.</li>
    <li>Sendgrid API Key is registered under my personal email (jeremylee0624.dev@gmail.com), which will be the 'Sent From' email when you receive email notification.</li>
</ul>


<h2>4.0 APIs</h2>
<h3>4.1 Create Client</h3>
Calculate the monthly tax and income of an employee for the month through his annual salary.
<table>
<tr>
    <th>Method</th>
    <td colspan="2">POST</td>
</tr>
<tr>
    <th>Url</th>
    <td colspan="2">http://localhost:8080/api/generatePayslip</td>
</tr>
<tr>
    <th>Body(Json)</th>
    <td>
        <code>name: string</code><br>
        <code>email: string</code><br>
        <code>pageAccessToken: string</code><br>
    </td>
    <td>
        <code>
            {
                "name": "xxx",
                "email": "xxx@xxx.com",
                "pageAccessToken": "xxxx-xxxx-xxxx",
            }
        </code>
    </td>
</tr>
<tr>
    <th>Response(Json)</th>
    <td>
        <code>clientId: string;</code>
    </td>
    <td>
        <code>
            {
                "clientId": "62e25177cb7bd62b9de11aac"
            }
        </code>
    </td>
</tr>
</table>

<h3>4.2 Get All Clients</h3>
<table>
<tr>
    <th>Method</th>
    <td colspan="2">GET</td>
</tr>
<tr>
    <th>Url</th>
    <td colspan="2">http://localhost:8080/api/client</td>
</tr>
<tr>
    <th>Response(Json)</th>
    <td>
        <code>clients: Client[];</code>
    </td>
    <td>
    </td>
</tr>
</table>

<h3>4.3 Get All Emails</h3>
<table>
<tr>
    <th>Method</th>
    <td colspan="2">GET</td>
</tr>
<tr>
    <th>Url</th>
    <td colspan="2">http://localhost:8080/api/email</td>
</tr>
<tr>
    <th>Response(Json)</th>
    <td>
        <code>clients: Email[];</code>
    </td>
    <td>
    </td>
</tr>
</table>

<h3>4.4 Get All Messages (from FB)</h3>
<table>
<tr>
    <th>Method</th>
    <td colspan="2">GET</td>
</tr>
<tr>
    <th>Url</th>
    <td colspan="2">http://localhost:8080/api/fbMessageFrom</td>
</tr>
<tr>
    <th>Response(Json)</th>
    <td>
        <code>clients: FbMessage[];</code>
    </td>
    <td>
    </td>
</tr>
</table>

<h3>4.5 Get All Messages (replied to FB users)</h3>
<table>
<tr>
    <th>Method</th>
    <td colspan="2">GET</td>
</tr>
<tr>
    <th>Url</th>
    <td colspan="2">http://localhost:8080/api/fbMessageTo</td>
</tr>
<tr>
    <th>Response(Json)</th>
    <td>
        <code>clients: FbMessage[];</code>
    </td>
    <td>
    </td>
</tr>
</table>

<h3>4.2 Get All Products</h3>
<table>
<tr>
    <th>Method</th>
    <td colspan="2">GET</td>
</tr>
<tr>
    <th>Url</th>
    <td colspan="2">http://localhost:8080/api/product</td>
</tr>
<tr>
    <th>Response(Json)</th>
    <td>
        <code>clients: Product[];</code>
    </td>
    <td>
    </td>
</tr>
</table>

<hr><hr>
<h1>(B) Question</h1>
<h2>How to solve the high volume of write operations in RDS MySQL databases?</h2>

<h3>Implement microservices</h3>
Decompose the application by nouns or resources so that each of them is allocated with its own database and to handle its
own write operations.

<h3>Combine many rows as one when creating/updating rows</h3>
<code>insert</code> multiple values at once instead of calling the <code>insert</code> operation every time 
for every single new row.

<h3>Limit number of entries to be written into database at once</h3>
Set a limit to the number of entries that can be inserted to database at once, so that
database will not be hold for too long to handle a just single operation.

<h3>Horizontal scaling</h3>
Extends the database operation to additional nodes.