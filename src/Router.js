import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NewsList from './news/newsList/NewsList';
import NewsDetail from './news/newsDetail/NewsDetail';


const BasicRoute = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={NewsList}/>
            <Route exact path="/edit" component={NewsDetail}/>
        </Switch>
    </Router>
);


export default BasicRoute;