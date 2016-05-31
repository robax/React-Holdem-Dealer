import React from 'react';
import ReactDOM from 'react-dom';

var suits = ["♠","♥","♦","♣"];	
var ranks = [2,3,4,5,6,7,8,9,"T","J","Q","K","A"];

function makeCards(){
	var cards = [];
    var makeCardsHelper = function(cards, num){
    	// base case
		if(num==0) return cards;
		// recursive case
		do  {
			var card = ranks[Math.floor(Math.random()*ranks.length)] + suits[Math.floor(Math.random()*suits.length)];
		} while(cards.indexOf(card) != -1)
		cards.push(card);
		return makeCardsHelper(cards, num-1);
	}
    // *~ magic number 7 wow ~*
	return makeCardsHelper(cards, 7);
}

class Card extends React.Component{
	isRed() {
    	return (this.props.card[1]==("♥")||this.props.card[1]==("♦"));
    }

  	render() {
  		// Display blank card
  		if(this.props.display == 0) return(<li className="blank">&nbsp;</li>);
  		// else display red or black card
   		return this.isRed() ? <li className="card"><div className="red">{this.props.card}</div></li> : <li className="card">{this.props.card}</li>;
  	}
}

class Dealer extends React.Component {
	
    constructor(props) {
    	super(props);
    	this.state = {
    		dealt: 0,
      		cards: makeCards()
    	};
    	this.handleUserInput = this.handleUserInput.bind(this);
    }

    handleUserInput() {
    	if(this.state.dealt==0) this.setState({	dealt: 2 });
    	else if(this.state.dealt==2) this.setState({ dealt: 5 });
    	else if(this.state.dealt==5) this.setState({ dealt: 6 });
    	else if(this.state.dealt==6) this.setState({ dealt: 7 });
     	else{
     		this.setState({
     			dealt: 0,
     			cards: makeCards()
     		})
     	}
    }

	render() {

  		var displays = [0,0,0,0,0,0,0];
  		for(var i=0;i<this.state.dealt;i++) displays[i]=1;

		return(
  			<div>
        		<h3>Community Cards:</h3>
				<ul>
					<Card display={displays[2]} card={this.state.cards[2]} />
					<Card display={displays[3]} card={this.state.cards[3]} />
 		        	<Card display={displays[4]} card={this.state.cards[4]} />
   					<Card display={displays[5]} card={this.state.cards[5]}/>
   		    			<Card display={displays[6]} card={this.state.cards[6]}/>
					</ul>
            		<h3>Your Hand:</h3>
        			<ul>
        				<Card display={displays[0]} card={this.state.cards[0]} />
						<Card display={displays[1]} card={this.state.cards[1]} />
       				</ul>
      				<DealButton onButtonClicked={this.handleUserInput} />
       			</div>
			);
	}
}

var DealButton = React.createClass({
	render: function() {
		return(
			<button type="button" className="clicky" onClick={this.props.onButtonClicked}>Deal!</button>
		);
	}
}); 

ReactDOM.render(
	<Dealer />,
	document.getElementById('container')
);