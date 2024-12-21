export const generateStyledOTPEmail = (otp: string): string => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>OTP Email</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f9;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background: #ffffff;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .email-header {
      text-align: center;
      padding: 10px;
    }
    .email-header img {
      width: 100px;
      margin-bottom: 5px;
    }
    .email-header h2{
      color: #c0392b
    }
    .email-body {
      padding: 20px;
      color: #333333;
      line-height: 1.6;
    }
    .email-body h1 {
      color: #4caf50;
      font-size: 24px;
    }
    .otp {
      display: inline-block;
      padding: 10px 20px;
      margin: 20px 0;
      font-size: 24px;
      font-weight: bold;
      color: #ffffff;
      background: #4caf50;
      border-radius: 5px;
      text-decoration: none;
    }
    .email-footer {
      background-color: #f4f4f9;
      text-align: center;
      padding: 10px;
      font-size: 12px;
      color: #888888;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <img src="https://i.ibb.co.com/tQ28cP8/logo.png" alt="App Logo">
      <h2>Pizza Pie</h2>
    </div>
    <div class="email-body">
      <h1>Hi there!</h1>
      <p>We received a request to verify your email. Use the following OTP to complete the process:</p>
      <div class="otp">${otp}</div>
      <p>This OTP is valid for the next <strong>5 minutes</strong>.</p>
      <p>If you didn't request this, please ignore this email.</p>
      <p>Thank you,<br>Pizza Pie</p>
    </div>
    <div class="email-footer">
      <p>&copy; 2025 Pizza Pie. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `;
};
