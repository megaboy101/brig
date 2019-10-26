import React from 'react';
import {
  Image,
  ImageProps,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
} from 'react-native';
import {
  ThemedComponentProps,
  ThemeType,
  withStyles,
  Icon,
} from 'react-native-ui-kitten';
import {
  TextIcon,
  TextIconProps,
} from './TextIcon.component';

// @ts-ignore (`icon` prop override)
interface ComponentProps extends TextIconProps {
  icon: string;
}

export type TherapistServiceProps = ThemedComponentProps & ComponentProps;

class TherapistServiceComponent extends React.Component<TherapistServiceProps> {

  private renderIconElement = (style: StyleProp<ImageStyle>): React.ReactElement<ImageProps> => {
    const { icon } = this.props;

    return (
      <Icon
        name="person"
      />
    );
  };

  public render(): React.ReactNode {
    const { style, themedStyle, iconStyle, textStyle, icon, ...restProps } = this.props;

    return (
      <TextIcon
        {...restProps}
        style={[themedStyle.container, style]}
        textStyle={[themedStyle.text, textStyle]}
        iconStyle={[themedStyle.icon, iconStyle]}
        icon={this.renderIconElement}
      />
    );
  }
}

export const TherapistService = withStyles(TherapistServiceComponent, (theme: ThemeType) => ({
  container: {},
  icon: {
    tintColor: theme['color-primary-default'],
  },
  text: {},
}));