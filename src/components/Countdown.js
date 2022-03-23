import {Component} from 'react';
class Countdown extends Component {
    constructor(props) {
        super(props);
        this.initialState = {
            hours: 0,
            minutes: 0,
            seconds: 0,
            showStart: true,
            showStop: false
        };
        this.state = this.initialState;       
        this.setSeconds = null;
    }
    pad = (time) => {
        let { hours, minutes, seconds } = time;
        hours = String(hours).padStart(2, 0);
        minutes = String(minutes).padStart(2, 0);
        seconds = String(seconds).padStart(2, 0);        
        return { hours, minutes, seconds };
      };
      handleIncrement = (event) => {        
        let unit = event.target.id; 
        if(this.state[unit] !== 59) {      
        this.setState((prevState) => {
          return {[unit]: prevState[unit] + 1}
        });} else if(unit === 'minutes'){
          this.setState((prevState) => {
            return({
              hours: prevState.hours + 1,
              minutes: 0
            });
          });
        } else if(unit === 'seconds') {
          if(this.state.minutes !== 59) {
            this.setState((prevState) => {
              return({
                minutes: prevState.minutes + 1,
                seconds: 0
              });
            })
          } else {
            this.setState((prevState) => {
              return({
                hours: prevState.hours + 1,
                minutes: 0,
                seconds: 0
              });
            });
          }
      }
    }
      handleDecrement = (event) => {
        let unit = event.target.id;
        if(this.state[unit] !== 0) {
        this.setState((prevState) => {
          return {[unit]: prevState[unit] - 1}
        })} else if(unit === 'minutes' && this.state.hours !== 0){
          this.setState((prevState) => {
            return({
              hours: prevState.hours - 1,
              minutes: 59
            });
          });
        } else if(unit === 'seconds') {
          if(this.state.minutes !== 0) {
            this.setState((prevState) => {
              return({
                minutes: prevState.minutes -1,
                seconds: 59
              });
            })
          } else if(this.state.hours !== 0) {
            this.setState((prevState) => {
              return({
                hours: prevState.hours - 1,
                minutes: 59,
                seconds: 59
              });
            });
          }
        }
      
      }
      handleCountdown = () => {        
          this.setSeconds = setInterval(() => {
            let {hours, minutes, seconds} = this.state;            
            if(hours === 0 && minutes === 0 && seconds === 0) {              
            this.clearIntervals();
            return alert("Countdown Ended");
          }
            this.setState((prevState) => {
              if(prevState.seconds === 0 && prevState.minutes === 0){
                return {
                  hours: prevState.hours - 1,
                  minutes: 59,
                  seconds: 59,
                }
              } else if(prevState.seconds === 0) {
                return {
                  minutes: prevState.minutes - 1,
                  seconds: 59
                }
              } else
              return {seconds: prevState.seconds - 1}
            });
          }, 1000);
      }
      onStart = () => {
        this.setState({
          showStart: false,
          showStop: true
        });
        this.handleCountdown();
      }
      onStop = () => {
        this.setState({          
          showStop: false
        });
        this.clearIntervals();
      }
      onResume = () => {
        this.setState({          
          showStop: true
        });
        this.handleCountdown();
      }
      onReset = () => {
        this.setState(this.initialState);
      }
      componentWillUnmount = () => {
        this.clearIntervals();
      }
      clearIntervals = () => {       
        clearInterval(this.setSeconds);        
      }
    render() {
        let {hours, minutes, seconds} = this.pad(this.state);
        return (
          <div className="flex column card">
            <h2>Countdown</h2>
            <h5>Hours  &nbsp;   Minutes  &nbsp;   Seconds</h5>
            <div className="increase-buttons">
              <button className="increase increase-hours" id="hours" onClick={(event) => this.handleIncrement(event)}>⬆️</button>
              <button className="increase increase-minutes" id="minutes" onClick={(event) => this.handleIncrement(event)}>⬆️</button>
              <button className="increase increase-seconds" id="seconds" onClick={(event) => this.handleIncrement(event)}>⬆️</button>
            </div>    
            <h3>{`${hours} : ${minutes} : ${seconds}`}</h3>    
            <div className="decrease-buttons">
              <button className="decrease decrease-hours" id="hours" onClick={(event) => this.handleDecrement(event)}>⬇️</button>
              <button className="decrease decrease-minutes" id="minutes" onClick={(event) => this.handleDecrement(event)}>⬇️</button>
              <button className="decrease decrease-seconds" id="seconds" onClick={(event) => this.handleDecrement(event)}>⬇️</button>
            </div> 
            {this.state.showStart ? (
          <input type="button" value="Start" onClick={() => this.onStart()} />
        ) : this.state.showStop ? (
          <input type="button" value="Stop" onClick={() => this.onStop()} />
        ) : (
          <div className="flex">
            <input
              type="button"
              value="Resume"
              onClick={() => this.onResume()}
            />
            <input type="button" value="Reset" onClick={() => this.onReset()} />
          </div>
        )}
            <span
              className="close center"
              id="countdown"
              onClick={this.props.handleClose}
            >
              x
            </span>
          </div>
        );
      }
}

export default Countdown;
