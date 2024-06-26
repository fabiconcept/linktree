export const welcomeEmail = (email, password, name) => `
<style type="text/css">
  @import url(https://fonts.googleapis.com/css?family=Nunito);

  /* Take care of image borders and formatting */

  img {
    max-width: 600px;
    outline: none;
    text-decoration: none;
    -ms-interpolation-mode: bicubic;
  }
  html{
    margin: 0;
    padding:0;
  }

  a {
    text-decoration: none;
    border: 0;
    outline: none;
    color: #bbbbbb;
  }

  a img {
    border: none;
  }

  /* General styling */

  td, h1, h2, h3  {
    font-family: Helvetica, Arial, sans-serif;
    font-weight: 400;
  }

  td {
    text-align: center;
  }

  body {
    -webkit-font-smoothing:antialiased;
    -webkit-text-size-adjust:none;
    width: 100%;
    height: 100%;
    color: #666;
    background: #fff;
    font-size: 16px;
    height: 100vh;
    width: 100%;
    padding: 0px;
    margin: 0px;
  }

   table {
    border-collapse: collapse !important;
  }

  .headline {
    color: #444;
    font-size: 36px;
  }

 .force-full-width {
  width: 100% !important;
 }


  </style><style media="screen" type="text/css">
      @media screen {
        td, h1, h2, h3 {
          font-family: 'Nunito', 'Helvetica Neue', 'Arial', 'sans-serif' !important;
        }
      }
  </style><style media="only screen and (max-width: 480px)" type="text/css">
    /* Mobile styles */
    @media only screen and (max-width: 480px) {

      table[class="w320"] {
        width: 320px !important;
      }
    }
  </style>
  <style type="text/css"></style>
  
  </head>
  <body bgcolor="#fff" class="body" style="padding:20px; margin:0; display:block; background:#ffffff; -webkit-text-size-adjust:none">
<table align="center" cellpadding="0" cellspacing="0" height="100%" width="100%">
<tbody><tr>
<td align="center" bgcolor="#fff" class="" valign="top" width="100%">
<center class=""><table cellpadding="0" cellspacing="0" class="w320" style="margin: 0 auto;" width="600">
<tbody><tr>
<td align="center" class="" valign="top"><table cellpadding="0" cellspacing="0" style="margin: 0 auto;" width="100%">
</table>
<table bgcolor="#fff" cellpadding="0" cellspacing="0" class="" style="margin: 0 auto; width: 100%; margin-top: 100px;">
<tbody style="margin-top: 15px;">
  <tr class="">
<td class="">
<img alt="Lintree Logo" class="" height="155" src="https://linktree.sirv.com/Images/full-logo.png">
</td>
</tr>
<tr class=""><td class="headline">Welcome to My Linktree Clone!</td></tr>
<tr>
<td>
<center class=""><table cellpadding="0" cellspacing="0" class="" style="margin: 0 auto;" width="75%"><tbody class=""><tr class="">
<td class="" style="color:#444; font-weight: 400;"><br><br>
 This project is my attempt at recreating the amazing system that Linktree has developed. <br><br>
  <b>Disclaimer</b><em>This is not the actual linktree, and has no affliation to or with Linktree, it is just a personal project.</em><br>
 <br>
  Your login credentials are provided below:
<br>
<span style="font-weight:bold;">Email: &nbsp;</span><span style="font-weight:lighter;" class="">${email}</span> 
 <br>
  <span style="font-weight:bold;">Password: &nbsp;</span><span style="font-weight:lighter;" class="">${password}}</span>
<br><br>  
<br></td>
</tr>
</tbody></table></center>
</td>
</tr>
<tr>
<td class="">
<div class="">
<a style="background-color:#674299;border-radius:4px;color:#fff;display:inline-block;font-family:Helvetica, Arial, sans-serif;font-size:18px;font-weight:normal;line-height:50px;text-align:center;text-decoration:none;width:350px;-webkit-text-size-adjust:none;" href="https://mylinks.fabiconcept.online/login">${name}</a>
</div>
 <br>
</td>
</tr>
</tbody>
  
  </table>

<table bgcolor="#fff" cellpadding="0" cellspacing="0" class="force-full-width" style="margin: 0 auto; margin-bottom: 5px:">
<tbody>
<tr>
<td class="" style="color:#444;
                    ">
<p>Thank you for checking my project out. ❤❤❤
  
    <a href="https://fabiconcept.online/" style="text-decoration: underline;">
      see more</a>
  
  </p>
  </td>
</tr>
</tbody></table></td>
</tr>
</tbody></table></center>
</td>
</tr>
</tbody></table>
</body>
`

