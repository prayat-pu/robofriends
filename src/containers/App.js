import {Component} from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';
import ErrorBoundary from '../components/ErrorBoundary';




class App extends Component{
    constructor() {
        super()
        this.state = {
            robots:[],
            searchfield:''
        }

        console.log("constructer")
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response=>{
            return response.json();
        }).then(robot=>{
            this.setState(
                    { robots:robot }
                )
        })
        console.log("componentDidMount")
    }

    onSearchChange = (event)=>{
        // console.log(event.target.value);
        this.setState({searchfield:event.target.value})
        // console.log(robots[0].name)
    }

    render(){
        const {robots,searchfield} = this.state;
        const filteredRobots = robots.filter(robot=>{
            return robot.name.toLowerCase().includes(searchfield.toLowerCase())})
        console.log("render")

        if(!robots.length){
            return <h1 className="tc">Loading page</h1>
        }else{
            return (
                <div className='tc'>
                    <h1 className='f2'>RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange}/>
                    <Scroll>
                        <ErrorBoundary>
                            <CardList robots = {filteredRobots} /> 
                        </ErrorBoundary>
                    </Scroll>
                </div>
                );
        }
    }   
}


export default App;
