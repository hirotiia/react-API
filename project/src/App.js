import React from 'react';
import './App.css';
// import { render } from 'react-dom';

const API_URL = 'https://opentdb.com/api.php?amount=10';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      data: null
    }
  }

  componentDidMount(){
    this.requestData();
  }

  
  async requestData(){
    this.setState({
      loading: true
    });

    let firstQuizData;
    try{
      const response = await window.fetch(API_URL);
      const data = await response.json();
      firstQuizData = data.results;
    }catch(error){
      firstQuizData = null;
    }

    this.setState({
      loading: false,
      data: firstQuizData
    });
  }
  render(){
    return(
      <div>
        <h1>Hello World!</h1>
        { this.renderRequestButton() }
        { this.renderData() }
      </div>
    );
  }
  
  renderData() {
    
      if(this.state.loading){
        return <p>データ取得中...</p>;
      }
      if(!this.state.loading &&  !this.state.data){
        return <p>データなし</p>;
      }
      const quizlists = this.state.data.map((quiz, index)=> {
        const quizNumber = index + 1;
      return <li key={quizNumber}>Q { quizNumber }:{ quiz.question }</li>
      });
    return <ul>{ quizlists }</ul>
 
  }
  
  renderRequestButton(){
    if(this.state.loading){
      return <button disabled>データ取得中...</button>;
    }
    return <button onClick={()=>{this.requestData()}}>データを取得する</button>;

  }
  
}
export default App;

