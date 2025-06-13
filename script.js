
var script = []; // Each line is stored here
var scriptper = []; // Who said each line is stored here
var characters = []; // Each character name is stored here
var charactersAbb = []; // Character name abbreviations are stored here

var selectedCharacterIndex = -1;
var dialogInput = document.querySelector(".input-dialog textarea");
var scriptDisplay = document.querySelector(".script-area .script-dialog");
var characterDisplay = document.querySelector(".input-area .input-character");

updateScript();
updateCharacter();

function addCharacter()
{
    var characterName = dialogInput.value;

    if(characterName == '')
        return;

    characters.push(characterName);

    var i = 0;
    var abb = characterName[0];

    while(charactersAbb.includes(abb))
    {
        i++;
        abb += characterName[i]
    }

    charactersAbb.push(abb);
    dialogInput.value = "";

    updateCharacter();
}

function updateCharacter()
{
    characterDisplay.innerHTML = "<button class='character-select rounded' onclick='addCharacter()'>+</button>";

    for (let i = 0; i < characters.length; i++) {
        var characterLetter = charactersAbb[i];
        characterDisplay.innerHTML += "<button class='character-select' id='character-" + i + "' onclick='selectCharacter(" + i + ");'>" + characterLetter + "</button>";
    }
}

function addDialogue()
{
    var dialog = dialogInput.value;
    if(dialog == '')
        return;

    script.push(dialog);
    scriptper.push(selectedCharacterIndex);
    selectedCharacterIndex = -1;
    dialogInput.value = "";

    //storeData();
    updateScript();
}

function updateScript()
{
    //rememberData();

    //scriptDisplay.innerHTML = "";
    for (let i = 0; i < script.length; i++) {
        
        if(scriptper[i] != -1){
            scriptDisplay.innerHTML += "<div class='dialog'><div class='character-name'>" + characters[scriptper[i]] + "</div><div class='dialog-text'>" + script[i] + "</div></div>"
        }else{
            scriptDisplay.innerHTML += "<div class='dialog'><div class='dialog-action'>" + script[i] + "</div></div>"
        }
    }
}

function selectCharacter(index)
{

    if (selectedCharacterIndex != index)
    {
        selectedCharacterIndex = index;
        charButton = document.getElementById("character-" + index);
        charButton.classList.add('selected');
    }else{
        selectedCharacterIndex = -1;
        charButton = document.getElementById("character-" + index);
        charButton.classList.remove('selected');
    }
}

function storeData()
{
    var scriptData = [];
    scriptData.push(script, scriptper, characters, charactersAbb);

    localStorage.setItem('scriptData', JSON.stringify(scriptData));
}

function rememberData()
{
    var scriptData = JSON.parse(localStorage.getItem('scriptData'));
    
    script = scriptData[0];
    scriptper = scriptData[1];
    characters = scriptData[2];
    charactersAbb = scriptData[3];
}

function editDialog()
{

}

function deleteDialog() 
{

}