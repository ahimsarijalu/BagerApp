import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Image } from "expo-image";

import React from "react";
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
        contentFit="cover"
        transition={1000}
      />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default GuideCover;

const width = Dimensions.get("screen").width;
const styles = StyleSheet.create({
  container: {
    padding: 24,
    margin: 16,
    backgroundColor: "white",
    borderRadius: 20,
    minHeight: 400,
    width: width - 100,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
  },
  title: {
    paddingVertical: 8,
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 8
  },
  content: {},
});
