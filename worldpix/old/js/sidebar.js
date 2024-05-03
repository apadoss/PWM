/*document.addEventListener('DOMContentLoaded', function(){
    const buttonHome = document.querySelector(".homeTab");
    const buttonProfile = document.querySelector(".profileTab");
    
    buttonHome.addEventListener("click", homeClicked);
    buttonProfile.addEventListener("click", profileClicked);
    
    function homeClicked(){
        buttonProfile.classList.remove('clicked');
        buttonHome.classList.remove('not-clicked')
        buttonHome.classList.add('clicked');
    }

    function profileClicked(){
        buttonProfile.classList.add('clicked');
        buttonHome.classList.add('not-clicked');
    }
});*/

//document.addEventListener('onload', configTabs);

configTabs();

function configTabs() {
    const buttons = document.querySelectorAll(".sidebar-tab");
    
    buttons.forEach(button => {

        button.addEventListener("click", function() {
            // Remove 'clicked' class from all buttons
            buttons.forEach(btn => {
                btn.classList.remove('clicked');
            });
            
            // Add 'clicked' class to the clicked button
            this.classList.add('clicked');
            
            // Remove 'not-clicked' class from all buttons except the clicked one
            buttons.forEach(btn => {
                if (btn !== this) {
                    btn.classList.remove('not-clicked');
                }
            });
        });
    });
}