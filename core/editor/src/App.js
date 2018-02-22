import React, {Component} from 'react';
import logo from './logo.svg';
import './css/App.css';

class App extends Component {
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo"/>
					<h1 className="App-title">HAIII TOMEK</h1>
				</header>
                
				<p className="App-intro">
					I AM GHOST OF CHRIMBO PAST
                    <br/>
                    <code>src/App.js</code>
					spoooky
				</p>
			</div>
		);
	}
}

export default App;
