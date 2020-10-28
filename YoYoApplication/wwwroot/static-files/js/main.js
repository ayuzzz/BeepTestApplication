var basedata = null;
var playerData = null;
var testEnded = false;
var testStarted = false;
var totalTime = 0;
var accumulatedShuttleDistance = 0;
var shuttleTime = 0;
var currentIteration = 0;
var currentSpeedLevel = 0;
var currentShuttleNo = 0;
var currentSpeed = 0;
var nextShuttleIn = 0;
var playersRemaining = 14;
var overAllTimer = 0;
var totalLocalTime = 0;
var toggleTime = 0;
var allScoreOptions = [];
var timerArray = [];

window.addEventListener("load", activitiesOnLoad);

async function activitiesOnLoad() {
    basedata = await getBasedata();
    playerData = await getPlayerData();

    document.getElementById("countdown").addEventListener("click", toggleAnim);
    setupPlayerData();
}

function setupPlayerData() {
    var allPlayerDetailsElement = document.getElementById('atheletes-details');

    for (var i = 0; i < playerData.length; i = i + 1) {
        var playerDataElement = document.createElement('div');
        playerDataElement.classList.add('row');
        playerDataElement.id = 'athelete-details';

        playerDataElement.innerHTML =
            `<div class="col-md-8">`
            + `<h6> ${i + 1}. ${playerData[i]['name'].toString()}</h6>`
            + `</div>`
            + `<div class="col-md-2">`
            + `<button id="warn-button" onclick="warnOrStop(this)" class="btn btn-sm warn-button">Warn</button>`
            + `</div>`
            + `<div class="col-md-2">`
            + `<button onclick="warnOrStop(this)" class="btn btn-sm stop-button">Stop</button>`
            + `</div>`;

        allPlayerDetailsElement.getElementsByTagName('div')[0].appendChild(playerDataElement);

        var rowSeperator = document.createElement('hr');
        rowSeperator.classList.add('gray-hr');
        allPlayerDetailsElement.getElementsByTagName('div')[0].appendChild(rowSeperator);
    }
}

function toggleAnim(currentIteration) {

    if ((typeof (currentIteration) != typeof (Number) && testStarted == false)) {
        startTest();
    }
}

function startTest() {
    document.documentElement.style.setProperty('--atime', timeInSeconds(basedata[basedata.length - 1]['commulativeTime']).toString() + 's');
    document.getElementById('circle-strokes').style.setProperty('animation', 'countdown var(--atime) linear forwards');
    document.getElementById('circle-strokes').style.setProperty('stroke-width', '9px');

    var playButtonElement = document.getElementById('play-button');
    playButtonElement.remove();

    updateShuttleDetails();

    var countdownNumber = document.getElementById('countdown-number');
    var para = document.createElement("P");
    para.id = 'countdown-text';
    para.innerHTML = `Level ${currentSpeedLevel.toString()} <br> Shuttle ${currentShuttleNo.toString()} <br> ${currentSpeed.toString()} km/h`;
    countdownNumber.appendChild(para);

    var countDownText = document.getElementById('countdown-text');
    countDownText.style.setProperty('visibility', 'visible');
    testStarted = true;

    testProgress();
}

function updateShuttleDetails() {
    currentSpeedLevel = basedata[currentIteration]['speedLevel'];
    currentShuttleNo = basedata[currentIteration]['shuttleNo'];
    currentSpeed = basedata[currentIteration]['speed'];

    cumulativeTime = basedata[currentIteration]['commulativeTime'];
    nextShuttleIn = timeInSeconds(cumulativeTime) - totalTime;

    var nextShuttleInElement = document.getElementById('next-shuttle');
    var totalTimeElement = document.getElementById('total-time');
    nextShuttleInElement.innerHTML = `${timeInMinutesAndSeconds(nextShuttleIn)} s`;
    totalTimeElement.innerHTML = `${timeInMinutesAndSeconds(totalTime)} m`;

}

function testProgress() {
    while (testStarted && (currentIteration < basedata.length)) {
        allScoreOptions.push(determineScore(currentIteration));
        var cumulativeShuttleTime = timeInSeconds(basedata[currentIteration]['commulativeTime']);
        triggerTimer(cumulativeShuttleTime, currentIteration);
        currentIteration = currentIteration + 1;
    }

    testEnded = true;
}

function triggerTimer(cumulativeShuttleTime, currentIteration) {
    var totalSeconds = cumulativeShuttleTime - totalLocalTime;
    for (var i = 0; i < totalSeconds; i++) {
        totalLocalTime = totalLocalTime + 1;
        overAllTimer = overAllTimer + 1000;
        var timeout = setTimeout((function () {

            if (totalTime <= cumulativeShuttleTime) {
                totalTime = totalTime + 1;
                updateAllValues(timeout, currentIteration);
            }
        }), overAllTimer);

        timerArray.push(timeout);
    }
}

