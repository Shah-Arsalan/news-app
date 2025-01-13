import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import SelectDropdown from "react-native-select-dropdown";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Hyperlink from "react-native-hyperlink";

import { addCategoryNews, filterCategories } from "./utils";
import { SOURCE_API } from "./constants";

export default function App() {
  const [data, setData] = useState();
  const [categories, setCatogries] = useState();
  const [categoryNews, setCategoryNews] = useState();
  const [id, setId] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const data = await axios.get(SOURCE_API);
      setData(data.data.sources);
      setCatogries(filterCategories(data.data.sources));
    };

    getData();

    console.log("hey");
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Pocket News App </Text>
      <SelectDropdown
        data={categories}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem);
          setCategoryNews(addCategoryNews(selectedItem));
        }}
        renderButton={(selectedItem, isOpened) => {
          return (
            <View style={styles.dropdownButtonStyle}>
              <Text style={styles.dropdownButtonTxtStyle}>
                {(selectedItem && selectedItem) || "Select categoty"}
              </Text>
              <Icon
                name={isOpened ? "chevron-up" : "chevron-down"}
                style={styles.dropdownButtonArrowStyle}
              />
            </View>
          );
        }}
        renderItem={(item, index, isSelected) => {
          return (
            <View
              style={{
                ...styles.dropdownItemStyle,
                ...(isSelected && { backgroundColor: "#D2D9DF" }),
              }}
            >
              <Text style={styles.dropdownItemTxtStyle}>{item}</Text>
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
        dropdownStyle={styles.dropdownMenuStyle}
      />

      {categoryNews &&
        categoryNews?.map((ele) => {
          return (
            <View key={ele.id} styles={styles.newsView}>
              <Pressable
                style={styles.categoryPressable}
                onPress={() => {
                  console.log("this is clicked");
                  if (id == null) {
                    setId(ele.id);
                  } else setId(null);
                }}
              >
                <Text Style={{ color: "red" }}>{ele.name}</Text>
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
        })}
      {/* <StatusBar style="auto" /> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    // alignItems: "flex-start",
    // justifyContent: "flex-start",
    paddingTop: 50,
    paddingHorizontal: 16,
  },

  heading: {
    fontSize: 20,
    alignSelf: "center",
  },

  newsView: {
    width: "100%",
    marginVertical: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    padding: 12,
  },

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

  dropdownButtonStyle: {
    width: 200,
    height: 50,
    backgroundColor: "#E9ECEF",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
  },

  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },

  dropdownButtonArrowStyle: {
    fontSize: 28,
  },

  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },

  dropdownMenuStyle: {
    backgroundColor: "#E9ECEF",
    borderRadius: 8,
  },

  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },

  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },

  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});
