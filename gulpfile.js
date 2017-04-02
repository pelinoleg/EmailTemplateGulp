var gulp = require('gulp');
var emailBuilder = require('gulp-email-builder');
var replace = require('gulp-replace');

var current_date = new Date().toString(),


  remote_imgs_basepath = 'http://mydomain.com/email_img/',
  email_builder_options = {
    encodeSpecialChars: true,
    emailTest: {
      // Email to send to
      to: 'name@gmail.com,' +
        'name2@gmail.com',
      // Email sent from
      from: 'name2@gmail.com',
      // Your email Subject
      subject: 'Gulp Email Test' + ' [' + current_date + ']',
      // for work email send, need allow access for less secure apps
      // https://support.google.com/accounts/answer/6010255?hl=en
      nodemailer: {
        transporter: {
          service: 'gmail',
          auth: {
            user: 'name3@gmail.com',
            pass: 'password'
          }
        },
        defaults: {}
      }
    }
  };

gulp.task('default', function() {
  gulp.src(['./app/*.html'])
    .pipe(replace(/src="img\//g, 'src="' + remote_imgs_basepath))
    .pipe(emailBuilder(email_builder_options).build())
    .pipe(gulp.dest('./ready_to_send'));
});
