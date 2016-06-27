/// <reference path="../../include/tsd.d.ts" />

import * as React from 'react';
import RN from 'react-native';

const styles: any = RN.StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default class Index extends React.Component<any, any> {
    public render(): JSX.Element {
        return (
            <RN.View style={styles.container}>
                <RN.Text>
                    (Typescript + React Native) Demo - Index
                </RN.Text>
            </RN.View>
        );
    }
}
