/*!
* Custom Theme Injection by Quigly the Archivist
* This script adds custom theme options to the already existing default ones.
* @preserve
*/

var halloween_theme = "<option value='/custom_themes/halloweenTheme.css'>Halloween</option>"

"use strict";

addThemes() {
  $(".us-theme").appendChild(halloween_theme);
}
