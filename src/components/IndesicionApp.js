import React from 'react'

import AddOption from './AddOption';
import Header from './Header';
import Action from './Action';
import Options from './Options';
import OptionModal from  './OptionModal';


export default class IndecisionApp extends React.Component{ //PROPERTY INITIALIZERS | PLUGIN BABEL transform-class-properties
    state = {
        options: [],
        selectedOption: undefined
    }

    handleDeleteOptions = () => {
        this.setState(() => {
            return { 
                options:[]
            }
        })
    }
    handleDeleteOption = (optionToRemove) =>{
        this.setState((prevState) => ({ 
            options: prevState.options.filter((option)=>{
                return optionToRemove !== option;
            })
        }));
        
    }
    handlePick = () =>{
        const options = this.state.options;
        const index = Math.floor(Math.random() * options.length);
        // alert(options[index]);
        this.setState(() => ({ 
            selectedOption : options[index]
        }))
        
    }
    handleAddOption = (option) =>{
        if(!option){
            return 'Enter valid value to add item';
        }else if(this.state.options.indexOf(option) > -1){
            return 'This option already exists!'
        }
        this.setState((prevState) => {
             return {
                 options: prevState.options.concat(option)
               }
            })
        
    }
    closeModal = () => {
        this.setState(() => ({ 
            selectedOption : undefined
        }))
    }

    componentDidMount(){
        try{
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);
            if(options){
                this.setState(() => ({ options }));
            }
        }catch(e){

        }
        
        console.log('componentDidMount Lifecycle method')
        
        
    }
    componentDidUpdate(prevProps, prevState) {
        if(prevState.options.length !== this.state.options.length){
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
            console.log('componentDidUpdate Lifecycle method');
        }
    }
    componentWillUnmount() {
        console.log('componentWillUnmount Lifecycle method') 
    }
    render(){
        const subtitle = "Put your life in the hands of technology."
        return(
        <div>
            <Header subtitle={subtitle}/>
            <div className="container">
                <Action hasOptions = {this.state.options.length > 0}
                handlePick={this.handlePick}
                />
                <div className="widget">
                <Options options = {this.state.options} 
                handleDeleteOptions={this.handleDeleteOptions} 
                handleDeleteOption ={this.handleDeleteOption}
                />
                <AddOption handleAddOption={this.handleAddOption}/>
                </div>

            </div>
            <OptionModal 
                selectedOption={this.state.selectedOption}
                closeModal={this.closeModal}
                /> 
        </div>
        )
    }
}
// IndecisionApp.defaultProps = {
//     options:[]
// }


