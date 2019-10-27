import React from 'react'
import { QuestionnaireProps } from '../containers/Questionnaire.component';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-ui-kitten';
import { Question } from '../models/Question';

interface QuestionSelectorProps {
  question: Question
  selectOption: (questionId: number, index: number, questionType: 'single' | 'multi') => void,
  index: number
}

export class QuestionSelector extends React.Component<QuestionSelectorProps> {
  render() {
    return (
      <View style={{ width: '100%' }}>
        <Text style={styles.header} category="s1">{this.props.question.question}</Text>
        <View
          style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          {
            this.props.question.options.map((option, index) => {
              return (
                <Button
                  key={index}
                  style={styles.button}
                  size="medium"
                  status={option.selected ? 'primary' : 'basic'}
                  onPress={() => this.props.selectOption(this.props.question.id, index, this.props.question.type)}
                >{option.text}</Button>
              )
            })
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 10,
    fontWeight: '500',
    fontSize: 15,
    textAlign: 'center'
  },
  button: {
    marginRight: 8,
    marginBottom: 8,
  },
});