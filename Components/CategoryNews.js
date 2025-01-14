import { Pressable, StyleSheet, Text, View } from "react-native";
import Hyperlink from "react-native-hyperlink";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const CategoryNews = ({ ele, id, setId }) => {
  return (
    <View>
      <Pressable
        style={styles.categoryPressable}
        onPress={() => {
          if (id == null) {
            setId(ele.id);
          } else setId(null);
        }}
      >
        <Text>{ele.name}</Text>
        <Icon
          name={id == ele.id ? "chevron-up" : "chevron-down"}
          style={styles.dropdownButtonArrowStyle}
        />
      </Pressable>
      {id == ele.id && (
        <View>
          <Text>{ele.description}</Text>
          <Hyperlink
            linkStyle={styles.link}
            onPressIn={(e) => e.stopPropagation()}
          >
            <Text>{ele.url}</Text>
          </Hyperlink>
        </View>
      )}
    </View>
  );
};

export default CategoryNews;

const styles = StyleSheet.create({
  link: {
    color: "#007BFF",
    textDecorationLine: "underline",
    marginTop: 4,
  },

  categoryPressable: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    backgroundColor: "#F1F3F5",
    borderRadius: 8,
    marginBottom: 8,
    width: "100%",
  },

  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
});
