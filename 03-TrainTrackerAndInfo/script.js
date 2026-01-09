document.addEventListener('DOMContentLoaded', function(){
    const trainNumberInput = document.getElementById('trainnuminput');
    const journeyDateInput = document.getElementById('dateinput');
    const LiveInfo = document.getElementById('getliveinfo');
    const displayInfo = document.getElementById('infodisplay');
    const errorDisplay = document.getElementById('error');
    let stationArray = [];
    const routeTable = document.getElementById('trainRouteTable');
    const trainDetails = document.getElementById('trainData');
    const loading = document.getElementById('loading');
    let currentStation;
    let dataSet;

    LiveInfo.addEventListener('click', async function(){

        trainData.innerHTML = '';
        routeTable.innerHTML = '';
        errorDisplay.classList.add('hidden');

        let trainNumber = trainNumberInput.value.trim().toString();
        let journeyDate = journeyDateInput.value.trim().toString();
        if(trainNumber.value == '' || journeyDate.value == ''){
            showError(0);
        }
        else{

            loading.innerHTML = `<img id="engine" src="rail.webp" width="192"
    style="
                 display: block;
                 margin-top: 57px;
                 animation: spin 20s linear infinite;

  " />`;

            try{
                let data = await getLiveInfo(trainNumber,journeyDate);
                loading.innerHTML = ``
                displayLiveInfo(data);

            }
            catch(err){
                console.log(err);

                showError(Number(err));
            }

        }
    })

    async function getLiveInfo(trainNumber,journeyDate){
        let url = `https://railradar.in/api/v1/trains/${trainNumber}?journeyDate=${journeyDate}&dataType=full&dataProvider=railradar`;
        const response = await fetch(url);
        if (!response.ok) {
            throw response.status;
        }
        return response.json();

    }

    function displayLiveInfo(response){
        const currentStationCode = response.data.liveData.currentLocation.stationCode;

        dataSet = response;
        response.data.route.forEach(route => {
            stationArray.push(route.stationName);
        })
        response.data.route.forEach(route => {
            if(route.stationCode == currentStationCode){
                currentStation = route.stationName;           }
        })
        renderLiveInfo(dataSet);

    }

    function codeToName(code) {
        for (const route of dataSet.data.route) {
            if (code === route.stationCode) {
                return route.stationName;
            }
        }
    }


    function unixToLocaleString(unixTime) {
        return new Date(unixTime * 1000).toLocaleString();
    }


    function renderLiveInfo(dataSet) {
        console.log(dataSet);

        errorDisplay.classList.add('hidden');
        displayInfo.classList.remove('hidden');
        const runningDays = dataSet.data.train.runningDays.days.join(", ");

        trainData.innerHTML = `
    <p class="font-bold">Train Number: ${dataSet.data.train.trainNumber}</p>
    <p class="font-bold">Train Name: ${dataSet.data.train.trainName}</p>
    <p class="flex flex-col font-bold items-center">
        Running Days - 
        <span class="text-lime-500">${runningDays}</span></p>
        <p class="font-bold">Current Location: ${currentStation}</p>
    <p class="font-bold">Current Status: ${dataSet.data.liveData.currentLocation.status}</p>
`;

        dataSet.data.liveData.route.forEach(route => {
            const name = codeToName(route.stationCode)
            const code = route.stationCode;
            for (const station of dataSet.data.route) {
                if (code === station.stationCode){
                    if (station.isHalt == 1){
                        const tr = document.createElement('tr');
                        tr.dataset.sequence = route.sequence;


                        tr.innerHTML = `<td id="betweenStations">&#9660;</td> 
            <td>${name}</td> 
            <td>${route.platform}</td>`;
                        routeTable.appendChild(tr);
                    }
                }

            }

        });
    }

    routeTable.addEventListener('click', function (e) {

        if (e.target.id !== 'betweenStations') return;

        const clickedRow = e.target.closest('tr');
        const nextRow = clickedRow.nextElementSibling;


        if (nextRow && nextRow.classList.contains('intermediate-row')) {

            // remove all intermediate rows below
            let row = nextRow;
            while (row && row.classList.contains('intermediate-row')) {
                const toRemove = row;
                row = row.nextElementSibling;
                toRemove.remove();
            }

            // change arrow back to ▼
            clickedRow.children[0].innerHTML = '&#9660;';
            return;
        }


        clickedRow.children[0].innerHTML = '&#9650;';

        const clickedSeq = Number(clickedRow.dataset.sequence);
        let stationsBetween = [];
        let start = false;

        for (const station of dataSet.data.route) {

            if (station.sequence === clickedSeq) {
                start = true;
                continue;
            }

            if (start && station.isHalt === 1) break;

            if (start && station.isHalt === 0) {
                stationsBetween.push(station);
            }
        }

        // render intermediate row
        let insertAfter = clickedRow;
        stationsBetween.forEach(st => {
            const tr = document.createElement('tr');
            tr.classList.add('intermediate-row');
            tr.innerHTML = `
            <td></td>
            <td class="pl-6 text-gray-400">${st.stationName}</td>
            <td>-</td>
        `;
            insertAfter.after(tr);
            insertAfter = tr;
        });
    });




    function showError(code){
        displayInfo.classList.add('hidden');
        errorDisplay.classList.remove('hidden');
        loading.innerHTML = ``

        if (code === 0) {
            errorDisplay.textContent = "Please enter train number and date.";
        }
        else if (code === 404) {
            errorDisplay.textContent = "Train not found or invalid details.";
        }
        else {
            errorDisplay.textContent = "Something went wrong. Try again.";
        }
    }
















})