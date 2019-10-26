import React from 'react';
import {
  ThemedComponentProps,
  ThemeType,
  withStyles,
  Button,
  ButtonProps,
} from 'react-native-ui-kitten';
import { textStyle } from '../../chat/components/textStyles';

interface ListDerivedProps {
  index?: number;
}

// @ts-ignore
interface ComponentProps extends ListDerivedProps, ButtonProps {
}

export type TherapistSpecialtyProps = ThemedComponentProps & ComponentProps;

class TherapistSpecialtyComponent extends React.Component<TherapistSpecialtyProps> {
  public render(): React.ReactNode {
    const { style, themedStyle, ...restProps } = this.props;

    return (
      <Button
        textStyle={themedStyle.text}
        appearance='outline'
        size='tiny'
        {...restProps}
        style={[themedStyle.container, style]}
      />
    );
  }
}

export const TherapistSpecialty = withStyles(TherapistSpecialtyComponent, (theme: ThemeType) => ({
  container: {
    borderWidth: 1,
    borderRadius: 15,
  },
  text: {
    fontSize: 11,
    ...textStyle.paragraph,
  },
}));
