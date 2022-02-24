import fetch from 'cross-fetch';

function getPath(start : string, end : string){
    try {
        fetch(`https://api.openrouteservice.org/v2/directions/driving-car?api_key=${process.env.OPEN_ROUTE_API_KEY}`, {
            method: 'POST',
            body: JSON.stringify(`{"coordinates":[[${start}],[${end}]]}`),
            //headers: { 'Content-Type': 'application/json' }

        })
        .then(res => {
            console.log(res.body);
            return(res.body);
        })
    } catch (error) {
        console.log(error);
    };
}

export { getPath };