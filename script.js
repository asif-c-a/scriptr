var scenes = [];
var allCharacters = [];
var currentScene = 0;

var script = []; // Each line is stored here
var scriptper = []; // Who said each line is stored here
var characters = []; // Each character name is stored here
var charactersAbb = []; // Character name abbreviations are stored here

var selectedCharacterIndex = -1;
var enterType = "Enter"; //Or "Edit"

var inputButton = document.querySelector(".input-dialog button")
var dialogInput = document.querySelector(".input-dialog textarea");
var scriptDisplay = document.querySelector(".script-area .script-dialog");
var characterDisplay = document.querySelector(".input-area .input-character");

var newSceneMenu = document.querySelector(".new-scene-popup");
var popupDarken = document.querySelector(".popup-darken");

closeNewSceneMenu();
updateScenes();
updateScenesTab();
updateScript();
updateCharacter();

function setSceneName(index) {
	document.querySelector(".scene-name").innerHTML = scenes[index];
}

function addCharacter()
{
	var characterName = dialogInput.value;

	if(characterName == '')
		return;

	characters.push(characterName)

	var i = 0;
	var abb = characterName[0];

	while(charactersAbb.includes(abb))
	{
		++i;
		abb += characterName[i]
	}

	charactersAbb.push(abb);
	dialogInput.value = "";

	updateCharacter();
}

function updateCharacter()
{
	characterDisplay.innerHTML = "";

	for (let i = 0; i < characters.length; i++) {
		var characterLetter = charactersAbb[i];
		characterDisplay.innerHTML += "<button class='character-select' id='character-" + i + "' onclick='selectCharacter(" + i + ");'><div class='character-abbr'>" + characterLetter + "</div><div class='character-name'>" + characters[i] + "</div></button>";
	}

	characterDisplay.innerHTML += "<button class='character-select rounded' onclick='addCharacter()'>+</button>";
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

	storeData();
	updateScript();
	updateCharacterSelection();
}

function updateEditDialog(index)
{
	script[index] = dialogInput.value;
	dialogInput.value = "";
	storeData();
	updateScript();
	updateCharacterSelection();
}

