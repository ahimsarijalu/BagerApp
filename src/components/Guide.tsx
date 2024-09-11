import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import GuideType from "@/types/GuideType";
import { Image } from "expo-image";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const Guide = ({ image, title, content, indicator }: GuideType) => {
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
      {content.map((c, i) => (
        <Text>
          <Text style={styles.indicator}>{indicator[i]}</Text>
          <Text key={i} style={styles.content}>
            {c}
          </Text>
        </Text>
      ))}
    </View>
  );
};

export default Guide;

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
    borderRadius: 16,
  },
  title: {
    paddingVertical: 8,
    fontSize: 16,
    fontWeight: "600",
  },
  indicator: {
    
  },
  content: {},
});
