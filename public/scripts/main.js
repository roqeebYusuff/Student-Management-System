$('#form').validate({
    rules: {
      email: {
        required: true,
        email: true
      },
      password: {
        required: true
      }
    }
});

//Show Password
$('.form-control-icon.showToggle').on('click', function(){
  if($('.form-control-icon.showToggle i').hasClass('bi-eye')){
    $('.form-control-icon.showToggle i').removeClass('bi-eye').addClass('bi-eye-slash');
    $('.form-control.password').attr('type','text');
  }
  else{
    $('.form-control-icon.showToggle i').removeClass('bi-eye-slash').addClass('bi-eye');
    $('.form-control.password').attr('type','password');
  }
});

function Toast(message,type){
  Swal.fire({
    title: type,
    text: message,
    icon: 'error',
    width: 400, 
    backdrop: `rgba(0,0,123,0.4)`,
    showClass:{
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass:{
      popup: 'animate__animated animate__fadeOutUp'
    }
  });
}

function login(){
  $('#form').on('submit', function(e){
    e.preventDefault();

    $('.email-error').text('');
    $('.password-error').text('');

    if(!$('#form').valid()){
        return;
    }

    const email = $('.email').val();
    const password = $('.password').val();

    var frmData = {email,password};

    var request = $.ajax({
        url: '/login',
        method: 'POST',
        dataType: 'json',
        data: frmData
    });

    request.done(function (response){
        if(response.status == 200){
          location.assign('/');
        }

        else{
          if(response.body.error.email != ''){
            Toast(response.body.error.email,'Error');
          }

          if(response.body.error.password != ''){
            Toast(response.body.error.password,'Error');
          }
        }
    });

    request.fail(function (response){
        
    });

    request.always(function (response){
        
    });
  });
}

function signup(){
  $('#form').on('submit', async function(e){
      e.preventDefault();

      $('.email-error').text('');
      $('.password-error').text('');

      if(!$('#form').valid()){
          return;
      }

      const email = $('.email').val();
      const name = $('.name').val();
      const password = $('.password').val();

      var frmData = {name,email,password};

      //Send data to server
      var request = $.ajax({
          url: '/signup',
          method: "POST",
          dataType: 'json',
          data: frmData
      });
      
      request.done(function (response){
          if(response.status == 200){
            location.assign('/');
          }

          else{
            if(response.body.error.email != ''){
              Toast(response.body.error.email,'Error');
            }

            if(response.body.error.name != ''){
              Toast(response.body.error.name,'Error');
            }
  
            if(response.body.error.password != ''){
              Toast(response.body.error.password,'Error');
            }
          }
      });
      request.fail(function (response){
          
      });
      request.always(function (response){
          
      });
  });
}