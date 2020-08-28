import React from 'react';
import { View, Button, TextInput, StyleSheet } from 'react-native';

const EditPostScreen = (props) => {
    return (
        <View>
            <TextInput>{props.post.title}</TextInput>

            <TextInput>{props.post.slug}</TextInput>

            <View>

                <Button title='Update' />

                <Button title='Cancel' />

            </View>

        </View>
    );
};

const styles = StyleSheet.create({

});

export default EditPostScreen;