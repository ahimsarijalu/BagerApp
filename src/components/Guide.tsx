import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
import React from "react";
import { Image } from "expo-image";
import GuideContentItem from "./GuideContentItem";

const blurhash = "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const Guide = ({ image, title, content, index }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={image}
        placeholder={{ blurhash }}
        contentFit="cover"
        transition={1000}
      />
      <Text style={styles.title}>{title}</Text>
      <ScrollView style={styles.scrollView}>
        {content.map((guide, i) => (
          <GuideContentItem
            key={i}
            text={guide}
            index={index != null ? i + 1 : null}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default Guide;

const { width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    padding: 24,
    margin: 16,
    marginTop: 8,
    backgroundColor: "white",
    borderRadius: 20,
    width: width * 0.8, // Set width to 80% of the screen width for better centering
    alignSelf: 'center', // Centers the card
    height: 400, // Fixed height to constrain content
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    minHeight: 160,
  },
  title: {
    paddingVertical: 8,
    fontSize: 16,
    fontWeight: "600",
  },
  scrollView: {
    flex: 1,
    marginTop: 8,
  },
});
