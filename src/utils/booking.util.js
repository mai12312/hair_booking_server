import nodemailer  from "nodemailer";
import { AsyncParser } from '@json2csv/node';

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_APP_PASSWORD
    }
});

function generateBookingEmailHtml({ customerName, services, totalPrice, startTime, cancelUrl }) {
    return `
        <div style="font-family: Arial, sans-serif; padding: 24px;">
            <h2 style="color: #2d3748;">Đặt lịch thành công</h2>
            <p>Xin chào <b>${customerName}</b>,</p>
            <p>Bạn đã đặt lịch thành công với các thông tin sau:</p>
            <ul>
                <li><b>Thời gian:</b> ${startTime}</li>
                <li><b>Dịch vụ đã đặt:</b></li>
                <ul>
                    ${services.map(s => `<li>${s.name} - ${s.price.toLocaleString()}₫</li>`).join("")}
                </ul>
                <li><b>Tổng tiền:</b> ${totalPrice.toLocaleString()}₫</li>
            </ul>
            <p>Nếu bạn muốn hủy lịch, vui lòng nhấn nút bên dưới:</p>
            <a href="${cancelUrl}" style="display:inline-block;padding:12px 24px;background:#e53e3e;color:#fff;text-decoration:none;border-radius:6px;font-weight:bold;">Hủy lịch</a>
            <p style="margin-top:24px;">Cảm ơn bạn đã sử dụng dịch vụ!</p>
        </div>
    `;
}

export const sendEmailForCustomer = async ({ 
    customerEmail, 
    customerName, 
    services,
    totalPrice,
    startTime,
    code,
    bookingId
}) => {
    const cancelUrl = `${process.env.FRONTEND_URL}/cancel-booking/${bookingId}?code=${code}`;
    const html = generateBookingEmailHtml({
        customerName,
        services,
        totalPrice,
        startTime,
        cancelUrl
    });

    const mailOptions = {
        from: {
            name: process.env.EMAIL_NAME,
            address: process.env.EMAIL_ADDRESS
        },
        to: [customerEmail],
        subject: "Xác nhận đặt lịch thành công",
        text: "Bạn đã đặt lịch thành công!",
        html
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: ", info.response);
    } catch (error) {
        console.error("Error sending email: ", error);
    }
};

export const exportBookingsToCSV = async (booking, fileName, res) => {
    const opts = {};
    const transformOpts = {};
    const asyncOpts = {};
    const parser = new AsyncParser(opts, asyncOpts, transformOpts);
    res.setHeader('Content-Disposition', 'attachment; filename="' + fileName + '"');
    res.setHeader('Content-Type', 'text/csv');
    parser.parse(booking).pipe(res);
}