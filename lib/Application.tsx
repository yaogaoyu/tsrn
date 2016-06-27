/// <reference path="../include/tsd.d.ts" />

import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const styles: any = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default class Application extends React.Component<any, any> {
    public render(): JSX.Element {
        return (
            <View style={styles.container}>
                <Text>
                    (Typescript + React Native) Demo
                </Text>
            </View>
        );
    }
}
