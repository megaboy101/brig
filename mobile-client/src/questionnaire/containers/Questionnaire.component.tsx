import React from 'react'
import { ThemedComponentProps, Layout, TopNavigation, withStyles, ThemeType, List, ListItem, Button } from "react-native-ui-kitten";
import { QuestionSelector } from '../components/QuestionSelector.component';
import { Question } from '../models/Question';
import { View } from 'react-native';

interface ComponentProps {
}

export type QuestionnaireProps = ComponentProps & ThemedComponentProps

const mockQuestions: Question[] = [
  {
    id: 1,
    type: 'multi',
    question: 'Why are you seeking help?',
    options: [
      { text: 'Anxiety', selected: false },
      { text: 'Depression', selected: false },
      { text: 'LGBT+ related issues', selected: false },
      { text: 'Help for a friend', selected: false }
    ]
  },
  {
    id: 2,
    type: 'single',
    question: 'What is your gender?',
    options: [
      { text: 'Male', selected: false },
      { text: 'Female', selected: false },
      { text: 'Other', selected: false },
      { text: 'Prefer not to say', selected: false }
    ]
  },
  {
    id: 3,
    type: 'single',
    question: 'How old are you?',
    options: [
      { text: '<10', selected: false },
      { text: '10 - 12', selected: false },
      { text: '13 - 15', selected: false },
      { text: '16 - 18', selected: false },
      { text: '19 - 25', selected: false },
      { text: '26-35', selected: false },
      { text: '+35', selected: false },
    ]
  },
  {
    id: 4,
    type: 'single',
    question: 'Do you consider yourself to be religous?',
    options: [
      { text: 'Yes', selected: false },
      { text: 'No', selected: false },
    ]
  },
  {
    id: 5,
    type: 'single',
    question: 'Do you consider yourself to be spiritual?',
    options: [
      { text: 'Yes', selected: false },
      { text: 'No', selected: false },
    ]
  },
  {
    id: 6,
    type: 'single',
    question: 'Where do you most identify politically?',
    options: [
      { text: 'Conservative', selected: false },
      { text: 'Liberal', selected: false },
      { text: 'Moderate', selected: false },
    ]
  }
]

interface QuestionnaireState {
  questions: Question[]
}

class QuestionnaireComponent extends React.Component<QuestionnaireProps, QuestionnaireState> {

  state = {
    questions: mockQuestions
  }

  toggleSelectOption = (questionId: number, optionIndex: number, questionType: 'single' | 'multi') => {
    const questions = this.state.questions

    const question = questions[questions.findIndex(q => q.id === questionId)]
    question.options[optionIndex].selected = !question.options[optionIndex].selected

    if (questionType === 'single') {
      question.options = question.options.map((o, i) => i === optionIndex ? o : { ...o, selected: false })
    }

    this.setState({
      questions: questions
    })
  }

  submitPreferences = () => {
    
  }

  renderItem = ({ item, index }) => {
    if (index >= this.state.questions.length - 1) {
      return (
        <ListItem style={{ backgroundColor: '#FFFFFF' }} key={index}>
          <Button onPress={this.submitPreferences} style={{ width: '100%' }} size="medium">LET'S GET STARTED</Button>
        </ListItem>
      )
    }
    return (
      <ListItem style={{ backgroundColor: '#FFFFFF' }} key={index}>
        <QuestionSelector
          index={index}
          question={item}
          selectOption={this.toggleSelectOption}
        />
      </ListItem>
    )
  }

  render() {
    return (
      <Layout>
        <TopNavigation
          title="Tell us about Yourself..."
          alignment={'center'}
        />
        <List
          style={{ marginBottom: 60 }}
          data={this.state.questions}
          renderItem={this.renderItem}
        />
      </Layout>
    )
  }
}

export const Questionnaire = withStyles(QuestionnaireComponent, (theme: ThemeType) => ({}))