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
import { Service } from '../models/Service';
import {
  TherapistService,
  TherapistServiceProps,
} from './TherapistService.component';

interface ComponentProps {
  data: Service[];
}

export type TherapistServicesProps = ThemedComponentProps & ViewProps & ComponentProps;

type ListItemElement = React.ReactElement<TherapistServiceProps>;

class TherapistServicesComponent extends React.Component<TherapistServicesProps> {

  private renderListItemElement = (item: Service): ListItemElement => {
    return (
      <TherapistService
        style={this.props.themedStyle.item}
        icon={item}>
        {item}
      </TherapistService>
    );
  };

  private renderItem = (item: Service, index: number): ListItemElement => {
    const listItemElement: ListItemElement = this.renderListItemElement(item);

    return React.cloneElement(listItemElement, { key: index });
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

export const TherapistServices = withStyles(TherapistServicesComponent, (theme: ThemeType) => ({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    marginVertical: 2,
    marginRight: 8,
  },
}));