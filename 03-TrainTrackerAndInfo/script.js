document.addEventListener('DOMContentLoaded', function(){
    const trainNumberInput = document.getElementById('trainnuminput');
    const journeyDateInput = document.getElementById('dateinput');
    const LiveInfo = document.getElementById('getliveinfo');
    const displayInfo = document.getElementById('infodisplay');
    const errorDisplay = document.getElementById('error');
    let stationArray = [];
    const routeTable = document.getElementById('trainRouteTable');
    const trainDetails = document.getElementById('trainData');
    let currentStation;
    let dataSet;

    LiveInfo.addEventListener('click', async function(){
        trainData.innerHTML = '';
        routeTable.innerHTML = '';

        let trainNumber = trainNumberInput.value.trim().toString();
        let journeyDate = journeyDateInput.value.trim().toString();
        if(trainNumber.value == '' || journeyDate.value == ''){
            showError(0);
        }
        else{
            try{
                let data = await getLiveInfo(trainNumber,journeyDate);
                displayLiveInfo(data);

            }
            catch(err){
                showError(err);
            }

        }
    })

    async function getLiveInfo(trainNumber,journeyDate){
        let url = `https://railradar.in/api/v1/trains/${trainNumber}?journeyDate=${journeyDate}&dataType=full&dataProvider=railradar`;
        const response = await fetch(url);
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


    function renderLiveInfo(dataSet){

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
            const tr = document.createElement('tr');
            tr.innerHTML = `
            <td>${name}</td>
            <td>${route.platform}</td>
            
            
            `;
            routeTable.appendChild(tr);










        })

    }

    function showError(code){
        displayInfo.classList.add('hidden');
        if (code === 0){
            errorDisplay.classList.remove('hidden');
        }

    }















})