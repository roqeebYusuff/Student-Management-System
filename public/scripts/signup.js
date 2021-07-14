(function($) {
    "use strict";

    $(function(){
        $("#form").validate({
            rules: {
                name: "required",
                email: {
                    required: true,
                    email: true
                },
                password: "required"
            }
        });

        function signup(){
            $('#form').on('submit', async function(e){
                e.preventDefault();
    
                if(!$('#form').valid()){
                    return;
                }  
    
                //Serialize form data
                var formData = {};
                var info = $("#form").serializeArray({checkboxesAsBools: false});
                $.each(info, (key, input) =>{
                    formData[input.name] = input.value;
                });
    
                console.log(formData);
    
                //Send data to server
                var request = $.ajax({
                    url: '/signup',
                    method: "POST",
                    dataType: 'json',
                    data: formData
                });
                
                request.done(function (response){
                    console.log(`Success: ${JSON.stringify(response)}`);
                });
                request.fail(function (response){
                    console.log(`Error: ${JSON.stringify(response)}`);
                });
                request.always(function (response){
                    console.log(`Completed: ${JSON.stringify(response)}`);
                });
            });
        }
    });

    

    // $('form').on('submit', async function(e){
    //     // if(!$('form').valid()){
    //     //     return;
    //     // }

    //     e.preventDefault();

    //     $.ajax({
    //         url: '/signup',
    //         method: 'POST',
    //         dataType: 'json',
    //         success: function(response){
    //             console.log(response);
    //         },

    //         error: function(response){
    //             console.log(response);
    //         }
    //     });

    //     // var errors = [];

    //     const email = $('.email').val();
    //     const name = $('.name').val();
    //     const password = $('.password').val();
    //     console.log(JSON.stringify({email, name, password}));   
    //     try{
    //         const res = await fetch('/signup', {
    //             method: "POST",
    //             body: JSON.stringify({email, name, password}),
    //             headers: {'Content-Type': 'application/json'}
    //         });

    //         const data = await res.json();
    //         console.log(data);

    //         if(data.message){
    //             $('span.error').append(data.message);
    //         }

    //         if(data.body.token){
    //             location.assign('/');
    //         }
    //     }

    //     catch(err){
    //         console.log(err)
    //     }
    // });
    
})(jQuery);