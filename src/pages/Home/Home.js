import React from 'react';
import './Home.scss';
import { Grid} from 'semantic-ui-react';
import Feed from '../../components/Home/Feed';

export default function Home (props) {

  
    return (
        <Grid className='home'>
            <Grid.Column className='home__left' width={11} >
                <Feed />
            </Grid.Column>
            <Grid.Column className='home__right' width={5} >
                 Usuarios no seguidos
            </Grid.Column>
        </Grid>
    )
}