function updateAllValues(timeout, currentIteration) {
    try {


        currentSpeedLevel = basedata[currentIteration]['speedLevel'];
        currentShuttleNo = basedata[currentIteration]['shuttleNo'];
        currentSpeed = basedata[currentIteration]['speed'];
        cumulativeTime = basedata[currentIteration]['commulativeTime'];
        nextShuttleIn = timeInSeconds(cumulativeTime) - totalTime;
        if (currentIteration > 0)
            accumulatedShuttleDistance = basedata[currentIteration - 1]['accumulatedShuttleDistance'];

        var countdownText = document.getElementById('countdown-text');
        countdownText.innerHTML = `Level ${currentSpeedLevel.toString()} <br> Shuttle ${currentShuttleNo.toString()} <br> ${currentSpeed.toString()} km/h`;

        var nextShuttleInElement = document.getElementById('next-shuttle');
        var totalTimeElement = document.getElementById('total-time');
        var totalDistanceElement = document.getElementById('total-distance');

        nextShuttleInElement.innerHTML = `${timeInMinutesAndSeconds(nextShuttleIn)} s`;
        totalTimeElement.innerHTML = `${timeInMinutesAndSeconds(totalTime)} m`;
        totalDistanceElement.innerHTML = `${accumulatedShuttleDistance} m`;

    }
    catch (ex) {
        console.log(ex);
    }
}

function timeInSeconds(minutesSeconds) {
    try {
        var parts = minutesSeconds.split(":");
        var minutes = parseInt(parts[0]);
        var seconds = parseInt(parts[1]);

        var seconds = seconds + minutes * 60;
        return seconds;
    }
    catch (ex) {
        console.log(ex.message);
    }

}

function timeInMinutesAndSeconds(seconds) {
    var minutes = parseInt(seconds / 60);
    var sec = seconds % 60;

    var minSeconds = minutes.toString() + ":" + sec.toString();
    return minSeconds;
}

function warnOrStop(element) {

    if (testStarted) {
        if (element.innerHTML === "Warn") {
            element.classList.remove('warn-button');
            element.classList.add('warned-button');
            element.innerHTML = 'Warned';
        }
        else if (element.innerHTML === "Warned" || element.innerHTML === "Stop") {
            stopTestForPlayer(element);
        }
    }
    else {
        alert("Please start the test first !!");
    }
}

function stopTestForPlayer(element) {
    var playerElement = element.parentNode.parentNode;
    var score = determineScore();

    playerElement.getElementsByTagName('div')[1].remove();
    playerElement.getElementsByTagName('div')[1].remove();

    var newDivElement = document.createElement('div');
    newDivElement.classList.add('col-md-4', 'pull-right');
    newDivElement.style.setProperty('text-align', 'end');

    var scoreElementForPlayer = document.createElement("select");
    scoreElementForPlayer.classList.add('form-control-sm');
    scoreElementForPlayer.classList.add('select-score');

    for (var i = 0; i < allScoreOptions.length; i = i + 1) {
        var option = document.createElement("option");
        option.innerText = allScoreOptions[i];

        if (allScoreOptions[i] === score) {
            option.selected = true;
        }

        scoreElementForPlayer.appendChild(option);
    }

    newDivElement.appendChild(scoreElementForPlayer);
    playerElement.appendChild(newDivElement);

    playersRemaining = playersRemaining - 1;

    if (playersRemaining === 0) {
        for (var i = 0; i < timerArray.length; i++) {
            clearTimeout(timerArray[i]);
        }

        document.getElementById('countdown-text').innerHTML = 'Test<br>Completed';
        document.getElementById('countdown-text').style.setProperty('color', 'lightcoral');

        document.getElementById('circle-strokes').style.removeProperty('animation');
        var shuttleDetailsElement = document.getElementById('shuttle-details');

        while (shuttleDetailsElement.firstChild) {
            shuttleDetailsElement.removeChild(shuttleDetailsElement.firstChild);
        }

        var viewDetailsButton = document.createElement('button');
        viewDetailsButton.id = 'view-details';
        viewDetailsButton.classList.add('btn', 'btn-primary');
        viewDetailsButton.innerHTML = 'View results';
        document.getElementById('shuttle-details').append(viewDetailsButton);
    }
}

function determineScore(currentIteration) {
    var score = 0;

    if ((typeof currentIteration === "undefined"))
        score = currentSpeedLevel.toString() + "-" + currentShuttleNo.toString();
    else {
        score = basedata[currentIteration]['speedLevel'].toString() + "-" + basedata[currentIteration]['shuttleNo'].toString();
    }

    return score;
}