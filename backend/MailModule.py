import os
from dotenv import load_dotenv

from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import smtplib

from string import Template
from pathlib import Path


class MailModule:
    def __init__(self) -> None:
        self.loadENV()
        self.title = ""
        self.sender = ""
        self.reciever = ""
        self.content = self.mailInit()

    def loadENV(self):
        load_dotenv()
        self.senderMail = os.getenv("SENDER_MAIL_ACCOUNT")
        self.__senderMailPW = os.getenv("SENDER_MAIL_PASSWORD")

    def mailInit(self) -> MIMEMultipart:
        content = MIMEMultipart()  # 建立MIMEMultipart物件
        return content

    def setMailTitle(self, title):
        self.title = title

    def setMailSender(self, sender):
        self.sender = sender

    def setMailReciever(self, reciever):
        self.reciever = reciever

    def addMailReciever(self, reciever):
        self.reciever += ";" + reciever

    def addMailAttach(self, obj):
        self.content.attach(obj)

    def getMailContent(self):
        return self.content

    def getMailAttachs(self):
        return self.content.get_payload()

    def makeQRCodeHtml(self, QRCodeURL):

        template = Template(Path("mailHtml.html").read_text())
        body = template.substitute(
            {"QRcode": QRCodeURL})
        return body

    def makeMail(self):
        if self.title == '':
            raise ValueError("title is empty")

        if self.sender == '':
            raise ValueError("sender is empty")

        if self.reciever == '':
            raise ValueError("reciever is empty")

        self.content["subject"] = self.title  # 郵件標題
        self.content["from"] = self.sender  # 寄件者
        self.content["to"] = self.reciever  # 收件者

    def sendMail(self):
        self.makeMail()
        with smtplib.SMTP(host="smtp.gmail.com", port="587") as smtp:  # 設定SMTP伺服器
            try:
                smtp.ehlo()  # 驗證SMTP伺服器
                smtp.starttls()  # 建立加密傳輸
                smtp.login(self.senderMail,
                           self.__senderMailPW)  # 登入寄件者gmail
                smtp.send_message(self.content)  # 寄送郵件
                print("Complete!")
            except Exception as e:
                print("Error message: ", e)


    def send(MailReciever, entokenid):
        mailModule = MailModule()
        mailModule.setMailTitle("活動門票QRcode")
        mailModule.setMailSender("F110110132@nkust.edu.tw")
        mailModule.setMailReciever(MailReciever)
        data = entokenid
        QRcodeURL = f"https://api.qrserver.com/v1/create-qr-code/?data={data}&amp;size=200x200"
        QRCode = mailModule.makeQRCodeHtml(QRcodeURL)
        mailModule.addMailAttach(MIMEText(QRCode, "html"))  # 郵件內容
        mailModule.addMailAttach(MIMEText("nice"))  # 郵件內容

        mailModule.sendMail()
        del mailModule


