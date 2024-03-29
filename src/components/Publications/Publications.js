import React from 'react';
import './Publications.scss';
import {Grid} from 'semantic-ui-react'
import {map} from 'lodash'
import PreviewPublication from './PreviewPublication';


export default function Publications(props){
    const {getPublications} = props;

    return(

      <div className='publications'>
          <h1>Publicaciones</h1>
          <Grid columns={4}>
                {
                    map(getPublications,(item, index)=>(
                        <Grid.Column key={index}>
                           <PreviewPublication publication={item} />     
                        </Grid.Column>
                    ))
                }
          </Grid>
      </div>  
    )

}