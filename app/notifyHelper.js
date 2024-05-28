// app/notifyHelper.js
const { NotifyClient } = require('notifications-node-client');

const apiKey = 'magic_link-0b94efef-1e60-4200-a2b8-ec7a2d545fd9-5dee66e8-3301-4928-a7c5-8ad21f980d30'; // replace with your actual API key
const templateId = 'e571db62-1c28-4d43-990b-ad856dd47bbf'; // replace with your actual template ID
const notifyClient = new NotifyClient(apiKey);

async function sendEmail(emailAddress) {
  try {
    const response = await notifyClient.sendEmail(templateId, emailAddress);
    console.log('Email sent:', response);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

module.exports = {
  sendEmail
};

