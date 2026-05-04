<?php
/**
 * PHPMailer - PHP email creation and transport class.
 * Simplified for SARAH-OS Remote Deployment.
 */

namespace PHPMailer\PHPMailer;

class PHPMailer
{
    public $Priority = null;
    public $CharSet = 'UTF-8';
    public $ContentType = 'text/plain';
    public $Encoding = '8bit';
    public $ErrorInfo = '';
    public $From = 'root@localhost';
    public $FromName = 'Root User';
    public $Sender = '';
    public $ReturnPath = '';
    public $Subject = '';
    public $Body = '';
    public $AltBody = '';
    public $Ical = '';
    protected $MIMEBody = '';
    protected $MIMEHeader = '';
    protected $mailHeader = '';
    public $WordWrap = 0;
    public $Mailer = 'mail';
    public $Sendmail = '/usr/sbin/sendmail';
    public $UseSendmailOptions = true;
    public $ConfirmReadingTo = '';
    public $Hostname = '';
    public $MessageID = '';
    public $MessageDate = '';
    public $Host = 'localhost';
    public $Port = 25;
    public $Helo = '';
    public $SMTPSecure = '';
    public $SMTPAutoTLS = true;
    public $SMTPAuth = false;
    public $SMTPOptions = array();
    public $Username = '';
    public $Password = '';
    public $AuthType = '';
    public $Timeout = 300;
    public $dsn = '';
    public $SMTPDebug = 0;
    public $Debugoutput = 'echo';
    public $SMTPKeepAlive = false;
    public $SingleTo = false;
    protected $SingleToArray = array();
    public $LE = "\n";
    public $DKIM_selector = '';
    public $DKIM_identity = '';
    public $DKIM_passphrase = '';
    public $DKIM_domain = '';
    public $DKIM_copy_header = true;
    public $DKIM_private = '';
    public $DKIM_private_string = '';
    public $action_function = '';
    public $XMailer = '';
    protected $smtp = null;
    protected $to = array();
    protected $cc = array();
    protected $bcc = array();
    protected $ReplyTo = array();
    protected $all_recipients = array();
    protected $RecipientsQueue = array();
    protected $ReplyToQueue = array();
    protected $attachment = array();
    protected $CustomHeader = array();
    protected $lastMessageID = '';
    protected $message_type = '';
    protected $boundary = array();
    protected $language = array();
    protected $error_count = 0;
    protected $sign_cert_file = '';
    protected $sign_key_file = '';
    protected $sign_extracerts_file = '';
    protected $sign_key_pass = '';
    protected $exceptions = false;
    protected $uniqueid = '';

    const VERSION = '6.8.0';

    public function __construct($exceptions = null)
    {
        if (null !== $exceptions) {
            $this->exceptions = (bool) $exceptions;
        }
        $this->uniqueid = hash('sha256', microtime(true) . uniqid(mt_rand(), true));
    }

    public function setFrom($address, $name = '', $auto = true)
    {
        $this->From = (string) $address;
        $this->FromName = (string) $name;
        if ($auto && empty($this->Sender)) {
            $this->Sender = (string) $address;
        }
        return true;
    }

    public function addAddress($address, $name = '')
    {
        return $this->addOrEnqueueAnAddress('to', $address, $name);
    }

    protected function addOrEnqueueAnAddress($kind, $address, $name)
    {
        $this->all_recipients[strtolower($address)] = true;
        $this->{$kind}[] = [trim($address), (string) $name];
        return true;
    }

    public function isHTML($isHtml = true)
    {
        if ($isHtml) {
            $this->ContentType = 'text/html';
        } else {
            $this->ContentType = 'text/plain';
        }
    }

    public function isSMTP()
    {
        $this->Mailer = 'smtp';
    }

    public function send()
    {
        try {
            if (!$this->preSend()) {
                return false;
            }
            return $this->postSend();
        } catch (Exception $e) {
            $this->mailHeader = '';
            $this->setError($e->getMessage());
            if ($this->exceptions) {
                throw $e;
            }
            return false;
        }
    }

    public function preSend()
    {
        if ('mail' === $this->Mailer || 'sendmail' === $this->Mailer || 'qmail' === $this->Mailer) {
            // Simplified for this deployment
        }
        $this->MIMEHeader = "MIME-Version: 1.0\r\n";
        $this->MIMEHeader .= "Content-Type: " . $this->ContentType . "; charset=" . $this->CharSet . "\r\n";
        $this->MIMEHeader .= "From: " . $this->FromName . " <" . $this->From . ">\r\n";
        if (!empty($this->ReplyTo)) {
            foreach ($this->ReplyTo as $rt) {
                $this->MIMEHeader .= "Reply-To: " . $rt[1] . " <" . $rt[0] . ">\r\n";
            }
        }
        return true;
    }

    public function postSend()
    {
        foreach ($this->to as $to) {
            if (!@mail($to[0], $this->Subject, $this->Body, $this->MIMEHeader)) {
                return false;
            }
        }
        return true;
    }

    protected function setError($msg)
    {
        $this->error_count++;
        $this->ErrorInfo = $msg;
    }
}