export const resetPasswordEmail = (resetPasswordURL) => `
<html>
<head>
  <meta charset="utf-8">
  <title>Password Reset Email</title>
  <style type="text/css">
    @import url(https://fonts.googleapis.com/css?family=Nunito);

    :root {
      --primary-color: #674299;
      --text-color: #444;
      --background-color: #ffffff;
      --button-text-color: #ffffff;
      --button-background-color: #674299;
    }

    @media (prefers-color-scheme: light) {
      :root {
        --primary-color: #ffffff;
        --text-color: #ffffff;
        --background-color: #674299;
        --button-text-color: #674299;
        --button-background-color: #ffffff;
      }
      .logo {
        filter: invert(1);
      }
    }

    body {
      -webkit-font-smoothing: antialiased;
      -webkit-text-size-adjust: none;
      width: 100%;
      height: 100%;
      background: var(--background-color);
      color: var(--text-color);
      font-family: 'Nunito', sans-serif;
      font-size: 16px;
      padding: 20px;
      margin: 0;
    }

    img {
      max-width: 600px;
      outline: none;
      text-decoration: none;
      -ms-interpolation-mode: bicubic;
    }

    a {
      text-decoration: none;
      border: 0;
      outline: none;
      color: var(--text-color);
    }

    a img {
      border: none;
    }

    td, h1, h2, h3 {
      font-family: 'Nunito', sans-serif;
      font-weight: 400;
    }

    td {
      text-align: center;
    }

    table {
      border-collapse: collapse !important;
    }

    .headline {
      color: var(--text-color);
      font-size: 36px;
      margin-top: 20px;
    }

    .button {
      background-color: var(--button-background-color);
      border-radius: 4px;
      color: var(--button-text-color);
      display: inline-block;
      font-family: 'Nunito', sans-serif;
      font-size: 18px;
      line-height: 50px;
      text-align: center;
      text-decoration: none;
      width: 350px;
      margin: 20px 0;
    }

    .footer {
      color: var(--text-color);
      margin: 20px 0;
    }

    .container {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
    }

    .content {
      width: 75%;
      margin: 0 auto;
    }
  </style>
</head>
<body>
  <div class="container">
    <table align="center" cellpadding="0" cellspacing="0" width="100%">
      <tbody>
        <tr>
          <td align="center" valign="top" width="100%">
            <center>
              <table cellpadding="0" cellspacing="0" width="600">
                <tbody>
                  <tr>
                    <td valign="top">
                      <table cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                          <td>
                            <img alt="Lintree Logo" width="155" src="https://linktree.sirv.com/Images/full-logo.png" style="padding: 1rem" class="logo">
                          </td>
                        </tr>
                        <tr>
                          <td class="headline">Reset Password Email</td>
                        </tr>
                        <tr>
                          <td>
                            <center>
                              <table cellpadding="0" cellspacing="0" class="content">
                                <tbody>
                                  <tr>
                                    <td style="color: var(--text-color); font-weight: 400;">
                                      <br><br>
                                      You've requested to reset your password. Please use the following link to reset your password:
                                      <br><br>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </center>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div>
                              <a class="button" href="${resetPasswordURL}" target="_blank">Reset Password</a>
                            </div>
                            <br>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table cellpadding="0" cellspacing="0" class="force-full-width">
                <tbody>
                  <tr>
                    <td class="footer">
                      <p>Thank you for using our service! ❤❤❤</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </center>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</body>
</html>
`