import React from 'react';
import {
  View,
  ViewProps,
} from 'react-native';
import {
  withStyles,
  ThemeType,
  ThemedComponentProps,
} from 'react-native-ui-kitten';
import {
  TherapistSpecialty,
  TherapistSpecialtyProps,
} from './TherapistSpecialty.component';
import { Specialty } from '../models/Specialty';

interface ComponentProps {
  data: Specialty[];
}

export type TherapistSpecialtiesProps = ThemedComponentProps & ViewProps & ComponentProps;

type ListItemElement = React.ReactElement<TherapistSpecialtyProps>;

class TherapistSpecialtiesComponent extends React.Component<TherapistSpecialtiesProps> {

  private renderListItemElement = (item: Specialty): ListItemElement => {
    return (
      <TherapistSpecialty
        style={this.props.themedStyle.item}>
        {item}
      </TherapistSpecialty>
    );
  };

  private renderItem = (item: Specialty, index: number): ListItemElement => {
    const listItemElement: ListItemElement = this.renderListItemElement(item);

    return React.cloneElement(listItemElement, { index, key: index });
  };

  private renderComponentChildren = (): React.ReactNode => {
    return this.props.data.map(this.renderItem);
  };

  public render(): React.ReactNode {
    const { style, themedStyle, ...restProps } = this.props;
    const componentChildren: React.ReactNode = this.renderComponentChildren();

    return (
      <View
        {...restProps}
        style={[themedStyle.container, style]}>
        {componentChildren}
      </View>
    );
  }
}

export const TherapistSpecialties = withStyles(TherapistSpecialtiesComponent, (theme: ThemeType) => ({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    marginVertical: 2,
    marginRight: 8,
  },
}));
