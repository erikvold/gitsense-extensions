"use strict";

// The DOMContentLoaded event is defined at the bottom of this script and is what
// triggers this function.
function load() {
    // Get the locally stored settings.  If nothing is stored
    // locally, the current values that are defined by sdes.config
    // will be used.  Take a look at the js/config.js file to see
    // the default sdes.config values.
    chrome.storage.local.get(sdes.config, update);

    // The save button is defined in the options.html file
    var saveButton = document.getElementById("save-button");

    if ( saveButton === null )
        throw("GitSense: Save button does not exist");

    function update(localConfig) {
        for ( var key in localConfig ) 
            set(key, localConfig[key]);

        function set(key, value) {
            var input = document.getElementById(key+"-input");

            // input == null means the value that is defined by
            // sdes.config.<key> can't be updated
           
            if ( input === null )
                return;

            input.value   = value;
            input.onkeyup = check;
        }

        function check() {
            var same = true;

            for ( var key in localConfig )  {
                var input = document.getElementById(key+"-input");

                if ( input === null )
                    continue;

                if ( input.value.replace(/^\s+|\s+$/, "") === localConfig[key] )
                    continue;

                same = false;
                break;
            }

            if ( same ) {
                saveButton.style.cursor = "default";
                saveButton.disabled     = true;
                saveButton.onclick      = null;
            } else {
                saveButton.style.cursor = "pointer";
                saveButton.disabled     = false;
                saveButton.onclick      = save;
            }
        }

        function save() {
            var newConfig  = {},
                changedUrl = false,
                status     = document.getElementById("save-status");
        
            status.textContent   = "Saving ...";
            status.style.display = null;

            for ( var key in sdes.config ) {
                var input = document.getElementById(key+"-input");
        
                if ( input === null ) {
                    newConfig[key] = sdes.config[key];
                    continue;
                }

                newConfig[key] = input.value.replace(/^\s+|\s+$/, "");

                if ( newConfig[key] !== localConfig[key] && key.match(/url/i) )
                    changedUrl = true;
            }
        
            chrome.storage.local.set(
                newConfig,
                function() {
                    status.textContent = "Saved";
                    document.getElementsByClassName("reminder")[0].style.display = "block";
        
                    setTimeout(
                        function() { 
                            status.textContent   = ""; 
                            status.style.display = "none";
                            saveButton.disabled  = true;
                            update(newConfig);
                        }, 
                        750
                    ); 
                }
            );
        }
    }
}

document.addEventListener("DOMContentLoaded", load);
