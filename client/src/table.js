import JsonTable from 'react-json-table';
import React from 'react';
import { TacoTable, DataType, Formatters } from 'react-taco-table';
import 'react-taco-table/dist/react-taco-table.css';

const columns = [
  {
    id: 'name',
    type: DataType.String,
    header: 'Name',
  },
  {
    id: 'diameter_max',
    type: DataType.String,
    header: 'Max Diameter',
  },
  {
    id: 'diameter_min',
    type: DataType.String,
    header: 'Min Diameter',
    
  },
  {
    id: 'close_approach_date',
    type: DataType.String,
    header: 'Closest Approach Date',
  },
  {
    id: 'potentially_hazardous',
    type: DataType.String,
    header: 'Potentially Hazardous?',
  },
  {
    id: 'url',
    type: DataType.String,
    header: 'Link',
    
  },
];


export default class Table extends React.Component {
 
  constructor(props) {
    super(props);
    this.state=({itemss:[]});
  }
componentWillMount()
{
var self=this;
const dat='2017-07-21';
fetch("https://api.nasa.gov/neo/rest/v1/feed?start_date="+dat+"&end_date="+dat+"&api_key=pgWVAwOzwqCCZF5iHXxWh2vzTL89ggO0WmYcgP2Z" ) // Call the fetch function passing the url of the API as a parameter
            .then(function (response) {
                if (response.status === 400) {
                   
                }
               return response.json();
            })
            .then(function (body) {
            	console.log(body);
                console.log(body.near_earth_objects[dat]);
                var reformattedObj = body.near_earth_objects[dat].map(function(obj) { 
				   var rObj = {};
				   
				   rObj.name = obj.name;
				   rObj.diameter_max = obj.estimated_diameter.meters.estimated_diameter_max+" meters";
				   rObj.diameter_min = obj.estimated_diameter.meters.estimated_diameter_min+" meters";
				   rObj.close_approach_date = obj.close_approach_data[0].close_approach_date;
				   
				   rObj.potentially_hazardous=  obj.is_potentially_hazardous_asteroid+" ";
				   rObj.url = obj.nasa_jpl_url;
				   return rObj;
				});
				console.log("reformattedObj is ",reformattedObj);
                self.setState({itemss:reformattedObj});
                console.log("self.state.itemss ",self.state.itemss);
            })
}
  render() {
    return (
     <TacoTable columns={columns} data={ this.state.itemss }  />
    );
  }
}



        