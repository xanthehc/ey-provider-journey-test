const { NotifyClient } = require("notifications-node-client");

const apiKey = 'magic_link-0b94efef-1e60-4200-a2b8-ec7a2d545fd9-6d159ebf-6d1a-4350-a9c9-7a21fd21c03d'; // replace with your actual API key
const templateId = 'e571db62-1c28-4d43-990b-ad856dd47bbf';
const notifyClient = new NotifyClient(apiKey);

function sendEmail(email) {
  notifyClient.sendEmail(templateId, email)
  .then(response => {
    console.log("Email sent successfully:", response);
  })
  .catch(error => {
    console.error("Error sending email:", error);
  });
}

module.exports = sendEmail; // Export the sendEmail function