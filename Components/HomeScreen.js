import React, { Component } from "react";
import {
  StyleSheet,
  Button,
  Text,
  View,
  ActivityIndicator,
  Image,
  FlatList,
  TouchableHighlight
} from "react-native";

import { fetchData, urlForRecent } from "../GetData";

const DetailScreen = require("./DetailScreen");

// Home
class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // Loading flag for indicator
      isLoading: false,
      page: 1,
      photos: []
    };
  }
  // Set title for HomeScreen
  static navigationOptions = {
    title: "Explore"
  };

  // Event handlers
  _onPressRow(selectedPhoto) {
    const photo = this.state.photos.filter(photo => photo === selectedPhoto)[0];
    this.props.navigation.navigate("DetailScreen", {
      title: photo.title,
      photo: photo
    });
  }

  componentDidMount() {
    const url = urlForRecent(this.state.page);
    this.setState({ isLoading: true });
    fetchData(url, photos => {
      console.log(photos);
      this.setState({
        isLoading: false,
        photos: photos
      });
    });
  }

  _loadMore = () => {
    this.setState({
      isLoading: true,
      page: this.state.page + 1
    });
    console.log(this.state.page);
    const url = urlForRecent(this.state.page);

    fetchData(url, photos => {
      console.log(photos);
      this.setState({
        isLoading: false,

        photos: [...this.state.photos, ...photos]
      });
    });
  };

  _renderItem = ({ item }) => (
    <TouchableHighlight
      underlayColor="transparent"
      onPress={() => this._onPressRow(item)}
    >
      <View style={styles.rowContainer}>
        <Image style={styles.image} source={{ uri: item.url_m }} />
      </View>
    </TouchableHighlight>
  );

  _keyExtractor = (item, index) => item.id;

  render() {
    const spinner = this.state.isLoading ? (
      <ActivityIndicator size="small" />
    ) : (
      <View />
    );
    return (
      <View style={styles.root}>
        <Text style={styles.imagesTitle}>Recent Photos</Text>
        <Text style={styles.message}>
          See what's happening in your community.
        </Text>
        <FlatList
          style={styles.imageList}
          data={this.state.photos}
          renderItem={this._renderItem.bind(this)}
          numColumns={3}
          keyExtractor={this._keyExtractor.bind(this)}
        />
        {spinner}

        {/* Set max page */}
        {this.state.page > 6 ? (
          <View />
        ) : (
          <TouchableHighlight
            style={styles.loadButton}
            onPress={this._loadMore.bind(this)}
            underlayColor="#007AFF"
          >
            <Text style={styles.buttonText}>Load More</Text>
          </TouchableHighlight>
        )}
      </View>
    );
  }
}

// Styles
const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center"
  },

  loadButton: {
    marginTop: 10,
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#ff1493",
    borderRadius: 15,
    height: 40,
    width: 100,
    marginBottom: 20
  },
  buttonText: {
    fontSize: 15,
    fontFamily: "helvetica",
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center"
  },

  imagesTitle: {
    marginTop: 30,
    fontSize: 20,
    fontFamily: "helvetica",
    fontWeight: "bold",
    paddingLeft: 10
  },
  message: {
    paddingTop: 10,
    fontSize: 15,
    fontFamily: "helvetica",
    color: "#4A4A4A",
    paddingLeft: 10,
    paddingBottom: 20
  },
  imageList: {
    marginBottom: 20
  },

  rowContainer: {
    backgroundColor: "transparent",
    paddingTop: 10,
    justifyContent: "space-between"
  },
  image: {
    flex: 1,
    height: 105,
    width: 105,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5
  }
});

module.exports = HomeScreen;
