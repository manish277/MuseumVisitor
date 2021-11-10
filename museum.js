const axios = require('axios');

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
let musiumApi = 'https://data.lacity.org/resource/trxm-jn3c.json' // api for getting data 
let museumData;

// function for getting all museum data from url
async function getmuseumData() {
    try {
        const response = await axios.get(musiumApi); // calling axios for getting data from api url
        museumData = response.data
    } catch (error) {
        console.error(error);
    }
}

async function calculateVisitors(queryData) {  // new json object create from old date after calculation  
    let returnResponse = {};
    await getmuseumData(); // calling of gett museum

    museumData.forEach(element => {
        // condition for getting one object which match with given timestamp and object date 
        if (new Date(element.month).getTime() == Number(queryData.date)) {
            let getMonthFromTimeStamp = new Date(element.month).getMonth()
            let getFullYearFromTimeStamp = new Date(element.month).getFullYear();
            delete element.month;
            let arr = Object.values(element);
            let min = Math.min(...arr); // max visitor
            let max = Math.max(...arr); // min visitor
            if (queryData.ignore) { // when there is ignored data will send from api this block of code will execute
                let total = Object.values(element).reduce((a, b) => Number(a) + Number(b))
                returnResponse.attendance = {
                    month: monthNames[getMonthFromTimeStamp], // getting month from numeric month value
                    year: getFullYearFromTimeStamp,
                    highest: {
                        museum: Object.keys(element).reduce((a, b) => Number(element[a]) > Number(element[b]) ? a : b),
                        visitor: max
                    },
                    lowest: {
                        museum: Object.keys(element).reduce((a, b) => Number(element[a]) < Number(element[b]) ? a : b),
                        visitor: min
                    },
                    ignored: { museum: queryData.ignore, visitor: element[queryData.ignore] },
                    total: total - Number(element[queryData.ignore]),


                }
            } else {
                returnResponse.attendance = {
                    month: monthNames[getMonthFromTimeStamp],
                    year: getFullYearFromTimeStamp,
                    highest: {
                        museum: Object.keys(element).reduce((a, b) => Number(element[a]) > Number(element[b]) ? a : b),
                        visitor: max
                    },
                    lowest: {
                        museum: Object.keys(element).reduce((a, b) => Number(element[a]) < Number(element[b]) ? a : b),
                        visitor: min
                    },
                    total: Object.values(element).reduce((a, b) => Number(a) + Number(b))

                }
            }
        }
    });

    return returnResponse
}
module.exports = {
    calculateVisitors,
    getmuseumData,
    musiumApi
}