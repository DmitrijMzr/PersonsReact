import React, { Component } from 'react';
import ComponentHead from './head';

class InputsHeader extends Component {

    state = {
        title: ''
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.title) {
            this.props.addItem(this.state.title);
            this.setState(() => ({title: ''}));
        }
    }

    filterDoneItem = () => {
        this.props.hideDoneItem(this.state.isChecked)
    }

    onChange = (e) => {
        if (e.target.name === 'title') {
            this.setState({[e.target.name]: e.target.value})
        }
        if (e.target.name === 'filter') {
            this.filterDoneItem()
        }
    }



    render() {
        return (
            <div className={'container-input'}>
                <ComponentHead />
                <form className='container-input__form'
                      onSubmit= {this.onSubmit}>
                    <input className='container-input__form-input'
                           type='text'
                           name="title"
                           value={this.state.title}
                           placeholder='add new todo ...'
                           onChange={this.onChange}/>
                    <button className='container-input__form-button'
                            type='submit'>
                        Add
                    </button>
                </form>
                <div className={'container-input__checkbox checkbox'}>
                    <label htmlFor="checked">Hide completed task</label>
                    <input id='checked'
                           name='filter'
                           type='checkbox'
                           onChange={this.onChange}/>
                </div>
            </div>

        );
    }
}

export default InputsHeader;