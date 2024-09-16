import ReactGA from 'react-ga4';

const RouteChange = ({route, title}) => {
    ReactGA.send({ 
        hitType: "pageview", 
        page: {route}, 
        title: {title} 
    });
}

export default RouteChange