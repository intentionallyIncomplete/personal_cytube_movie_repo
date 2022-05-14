// ==UserScript==
// @name         Cinema Mode Test
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://cytu.be/r/quiglys_movie_repo
// @match        https://cytu.be/r/Badmovies_Marathon
// @icon         https://www.google.com/s2/favicons?sz=64&domain=cytu.be
// @grant        none
// ==/UserScript==

let messageChats = document.getElementById("messagebuffer");
let listOfUsersLoggedIn = document.getElementById("userlist");
let EMOTELISTMODAL = document.getElementById("emotelist");
let chatHeaderRow = document.getElementById("chatheader");
let movedDrinkWrap = document.getElementById("drinkbarwrap");
let navBarSmall = document.getElementsByClassName("navbar-nav");

let rmLoginChat = messageChats.addEventListener('DOMNodeInserted', removeLoginText, false);


function removeLoginText (event){
    if(event.target.getElementsByClassName("server-whisper").length > 0) {
       console.log("Deleting login message..." + event.target.className);
       setTimeout(function(){
           event.target.style.display = "none";
       }, 7000);
      }
}

function pickWinnerFromUserList() {

}

function moveDrinkCount(){
    navBarSmall[0].appendChild(movedDrinkWrap);
    movedDrinkWrap.className = "drinkWrapToggle";
    // now can add the appending of class?
}

function moveEmoteListButton() {
    const movedEmoteButton = document.createElement("button");
    movedEmoteButton.innerHTML = "Emote List";
    movedEmoteButton.className = "btn btn-sm btn-default";
    movedEmoteButton.id = "emotelistbtn newemotebtn";
    movedEmoteButton.setAttribute("onclick", "EMOTELISTMODAL.modal();");
    chatHeaderRow.appendChild(movedEmoteButton);
}

(function() {
    const css = document.createElement("link");
    css.type = "text/css";
    css.rel = "stylesheet";
    // For testing
    css.href = "https://raw.githack.com/intentionallyIncomplete/personal_cytube_movie_repo/master/theater_mode.css";
    // For production
    // css.href = "https://rawcdn.githack.com/intentionallyIncomplete/personal_cytube_movie_repo/1c90bb89b0d46b5c87d012c00560e484b37ab5a6/theater_mode.css?min=1";

    let enabled = false;

    const toggle = function() {
        if (enabled) {
            $('#chatwrap').addClass('col-lg-5 col-md-5');
            $('#videowrap').addClass('col-lg-7 col-md-7');
            $(css).remove();
            // This is a work around for now. The issue of the #chatwrap stretching vertically is still present.
            location.replace(location.href);
        } else {
            $('#chatwrap').removeClass('col-lg-5 col-md-5');
            $('#videowrap').removeClass('col-lg-7 col-md-7');
            $("head link[rel='stylesheet']")
                .last()
                .after(css);
            moveEmoteListButton();
        }
        enabled = !enabled;
    };

    $(document).ready(function(){
        $('nav.navbar a[href="#"][onclick]')
            .parent()
            .parent()
            .append($('<li>').append($('<a>').attr('href', 'javascript:void(0)')
            .on('click', toggle)
            .text("Toggle Theater View")))
    });
})();