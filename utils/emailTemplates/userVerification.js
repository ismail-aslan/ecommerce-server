const userVerification = (email, verificationUrl) => {
  const html = `<!DOCTYPE html
  PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
  <meta charset="UTF-8">
  <meta content="width=device-width, initial-scale=1" name="viewport">
  <meta name="x-apple-disable-message-reformatting">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta content="telephone=no" name="format-detection">
  <title>Activate account</title>
  <!--[if (mso 16)]><style type="text/css">     a {text-decoration: none;}     </style><![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]><xml> <o:OfficeDocumentSettings> <o:AllowPNG></o:AllowPNG> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings> </xml><![endif]-->
  <style type="text/css">
      .rollover:hover .rollover-first {
          max-height: 0px !important;
          display: none !important;
      }

      .rollover:hover .rollover-second {
          max-height: none !important;
          display: inline-block !important;
      }

      .rollover div {
          font-size: 0px;
      }

      u~div img+div>div {
          display: none;
      }

      #outlook a {
          padding: 0;
      }

      span.MsoHyperlink,
      span.MsoHyperlinkFollowed {
          color: inherit;
          mso-style-priority: 99;
      }

      a.es-button {
          mso-style-priority: 100 !important;
          text-decoration: none !important;
      }

      a[x-apple-data-detectors] {
          color: inherit !important;
          text-decoration: none !important;
          font-size: inherit !important;
          font-family: inherit !important;
          font-weight: inherit !important;
          line-height: inherit !important;
      }

      .es-desk-hidden {
          display: none;
          float: left;
          overflow: hidden;
          width: 0;
          max-height: 0;
          line-height: 0;
          mso-hide: all;
      }

      .es-header-body a:hover {
          color: #ee6c6d !important;
      }

      .es-content-body a:hover {
          color: #ee6c6d !important;
      }

      .es-footer-body a:hover {
          color: #333333 !important;
      }

      .es-infoblock a:hover {
          color: #cccccc !important;
      }

      .es-button-border:hover>a.es-button {
          color: #efefef !important;
      }

      @media only screen and (max-width:600px) {
          *[class="gmail-fix"] {
              display: none !important
          }

          p,
          a {
              line-height: 150% !important
          }

          h1,
          h1 a {
              line-height: 120% !important
          }

          h2,
          h2 a {
              line-height: 120% !important
          }

          h3,
          h3 a {
              line-height: 120% !important
          }

          h4,
          h4 a {
              line-height: 120% !important
          }

          h5,
          h5 a {
              line-height: 120% !important
          }

          h6,
          h6 a {
              line-height: 120% !important
          }

          h1 {
              font-size: 30px !important;
              text-align: center;
              line-height: 120% !important
          }

          h2 {
              font-size: 26px !important;
              text-align: center;
              line-height: 120% !important
          }

          h3 {
              font-size: 20px !important;
              text-align: center;
              line-height: 120% !important
          }

          h4 {
              font-size: 24px !important;
              text-align: left
          }

          h5 {
              font-size: 20px !important;
              text-align: left
          }

          h6 {
              font-size: 16px !important;
              text-align: left
          }

          .es-header-body h1 a,
          .es-content-body h1 a,
          .es-footer-body h1 a {
              font-size: 30px !important
          }

          .es-header-body h2 a,
          .es-content-body h2 a,
          .es-footer-body h2 a {
              font-size: 26px !important
          }

          .es-header-body h3 a,
          .es-content-body h3 a,
          .es-footer-body h3 a {
              font-size: 20px !important
          }

          .es-header-body h4 a,
          .es-content-body h4 a,
          .es-footer-body h4 a {
              font-size: 24px !important
          }

          .es-header-body h5 a,
          .es-content-body h5 a,
          .es-footer-body h5 a {
              font-size: 20px !important
          }

          .es-header-body h6 a,
          .es-content-body h6 a,
          .es-footer-body h6 a {
              font-size: 16px !important
          }

          .es-menu td a {
              font-size: 16px !important
          }

          .es-header-body p,
          .es-header-body a {
              font-size: 16px !important
          }

          .es-content-body p,
          .es-content-body a {
              font-size: 14px !important
          }

          .es-footer-body p,
          .es-footer-body a {
              font-size: 16px !important
          }

          .es-infoblock p,
          .es-infoblock a {
              font-size: 12px !important
          }

          .es-m-txt-c,
          .es-m-txt-c h1,
          .es-m-txt-c h2,
          .es-m-txt-c h3,
          .es-m-txt-c h4,
          .es-m-txt-c h5,
          .es-m-txt-c h6 {
              text-align: center !important
          }

          .es-m-txt-r,
          .es-m-txt-r h1,
          .es-m-txt-r h2,
          .es-m-txt-r h3,
          .es-m-txt-r h4,
          .es-m-txt-r h5,
          .es-m-txt-r h6 {
              text-align: right !important
          }

          .es-m-txt-j,
          .es-m-txt-j h1,
          .es-m-txt-j h2,
          .es-m-txt-j h3,
          .es-m-txt-j h4,
          .es-m-txt-j h5,
          .es-m-txt-j h6 {
              text-align: justify !important
          }

          .es-m-txt-l,
          .es-m-txt-l h1,
          .es-m-txt-l h2,
          .es-m-txt-l h3,
          .es-m-txt-l h4,
          .es-m-txt-l h5,
          .es-m-txt-l h6 {
              text-align: left !important
          }

          .es-m-txt-r img,
          .es-m-txt-c img,
          .es-m-txt-l img,
          .es-m-txt-r .rollover:hover .rollover-second,
          .es-m-txt-c .rollover:hover .rollover-second,
          .es-m-txt-l .rollover:hover .rollover-second {
              display: inline !important
          }

          .es-m-txt-r .rollover div,
          .es-m-txt-c .rollover div,
          .es-m-txt-l .rollover div {
              line-height: 0 !important;
              font-size: 0 !important
          }

          .es-spacer {
              display: inline-table
          }

          a.es-button,
          button.es-button {
              font-size: 20px !important
          }

          .es-m-fw,
          .es-m-fw.es-fw,
          .es-m-fw .es-button {
              display: block !important
          }

          .es-m-il,
          .es-m-il .es-button,
          .es-social,
          .es-social td,
          .es-menu {
              display: inline-block !important
          }

          .es-adaptive table,
          .es-left,
          .es-right {
              width: 100% !important
          }

          .es-content table,
          .es-header table,
          .es-footer table,
          .es-content,
          .es-footer,
          .es-header {
              width: 100% !important;
              max-width: 600px !important
          }

          .adapt-img {
              width: 100% !important;
              height: auto !important
          }

          .es-mobile-hidden,
          .es-hidden {
              display: none !important
          }

          .es-desk-hidden {
              width: auto !important;
              overflow: visible !important;
              float: none !important;
              max-height: inherit !important;
              line-height: inherit !important
          }

          tr.es-desk-hidden {
              display: table-row !important
          }

          table.es-desk-hidden {
              display: table !important
          }

          td.es-desk-menu-hidden {
              display: table-cell !important
          }

          .es-menu td {
              width: 1% !important
          }

          table.es-table-not-adapt,
          .esd-block-html table {
              width: auto !important
          }

          .es-social td {
              padding-bottom: 10px
          }

          .h-auto {
              height: auto !important
          }

          p,
          ul li,
          ol li,
          a {
              font-size: 16px !important
          }

          a.es-button,
          button.es-button {
              display: inline-block !important
          }

          .es-button-border {
              display: inline-block !important
          }
      }
  </style>
</head>

<body style="width:100%;height:100%;padding:0;Margin:0">
  <div class="es-wrapper-color" style="background-color:#FFFFFF">
      <!--[if gte mso 9]><v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t"> <v:fill type="tile" color="#ffffff"></v:fill> </v:background><![endif]-->
      <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0"
          style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#FFFFFF">
          <tr>
              <td valign="top" style="padding:0;Margin:0">
                  
                  <table class="es-content" align="center" cellspacing="0" cellpadding="0"
                      style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important">
                      <tr>
                          <td align="center" style="padding:0;Margin:0">
                              <table class="es-content-body" align="center" cellspacing="0" cellpadding="0"
                                  bgcolor="#ffffff"
                                  style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
                                  <tr>
                                      <td align="left" style="padding:0;Margin:0;padding-top:20px">
                                          <table width="100%" cellspacing="0" cellpadding="0"
                                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                              <tr>
                                                  <td align="center" valign="top"
                                                      style="padding:0;Margin:0;width:600px">
                                                      <table width="100%" cellspacing="0" cellpadding="0"
                                                          style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                          <tr>
                                                              <td align="center"
                                                                  style="padding:0;Margin:0;padding-right:20px;padding-left:20px;font-size:0">
                                                                  <img class="adapt-img"
                                                                      src="${process.env.BASE_URL}assets/images/email_profile.png"
                                                                      alt="Image"
                                                                      style="display:block;font-size:14px;border:0;outline:none;text-decoration:none"
                                                                      title="Image" width="260"></td>
                                                          </tr>
                                                      </table>
                                                  </td>
                                              </tr>
                                          </table>
                                      </td>
                                  </tr>
                              </table>
                          </td>
                      </tr>
                  </table>
                  <table class="es-content" align="center" cellspacing="0" cellpadding="0"
                      style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important">
                      <tr>
                          <td align="center" style="padding:0;Margin:0">
                              <table class="es-content-body"
                                  style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;border-top:1px solid transparent;border-right:1px solid transparent;border-left:1px solid transparent;width:600px;border-bottom:1px solid transparent"
                                  align="center" cellspacing="0" cellpadding="0" bgcolor="#ffffff">
                                  <tr>
                                      <td align="left"
                                          style="Margin:0;padding-top:20px;padding-right:40px;padding-bottom:40px;padding-left:40px">
                                          <table width="100%" cellspacing="0" cellpadding="0"
                                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                              <tr>
                                                  <td align="left" style="padding:0;Margin:0;width:518px">
                                                      <table width="100%" cellspacing="0" cellpadding="0"
                                                          style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                          <tr>
                                                              <td class="es-m-txt-c" align="center"
                                                                  style="padding:0;Margin:0">
                                                                  <h2
                                                                      style="Margin:0;font-family:arial, 'helvetica neue', helvetica, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:24px;font-style:normal;font-weight:normal;line-height:29px;color:#333333">
                                                                      Hey there!<br></h2>
                                                              </td>
                                                          </tr>
                                                          <tr>
                                                              <td class="es-m-txt-c" align="center"
                                                                  style="padding:0;Margin:0;padding-top:15px">
                                                                  <p
                                                                      style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">
                                                                      We received a request to set your email to
                                                                      ${email}. If this is correct, please
                                                                      confirm by clicking the button below. If you
                                                                      don’t know why you got this email, please tell
                                                                      us straight away so we can fix this for you.</p>
                                                              </td>
                                                          </tr>
                                                          <tr>
                                                              <td align="center"
                                                                  style="Margin:0;padding-top:20px;padding-right:10px;padding-bottom:15px;padding-left:10px">
                                                                  <span class="es-button-border"
                                                                      style="border-style:solid;border-color:#474745;background:#474745;border-width:0px;display:inline-block;border-radius:20px;width:auto"><a
                                                                          href=${verificationUrl}
                                                                          class="es-button" target="_blank"
                                                                          style="mso-style-priority:100 !important;text-decoration:none !important;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;font-size:16px;color:#EFEFEF;padding:10px 20px 10px 20px;display:inline-block;background:#474745;border-radius:20px;font-weight:normal;font-style:normal;line-height:19px;width:auto;text-align:center;letter-spacing:0;mso-padding-alt:0;mso-border-alt:10px solid #474745">Confirm
                                                                          Email</a></span></td>
                                                          </tr>
                                                      </table>
                                                  </td>
                                              </tr>
                                          </table>
                                      </td>
                                  </tr>
                              </table>
                          </td>
                      </tr>
                  </table>
                  <table cellpadding="0" cellspacing="0" class="es-footer" align="center"
                      style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important;background-color:transparent;background-repeat:repeat;background-position:center top">
                      <tr>
                          <td style="padding:0;Margin:0;background-color:#F7F7F7" bgcolor="#f7f7f7" align="center">
                              <table class="es-footer-body" cellspacing="0" cellpadding="0" align="center"
                                  style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#F7F7F7;width:600px">
                                  <tr>
                                      <td align="left"
                                          style="Margin:0;padding-top:20px;padding-right:20px;padding-left:20px;padding-bottom:20px">
                                          <table width="100%" cellspacing="0" cellpadding="0"
                                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                              <tr>
                                                  <td valign="top" align="center"
                                                      style="padding:0;Margin:0;width:560px">
                                                      <table width="100%" cellspacing="0" cellpadding="0"
                                                          style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                          <tr>
                                                              <td align="center"
                                                                  style="padding:0;Margin:0;padding-bottom:5px">
                                                                  <h3
                                                                      style="Margin:0;font-family:arial, 'helvetica neue', helvetica, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:20px;font-style:normal;font-weight:normal;line-height:30px;color:#333333">
                                                                      Let's get social</h3>
                                                              </td>
                                                          </tr>
                                                          <tr>
                                                              <td align="center"
                                                                  style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px;font-size:0">
                                                                  <table class="es-table-not-adapt es-social"
                                                                      cellspacing="0" cellpadding="0"
                                                                      style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                                      <tr>
                                                                          <td valign="top" align="center"
                                                                              style="padding:0;Margin:0;padding-right:20px">
                                                                              <a href="https://www.linkedin.com/in/ismailaslan-/"
                                                                                  target="_blank"
                                                                                  style="mso-line-height-rule:exactly;text-decoration:underline;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;color:#333333"><img
                                                                                      title="Linkedin"
                                                                                      src="https://slndav.stripocdn.email/content/assets/img/social-icons/logo-colored/linkedin-logo-colored.png"
                                                                                      alt="In" width="32" height="32"
                                                                                      style="display:block;font-size:14px;border:0;outline:none;text-decoration:none"></a>
                                                                          </td>
                                                                          <td valign="top" align="center"
                                                                              style="padding:0;Margin:0;padding-right:20px">
                                                                              <a href="https://github.com/ismail-aslan"
                                                                                  target="_blank"
                                                                                  style="mso-line-height-rule:exactly;text-decoration:underline;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;color:#333333"><img
                                                                                      title="GitHub"
                                                                                      src="https://slndav.stripocdn.email/content/assets/img/other-icons/logo-colored/github-logo-colored.png"
                                                                                      alt="GitHub" width="32"
                                                                                      height="32"
                                                                                      style="display:block;font-size:14px;border:0;outline:none;text-decoration:none"></a>
                                                                          </td>
                                                                          <td valign="top" align="center"
                                                                              style="padding:0;Margin:0;padding-right:20px">
                                                                              <a href="mailto:https://ismailaslan1097@gmail.com"
                                                                                  target="_blank"
                                                                                  style="mso-line-height-rule:exactly;text-decoration:underline;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;color:#333333"><img
                                                                                      title="Gmail"
                                                                                      src="https://slndav.stripocdn.email/content/assets/img/other-icons/logo-colored/gmail-logo-colored.png"
                                                                                      alt="gm" width="32" height="32"
                                                                                      style="display:block;font-size:14px;border:0;outline:none;text-decoration:none"></a>
                                                                          </td>
                                                                          <td valign="top" align="center"
                                                                              style="padding:0;Margin:0"><a
                                                                                  href="https://ismailaslan.me"
                                                                                  target="_blank"
                                                                                  style="mso-line-height-rule:exactly;text-decoration:underline;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;color:#333333"><img
                                                                                      title="Website"
                                                                                      src="https://slndav.stripocdn.email/content/assets/img/other-icons/logo-colored/link-logo-colored.png"
                                                                                      alt="Website" width="32"
                                                                                      height="32"
                                                                                      style="display:block;font-size:14px;border:0;outline:none;text-decoration:none"></a>
                                                                          </td>
                                                                      </tr>
                                                                  </table>
                                                              </td>
                                                          </tr>
                                                          <tr>
                                                              <td align="center"
                                                                  style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px">
                                                                  <p
                                                                      style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">
                                                                      You are receiving this email because you have
                                                                      visited my site and registered.</p>
                                                              </td>
                                                          </tr>
                                                          <tr>
                                                              <td align="center"
                                                                  style="padding:0;Margin:0;padding-bottom:10px">
                                                                  <p
                                                                      style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">
                                                                      <strong>Designed by&nbsp;<a target="_blank"
                                                                              href="https://ismailaslan.me"
                                                                              style="mso-line-height-rule:exactly;text-decoration:underline;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;color:#333333">Ismail
                                                                              ASLAN</a>.</strong></p>
                                                              </td>
                                                          </tr>
                                                          <tr>
                                                              <td align="center"
                                                                  style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px">
                                                                  <p
                                                                      style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">
                                                                      © 2023<br></p>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                  </td>
                                              </tr>
                                          </table>
                                      </td>
                                  </tr>
                              </table>
                          </td>
                      </tr>
                  </table>
              </td>
          </tr>
      </table>
  </div>
  <div style="position:absolute;left:-9999px;top:-9999px;margin:0px"></div>
</body>

</html>`;

  return html;
};

exports.userVerification = userVerification;
