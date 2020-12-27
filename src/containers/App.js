import React, {Component} from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
// import { robots } from './robots';
import Scroll from '../components/Scroll'
import ErrorBoundary from '../components/ErrorBoundary'
import './App.css'


class App extends Component {
    constructor() {
        super()
        this.state = {
            robots: [],
            searchfield: ''
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => this.setState({robots: users}));
    }

    onSearchCange = (event) => {
        this.setState({searchfield: event.target.value})
    }

    render() {
        const { robots, searchfield } = this.state;
        const filteRobot = robots.filter(robot => robot.name.toLowerCase().includes(searchfield.toLowerCase()));
        if (!robots.length) {
            return <h1>Loading</h1>
        } else {
            return (
                <div className = 'tc'>
                    <h1 className = 'f1'>RobotFriends</h1>
                    <SearchBox searchChange = {this.onSearchCange}/>
                    <Scroll>
                        <ErrorBoundary>
                            <CardList robots = {filteRobot}/>
                        </ErrorBoundary>
                    </Scroll>
                </div>
            );
        }
    }


}

export default App;