function updateScript()
{
	rememberData();

	scriptDisplay.innerHTML = "";
	for (let i = 0; i < script.length; i++) {
		
		if(scriptper[i] != -1){
			scriptDisplay.innerHTML += "<div class='dialog'><div class='character-name'>" + characters[scriptper[i]] + "</div><div class='dialog-text'>" + script[i] + 
			"<div class='dialog-buttonholder'><button class='dialog-button delete' onclick='deleteDialog(" + i + ")'><svg xmlns='www.w3.org/2000/svg' height='12px' viewBox='0 -960 960 960' width='12px' fill='#e3e3e3'><path d='M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z'/></svg></button><button class='dialog-button edit' onclick='editDialog(" + i + ")'><svg xmlns='www.w3.org/2000/svg' height='12px' viewBox='0 -960 960 960' width='12px' fill='#e3e3e3'><path d='M216-216h51l375-375-51-51-375 375v51Zm-72 72v-153l498-498q11-11 23.84-16 12.83-5 27-5 14.16 0 27.16 5t24 16l51 51q11 11 16 24t5 26.54q0 14.45-5.02 27.54T795-642L297-144H144Zm600-549-51-51 51 51Zm-127.95 76.95L591-642l51 51-25.95-25.05Z'/></svg></button></div></div></div>"
		}else{
			scriptDisplay.innerHTML += "<div class='dialog'><div class='dialog-action'>" + script[i] + 
			"<div class='dialog-buttonholder'><button class='dialog-button delete' onclick='deleteDialog(" + i + ")'><svg xmlns='www.w3.org/2000/svg' height='12px' viewBox='0 -960 960 960' width='12px' fill='#e3e3e3'><path d='M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z'/></svg></button><button class='dialog-button edit' onclick='editDialog(" + i + ")'><svg xmlns='www.w3.org/2000/svg' height='12px' viewBox='0 -960 960 960' width='12px' fill='#e3e3e3'><path d='M216-216h51l375-375-51-51-375 375v51Zm-72 72v-153l498-498q11-11 23.84-16 12.83-5 27-5 14.16 0 27.16 5t24 16l51 51q11 11 16 24t5 26.54q0 14.45-5.02 27.54T795-642L297-144H144Zm600-549-51-51 51 51Zm-127.95 76.95L591-642l51 51-25.95-25.05Z'/></svg></button></div></div></div>"
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

		updateCharacterSelection();
		
	}else{
		selectedCharacterIndex = -1;
		charButton = document.getElementById("character-" + index);
		charButton.classList.remove('selected');
	}
}

function updateCharacterSelection()
{
	for (let i = 0; i < characters.length; i++) {
			charButton = document.getElementById("character-" + i);

			if (selectedCharacterIndex != i)
			{
				charButton.classList.remove('selected');
			}
		}
}

function storeData()
{
	var scriptData = [];
	scriptData.push(script, scriptper, characters, charactersAbb);

	var dataName = scenes[currentScene];
	localStorage.setItem(dataName, JSON.stringify(scriptData));
}

function rememberData()
{
	var dataName = scenes[currentScene];

	if (localStorage.getItem(dataName) != null)
	{
		var scriptData = JSON.parse(localStorage.getItem(dataName));
		
		if(scriptData[0] != null && scriptData[1] != null && scriptData[2] != null && scriptData[3] != null)
		{
			script = scriptData[0];
			scriptper = scriptData[1];
			characters = scriptData[2];
			charactersAbb = scriptData[3];
		}else{
			script = [];
			scriptper = [];
			characters = [];
			charactersAbb = [];
		}
	}else{
		script = [];
		scriptper = [];
		characters = [];
		charactersAbb = [];
	}
}

var edittingIndex = -1;

function inputButtonFunction()
{
	if (enterType == "Enter")
	{
		addDialogue();
	}

	if(enterType == "Edit"){
		enterType = "Enter";
		inputButton.innerHTML = "ENTER";
		updateEditDialog(edittingIndex);
	}
}

function editDialog(index)
{
	enterType = "Edit";
	inputButton.innerHTML = "EDIT";
	edittingIndex = index;
	dialogInput.value = script[index];
}

function deleteDialog(index)
{
	if(script[index] != null && scriptper[index] != null)
	{

		var tempScript = script;
		var firstHalf = tempScript.slice(0, index);
		var secondHalf = tempScript.slice(index, tempScript.length); 
		secondHalf.shift();

		if(secondHalf[0] != undefined)
		{   
			tempScript = firstHalf.concat(secondHalf);
			script = tempScript;
		}else{
			tempScript = firstHalf;
			script = tempScript;
		}

		var tempScriptper = scriptper;
		var firstHalfper = tempScriptper.slice(0, index);
		var secondHalfper = tempScriptper.slice(index, tempScriptper.length); 
		secondHalfper.shift();

		if(secondHalfper[0] != undefined)
		{   
			tempScriptper = firstHalfper.concat(secondHalfper);
			scriptper = tempScriptper;
		}else{
			tempScriptper = firstHalfper;
			scriptper = tempScriptper;
		}

		tempScriptper = firstHalfper.concat(secondHalfper);
		scriptper = tempScriptper;
	}

	storeData();
	updateScript();
}

document.addEventListener("keydown", function(event) {
	if(event.key == '`')
		clearData();
});

function clearData()
{
	alert("Clearing...");
	localStorage.clear();
	
	console.log("Test");
	updateScenes();
	console.log("Test");
	updateScenesTab();
	console.log("Test");
	updateScript();
	console.log("Test");
	updateCharacter();
}

function storeScenes()
{	
	var exportScenes = JSON.stringify(scenes);
	localStorage.setItem("scenes", exportScenes);
}

function updateScenes()
{
	if (localStorage.getItem('scenes') != null)
	{
		var importScenes = JSON.parse(localStorage.getItem('scenes'));
		scenes = importScenes;
	}else{
		scenes = []
	}
}

function updateScenesTab()
{
	var sceneTab = document.querySelector(".navbar-scenes .scenes-holder");
	sceneTab.innerHTML = "";

	console.log(scenes);

	for (let i = 0; i < scenes.length; i++) {
		var sceneButton = '<button class="scene-button" onclick="openScene(' + i + ');">' + scenes[i] + '</button>';
		sceneTab.innerHTML += sceneButton;
	}

	sceneTab.innerHTML += '<button class="scene-button" onclick="openNewSceneMenu();">New Scene +</button>';
}

function openScene(index)
{
	currentScene = index;
	setSceneName(index);

	closeNewSceneMenu();
	updateScenes();
	updateScenesTab();
	updateScript();
	updateCharacter();
}

function newScene()
{
	var newSceneName = document.querySelector(".new-scene-popup .scene-details input");
	scenes.push(newSceneName.value);
	newSceneName.value = "";
	storeScenes();
	updateScenesTab();
	closeNewSceneMenu();
}

function closeNewSceneMenu()
{
	newSceneMenu.style.display = "none";
	popupDarken.style.display = "none";
}

function openNewSceneMenu() {
	newSceneMenu.style.display = "flex";
	popupDarken.style.display = "inherit";
}