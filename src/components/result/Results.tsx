import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Component} from 'react';

interface Iprops {
  navigation?: any;
  route?: any;
}

export default class Results extends Component<Iprops> {
  backHandler = () => {
    this.props.navigation.navigate('Home');
  };

  render() {
    const arr = this.props.route.params.results;

    return (
      <ScrollView>
        <View style={styles.main}>
          <Text style={styles.result}>Your Score</Text>
          <View style={styles.outOf}>
            <Text style={styles.score}>{this.props.route.params.score}</Text>
            <Text style={styles.total}> / 10 </Text>
          </View>
          <View>
            {arr.map(
              (
                item: {
                  no: string;
                  qsn: string;
                  corans: {id: string; option: string};
                  selected: string;
                  id: string;
                  selectedOptn: string;
                },
                index: number,
              ) => (
                <View style={styles.answers} key={index}>
                  <View style={styles.qsnContainer}>
                    <Text style={styles.qsnNo}>{item.no + 1}.</Text>
                    <Text style={styles.qsn}>{item.qsn}</Text>
                  </View>
                  <View
                    style={[
                      styles.correctAnswer,
                      item.corans.option == item.selected
                        ? {borderColor: '#6d9773'}
                        : {borderColor: '#fe3a3a'},
                    ]}>
                    <Text style={styles.optnTxt}>You selected </Text>
                    <View style={styles.correctAnswer2}>
                    <Text
                      style={[
                        styles.optn,
                        item.corans.option == item.selected
                          ? {color: '#6d9773'}
                          : {color: '#afc3a8'},
                      ]}>
                      {item.selectedOptn}
                    </Text>
                    <Text
                      style={[
                        styles.optn,
                        item.corans.option == item.selected
                          ? {color: '#6d9773'}
                          : {color: '#afc3a8'},
                      ]}>
                      {item.selected}
                    </Text>
                    </View>
                  </View>

                  <View style={styles.correctAnswer}>
                    <Text style={styles.optnTxt}>Correct answer is:    </Text>
                    <View style={styles.correctAnswer2}>
                    <Text style={styles.optn}>{item.corans.id}.</Text>
                    <Text style={styles.optn}>{item.corans.option}</Text>
                    </View>
                  </View>
                  {item.corans.option == item.selected ? (
                    <Text style={styles.feedback}>Correct answer</Text>
                  ) : (
                    <Text style={styles.feedback2}>Wrong answer</Text>
                  )}
                </View>
              ),
            )}
          </View>
          <TouchableOpacity style={styles.button} onPress={this.backHandler}>
            <Text style={styles.text}> Go To Home Page</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#312c51',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },

  result: {
    fontSize: 40,
    color: '#f0c38e',
    fontWeight: 'bold',
  },

  score: {
    fontSize: 50,
    color: '#f1aa9b',
    fontWeight: 'bold',
  },

  button: {
    width: '70%',
    height: 50,
    // backgroundColor: '#ffdbcc',
    borderWidth: 2,
    borderColor: '#ffdbcc',
    borderRadius: 25,
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 10,
    color: '#fbd3ff',
  },
  outOf: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  total: {
    fontSize: 25,
    color: 'white',
    marginTop: 15,
  },

  qsnContainer: {
    display: 'flex',
    flexDirection: 'row',
  },

  qsnNo: {
    color: '#ffbb31',
    fontSize: 20,
  },

  answers: {
    padding: 25,
  },

  qsn: {
    color: '#f7d78c',
    fontSize: 20,
    marginBottom: 10,
  },
  correctAnswer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    borderWidth: 2,
    borderColor: '#f0c38e',
    height: 50,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 10,
    padding: 10,
    borderRadius: 14,
  },

  correctAnswer2:{
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    gap:10
  },

  optnTxt: {
    color: '#977b60',
    fontSize: 13,
  },
  optn: {
    color: '#afc3a8',
    fontSize: 15,
    fontWeight: 'bold',
  },
  feedback: {
    color: '#6d9773',
    textAlign: 'center',
    fontSize: 15,
  },
  feedback2: {
    color: '#fe3a3a',
    textAlign: 'center',
    fontSize: 15,
  },
});
