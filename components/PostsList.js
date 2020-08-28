import React from 'react';
import { View, Text, TextInput } from 'react-native';

const PostsList = () => {
    return (
        <View>

        </View>
    );
};

function custom_sort(a, b) {
    return new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime();
}
var your_array = [
    { lastUpdated: "2010/01/01" },
    { lastUpdated: "2009/01/01" },
    { lastUpdated: "2010/07/01" }
];

your_array.sort(custom_sort);

export default PostsList;