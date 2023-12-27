import nodemailer  from 'nodemailer';

export const transporter =  nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: `${process.env.EMAIL_USER}`,
        pass: `${process.env.EMAIL_PASSWORD}`
    },
    secure: true
});


export const emailSender = async (email: string, link: string) => {
    try {
        await transporter.sendMail({
            to: email,
            subject: "Confirm Email",
            html: `<div>
                <h4>Email Confirmation</h4>
                    <h3>Click on link below</h3>
                    <p>
                        <a href=${link}>${link}</a>
                    </p>
                </div>`
        });
        console.log("Email sent successfully");
    }catch(err){
        console.log("Email cannot be sent")
    }
}

