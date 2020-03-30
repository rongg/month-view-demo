import React from 'react';
import logo from './logo.svg';
import MonthView from "react-month-view";
import './App.css';
import moment from "moment";

class App extends React.Component {
    state = {
        demo: 'text'
    };

    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        let input = e.currentTarget;

        this.setState({
            demo: input.value
        });
    }

    render() {
        const {demo} = this.state;
        const myRenderBasic = (day) => {
            return <div>
                {day.data[0] && <span>{day.data[0].text}</span>}<br/>
                {day.data[0] && <span>{moment(day.date).format('M/D/YY')}</span>}
            </div>;
        };


        const myRenderImage = (day) => {
            return <div>
                {day.data[0] && <img style={{height: '50px', width: '50px'}} src={require('./assets/' + day.data[0].url)}
                                  alt={'no image!'}/>}
            </div>;
        };

        const myRenderAnimate = (day) => {
            return <div>
                {day.data[0] && <img src={logo} className="App-logo" alt="logo"/>}
            </div>;
        };

        let dataText = [
            {date: moment().add(-5, 'day'), text: 'Your template here'},
            {date: moment(), text: 'Your template here'},
            {date: moment().add(4, 'day'), text: 'Your template here'},
        ];

        let dataImage = [
            {date: moment(), url: 'sample.jpeg'},
            {date: moment().add(4, 'day'), url: 'sample2.jpg'},
            {date: moment().add(-8, 'day'), url: 'sample3.jpg'},
            {date: moment().add(10, 'day'), url: 'sample.jpeg'},
            {date: moment().add(-3, 'day'), url: 'sample2.jpg'}
        ];

        let myRender, myData;

        switch (demo) {
            case 'image' :
                myRender = myRenderImage;
                myData = dataImage;
                break;
            case 'animate':
                myRender = myRenderAnimate;
                myData = dataImage;
                break;
            default:
                myRender = myRenderBasic;
                myData = dataText;
                break;
        }

        return (
            <div className="App">
                <header className="App-header">
                    Month View Demo
                </header>
                <section className={'controls'}>
                    <div className={'demo-picker'}>
                        <h3>Demo Type</h3>
                        <input type="radio" id="text" name="demo" value="text" onChange={this.handleChange}
                               checked={demo === 'text' && 'checked'}/>
                        <label htmlFor="text">Text</label><br/>
                        <input type="radio" id="image" name="demo" value="image" onChange={this.handleChange}
                               checked={demo === 'image' && 'checked'}/>
                        <label htmlFor="image">Image</label><br/>
                        <input type="radio" id="animate" name="demo" value="animate" onChange={this.handleChange}
                               checked={demo === 'animate' && 'checked'}/>
                        <label htmlFor="animate">Animate</label>
                    </div>
                </section>
                <section>
                    <MonthView data={myData} render={myRender}/>
                    {/*<MonthView month={moment()} data={[{date: moment()}]} />*/}
                </section>
                <section className={'controls'}>
                    <div className={'demo-data'}>
                        <h3>Data</h3>
                        <pre>{JSON.stringify(myData, null, 4)}</pre>
                    </div>
                </section>
            </div>
        )

    }
}

export default App;
