document.addEventListener('DOMContentLoaded', function(){
    const buttonHome = document.querySelector(".home");
    const buttonProfile = document.querySelector(".profile");
    
    buttonHome.addEventListener("click", homeClicked);
    buttonProfile.addEventListener("click", profileClicked);
    
    function homeClicked(){
        window.location.href = "../../html/general-components/home-login.html";
    }

    function profileClicked(){
        window.location.href = "../../html/general-components/album_visualization.html"
    }
});
