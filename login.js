$(document).ready(function() {
    let selectedRole = null; 


    $('.form-control').on('focus', function() {
        $(this).parent().addClass('focused');
    }).on('blur', function() {
        if ($(this).val() === '') {
            $(this).parent().removeClass('focused');
        }
    });

    $('.social_icon span, .input-group-text').hover(
        function() {
            $(this).addClass('hovered');
        }, function() {
            $(this).removeClass('hovered');
        }
    );


    $('.card').hide().fadeIn(1000);


    $('.login_btn').hover(
        function() {
            $(this).addClass('btn-hover');
        }, function() {
            $(this).removeClass('btn-hover');
        }
    );


    $('a').hover(
        function() {
            $(this).addClass('link-hover');
        }, function() {
            $(this).removeClass('link-hover');
        }
    );

 
    $('#roleModal').modal('show');


    $('#roleModal').on('shown.bs.modal', function () {
        $('.main-container').addClass('blur');
    });

    $('#roleModal').on('hidden.bs.modal', function () {
        $('.main-container').removeClass('blur');
    });

 
    $('#clientBtn, #engineerBtn').click(function() {
        if ($(this).attr('id') === 'clientBtn') {
            selectedRole = 'client';
            $('.card-header h3').text('Sign In to Client Portal');
            $('.card-header').css({
                'font-family': "'Roboto Slab', serif",
                'color': '#FFC312'
            });
        } else if ($(this).attr('id') === 'engineerBtn') {
            selectedRole = 'engineer';
            $('.card-header h3').text('Sign In to Engineer Portal');
            $('.card-header').css({
                'font-family': "'Roboto Slab', serif",
                'color': '#12CBC4'
            });
        }

        $(this).addClass('pulse-effect');

        setTimeout(() => {
            $(this).removeClass('pulse-effect');
        }, 600);

        $('#roleModal').modal('hide');
    });

    $('.login_btn').click(function(e) {
        
        e.preventDefault();

 
        const username = $('input[type="text"]').val().trim();
        const password = $('input[type="password"]').val().trim();

        if (username === '' || password === '') {

            alert('Must enter both Username and Password to continue.');
            return;
        }


        $(this).addClass('pulse-effect');

 
        setTimeout(() => {
            $(this).removeClass('pulse-effect');
        }, 600); 

     
        localStorage.setItem('username', username);

      
        if (selectedRole === 'engineer') {
            window.location.href = 'eng.html';
        } else if (selectedRole === 'client') {
            window.location.href = 'index.html'; 
        } else {
         
            window.location.href = 'index.html';
        }
    });

  
    $('#roleModal').modal('show');

   
    $('#clientBtn').on('click', function() {
        selectedRole = 'client';
        $('#roleModal').modal('hide');
    });

  
    $('#engineerBtn').on('click', function() {
        selectedRole = 'engineer';
        $('#roleModal').modal('hide');
    });

    $('.login_btn').on('click', function(event) {
        event.preventDefault();

        if (!selectedRole) {
            alert('Please select your role before signing in.');
            return;
        }

     
        const username = $('input[type="text"]').val();
        const password = $('input[type="password"]').val();

       
        if (username && password) {

            if (selectedRole === 'client') {
                window.location.href = 'page.html';
            } else if (selectedRole === 'engineer') {
                window.location.href = 'eng.html';
            }
        } else {
            alert('Please enter both username and password.');
        }
    });


    $('.remember input').on('change', function() {
        if ($(this).is(':checked')) {
           
            const username = $('input[type="text"]').val();
            localStorage.setItem('rememberedUsername', username);
        } else {
            localStorage.removeItem('rememberedUsername');
        }
    });


    const rememberedUsername = localStorage.getItem('rememberedUsername');
    if (rememberedUsername) {
        $('input[type="text"]').val(rememberedUsername);
        $('.remember input').prop('checked', true);
    }
});
