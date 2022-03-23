import { Component } from 'react';
class Stopwatch extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      hours: 0,
      minutes: 0,
      seconds: 0,
      centiseconds: 0,
      showStart: true,
      showStop: false,
    };
    this.state = this.initialState;
    this.setHours = null;
    this.setMinutes = null;
    this.setSeconds = null;
    this.setCentiseconds = null;
  }
  componentWillUnmount() {
    this.clearIntervals();
}
  onStart = () => {
    this.setState({
      showStart: false,
      showStop: true,
    });
    this.setIntervals();
  };
  onStop = () => {
    this.clearIntervals();
    this.setState({
      showStop: false,
    });
  };
  onResume = () => {
    this.setIntervals();
    this.setState({
      showStop: true,
    });
  };
  onReset = () => {
    this.clearIntervals();
    this.setState(this.initialState);
  };
  clearIntervals = () => {
    clearInterval(this.setHours);
    clearInterval(this.setMinutes);
    clearInterval(this.setSeconds);
    clearInterval(this.setCentiseconds);
  };
  setIntervals = () => {
    this.setHours = this.interval('hours', 99, 60 * 60 * 1000);
    this.setMinutes = this.interval('minutes', 59, 60 * 1000);
    this.setSeconds = this.interval('seconds', 59, 1000);
    this.setCentiseconds = this.interval('centiseconds', 99, 10);
  };
  interval = (unit, maxValue, duration) => {
    return setInterval(() => {    
      this.setState((prevState) => {
        let unitValue = prevState[unit];
        unitValue = unitValue === maxValue ? 0 : unitValue + 1;
        return { [unit]: unitValue };
      });
    }, duration);
  };
  pad = (time) => {
    let { hours, minutes, seconds, centiseconds } = time;
    hours = String(hours).padStart(2, 0);
    minutes = String(minutes).padStart(2, 0);
    seconds = String(seconds).padStart(2, 0);
    centiseconds = String(centiseconds).padStart(2, 0);
    return { hours, minutes, seconds, centiseconds };
  };

  render() {
    let { hours, minutes, seconds, centiseconds } = this.pad(this.state);
    return (
      <div className="flex column card">
        <h2>Stopwatch</h2>
        <h3>{`${hours} : ${minutes} : ${seconds} : ${centiseconds}`}</h3>
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
          id="stopwatch"
          onClick={this.props.handleClose}
        >
          x
        </span>
      </div>
    );
  }
}

export default Stopwatch;
