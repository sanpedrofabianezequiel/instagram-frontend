import React from 'react';
import {Container} from 'semantic-ui-react';
import Header from '../components/Header';



export default function LayoutBasic (props){
    //This props contained all the information aboout his children. In this case the children were the Component
    //console.log(props)

    return (
        <>
            <Header />
            <Container className="layout-clasic">
                {props.children}
            </Container>
        </>
    );
}