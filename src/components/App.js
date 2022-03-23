import {Component} from 'react';
import Stopwatch from './Stopwatch';
import Countdown from './Countdown';
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showStopwatch: false,
            showCountdown: false
        };
    }
    handleClick = (event) => {
        let id = event.target.id;
        let key = "show" + id.charAt(0).toUpperCase() + id.slice(1);        
        this.setState({
            [key]: !this.state[key]
        });
    }
    render() {
        return (
            <div className="container">
            <h1>🚀 Timers 🚀</h1>
            <div className="flex center">
            {/* Stopwatch */}
            { this.state.showStopwatch ?
            <Stopwatch handleClose={this.handleClick}/> :
            <input type="button" id="stopwatch" value="Show Stopwatch" onClick={(event)=> this.handleClick(event)}/>
            }
            {/* Countdown */}
            { this.state.showCountdown ?
            <Countdown handleClose={this.handleClick}/> :
            <input type="button" id="countdown" value="Show Countdown" onClick={(event)=> this.handleClick(event)}/> 
            }
            </div>
            </div>
        );
    }
}

export default App;