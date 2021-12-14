
import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import routes from './routes';
import {map} from 'lodash';


export default function Navigation () {
    return (
        <Router>
            <Switch>
                {map( routes ,(item, index)=>(
                    <Route  key={index} path={item.path} exact={item.exact} 
                        render={
                            (props)=>(
                                <item.layout>
                                    <item.component {...props} />
                                </item.layout>
                            )
                        }
                    />
                ))}
            </Switch>
        </Router>
    )
}


/*
     <Switch>
        {map( routes ,(item, index)=>(
            <Route  key={index} path={item.path} exact={item.exact} render={ (props) => <item.component {...props}/> } />
        ))}
    </Switch>

*/