import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Image } from "expo-image";
import GuideType from "@/types/GuideType";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const GuideCover = ({ image, title }: GuideType) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={image}
        placeholder={{ blurhash }}
        contentFit="contain"
        transition={1000}
      />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default GuideCover;

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    padding: 24,
    margin: 16,
    marginTop: 8,
    backgroundColor: "white",
    borderRadius: 20,
    width: width * 0.8, // Set width to 80% of the screen width for better centering
    alignSelf: 'center', // Centers the card
    // height: 400, // Fixed height to constrain content
    minHeight: 600
  },
  image: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    minHeight: 500,
  },
  title: {
    paddingVertical: 8,
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 8,
  },
});
