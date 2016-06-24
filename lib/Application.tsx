/// <reference path="../include/tsd.d.ts" />

import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export class Application extends React.Component<any, any> {
    public render() {
        return (
            <View style={styles.container}>
                <Text>
                    (Typescript + React Native) Demo
                </Text>
            </View>
        );
    }
}

export default Application;