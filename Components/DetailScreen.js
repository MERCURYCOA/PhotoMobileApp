import React, { Component } from "react";
import { StyleSheet, Image } from "react-native";

// DetailScreen

class DetailScreen extends Component {
  render() {
    const { navigation } = this.props;
    const photo = navigation.getParam("photo");

    return (
      <Image
        style={styles.root}
        source={{
          uri: photo.url_h ? photo.url_h : photo.url_m
        }}
      />
    );
  }
}

// styles
const styles = StyleSheet.create({
  root: { flex: 1, width: undefined, height: undefined }
});

module.exports = DetailScreen;
