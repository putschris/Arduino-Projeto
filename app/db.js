let db = require("mssql");
let config = {
    user: "bandtec",
    password: "!Vini123",
    server: "bdtestesvini.database.windows.net",
    database: "TwitterClone",
    options: {
        encrypt: true
    }
}

function SQLQuery(queryLine)
{
    if(global.conn)
    {
        return global.conn.request().
        query(queryLine).
        then(results => {
            return results.recordset;
        })
        .catch(err => {
            console.log(err);
        })
    }
    else
    {
        return db.connect(config)
            .then(conn => {
                global.conn = conn;
                return global.conn.request().query(queryLine);
            })
            .then(results => {
                return results.recordset;
            })
            .catch(err =>{
                console.log(err);
            });
    }
}

module.exports.Arduino = {
    insertMeasurement: (measurement) => 
    {
        // console.log(measurement);
        
        return SQLQuery(`insert into Measurements values(${measurement.temp}, ${measurement.umi}, ${measurement.co2}, ${measurement.arduino}, '${measurement.d}','${measurement.h}')`);
    },
    getAllMeasurement: () => {
        return SQLQuery(`select temperatura, umidade, co2, Arduino_SerieBox from Measurements inner join Arduino on Measurements.Arduino_SerieBox = Arduino.serieBox`);
    },
    getAllArduinos: () => {
        return SQLQuery(`select serieBox from Arduino`);
    }
}