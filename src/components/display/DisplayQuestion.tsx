import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {Component} from 'react';

import Questions from '../questions/Questions';

interface Iprops {
  navigation?:any
}

interface Istate {
  value: string;
  count: number;
  no: number;
  score: number;
  clicked: string;
  data: {};
  selected: string;
  selectedOptn:string;
  results: {}[];
  optionSelectC:number;
  optionSelectW:number
}

class DisplayQuestions extends Component<Iprops, Istate> {
  state = {
    value: '',
    count: 20,
    no: 0,
    score: 0,
    clicked: '',
    selected: 'None',
    selectedOptn:"",
    results: [],
    data: {},
    optionSelectC:0,
    optionSelectW:0
  };

  id: number = 0;

  componentDidMount() {
    this.id = setInterval(this.decrementHandler, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.id);
  }

  decrementHandler = () => {
    const {no,score, selectedOptn,selected,results} = this.state;
    if (this.state.count > 0) {
      if (this.state.no >= 10) {
        this.props.navigation.navigate('Results', {score, results});
      }
      if (this.state.no < 10) {
        this.setState({count: this.state.count - 1});
      }
    } else {
      if (this.state.no < 9) {
        this.setState({no: this.state.no + 1, count: 20});
        const qsn = Questions[this.state.no].question;
    let corans;
    for (let i in Questions[this.state.no].options) {
      if (
        Questions[this.state.no].options[i].id ==
        Questions[this.state.no].correctAnswer
      ) {
        corans = Questions[this.state.no].options[i];
      }
    }
    let arr = {no,qsn, corans,selectedOptn, selected};
    this.setState({results: [...results, arr]});
    this.setState({selected: 'None',selectedOptn:""});


      } else {
        this.props.navigation.navigate('Results', {score, results});
      }
    }
  };

  submitHandler = () => {
    const {score, no, results, selected,selectedOptn} = this.state;
    this.setState({no: this.state.no + 1, count: 20});
    this.setState({clicked: ''});
    const qsn = Questions[this.state.no].question;
    let corans;
    for (let i in Questions[this.state.no].options) {
      if (
        Questions[this.state.no].options[i].id ==
        Questions[this.state.no].correctAnswer
      ) {
        corans = Questions[this.state.no].options[i];
      }
    }
    let arr = {no,qsn, corans,selectedOptn, selected};
    this.setState({results: [...results, arr]});
    this.setState({selected: 'None',selectedOptn:"",optionSelectC:0});

    if (this.state.no >= 10) {
      this.props.navigation.navigate('Results', {score, results});
      return;
    }
  };

  manageItem = (item: {id: string,option:string}) => {
    const {score,optionSelectC} = this.state;
    this.setState({clicked: item.id});

     this.setState({selected:item.option,selectedOptn:item.id})

    if (Questions[this.state.no].correctAnswer == item.id) {
    this.setState({optionSelectC:optionSelectC+1})
        this.setState({score: score + 1});
      
     
    }
  };

  render() {
    const {no, clicked, score, results} = this.state;
    if (this.state.no >= 10) {
      this.props.navigation.navigate('Results', {score, results});
      return;
    }
    return (
      <View style={styles.main}>
        <Text style={styles.QtnNo}>Question number:{this.state.no + 1}/10</Text>
        <Text style={styles.timer}>{this.state.count}</Text>
        <Text style={styles.qtn}>{Questions[this.state.no].question}</Text>
        <View>
          {Questions[no].options.map(item => (
            <TouchableOpacity
              onPress={() => this.manageItem(item)}
              style={[
                styles.optn,
                clicked === item.id
                  ? {backgroundColor: 'hsla(12, 71%, 36%, 0.7)'}
                  : {},
              ]}
              key={item.id}>
              <Text style={styles.optnQn}>{item.id}</Text>
              <Text style={styles.optnQn}>{item.option}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={this.submitHandler}>
          <Text style={styles.btnTxt}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    display: 'flex',
    alignItems: 'center',
    rowGap: 10,
    backgroundColor: 'hsla(149, 9%, 57%, 0.7)',
    height: '100%',
    color: 'white',
  },

  QtnNo: {
    fontSize: 20,
    color: 'white',
  },

  timer: {
    fontSize: 30,
    borderWidth: 3,
    padding: 20,
    borderRadius: 100,
    color: 'white',
    borderColor: 'white',
  },

  qtn: {
    fontSize: 30,
    padding: 10,
    color: 'white',
  },

  optnQn: {
    fontSize: 25,
    color: 'white',
  },

  optn: {
    display: 'flex',
    flexDirection: 'row',
    gap: 30,
    borderWidth: 3,
    marginTop: 10,
    padding: 10,
    width: 'auto',
    borderRadius: 15,
    borderColor: 'white',
  },

  button: {
    width: '70%',
    height: 40,
    backgroundColor: 'black',
    color: 'white',
    borderRadius: 25,
    marginTop: 10,
  },


  
  btnTxt: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 4,
  },
});

export default DisplayQuestions;
