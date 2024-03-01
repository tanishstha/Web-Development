package com.example.stepelegance.controller.Authentication;

import org.apache.commons.text.RandomStringGenerator;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

public class OtpEmailSender {

    public String subject, otp;
    public OtpEmailSender(){
        subject = "Your OTP Code";
        otp = generateOtp();

    }



    public void sendOtpEmail(String toEmail) {
        // SMTP server configuration
        String host = "smtp.zoho.com";
        String username = "stepelegance";
        String password = "sendOTP2023!";
        int port = 587;

        // Sender's email address
        String fromEmail = "stepelegance@zohomail.com";

        // Set the properties
        Properties properties = new Properties();
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.starttls.enable", "true");
        properties.put("mail.smtp.host", host);
        properties.put("mail.smtp.port", port);

        // Create the Session object
        Session session = Session.getInstance(properties, new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(username, password);
            }
        });

        try {
            // Create a MimeMessage object
            MimeMessage message = new MimeMessage(session);

            // Set the sender and recipient addresses
            message.setFrom(new InternetAddress(fromEmail));
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(toEmail));

            // Set the email subject
            message.setSubject(subject);

            // Set the email content with OTP
            message.setText("Your OTP code is: " + otp);

            // Send the email
            Transport.send(message);

            System.out.println("OTP email sent successfully!");

        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    private static String generateOtp() {
        // Use Apache Commons Text library to generate a random 6-digit OTP
        RandomStringGenerator generator = new RandomStringGenerator.Builder()
                .withinRange('0', '9')
                .build();
        return generator.generate(6);
    }
}
