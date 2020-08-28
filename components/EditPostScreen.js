import React from 'react';
import { View, Button, TextInput, StyleSheet } from 'react-native';

const EditPostScreen = (props) => {
    return (
        <View>
            <Image
                style={styles.edit}
                source={require('../assets/edit.png')}
            />

            <Image
                style={styles.delete}
                source={require('../assets/delete.png')}
            />
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