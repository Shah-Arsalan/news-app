import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import SelectDropdown from "react-native-select-dropdown";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Hyperlink from "react-native-hyperlink";

import { filterCategories } from "./utils";

import { useDispatch, useSelector } from "react-redux";
import { getCategoryNews, getSources } from "./Redux/newsSlice";
import Dropdown from "./Components/Dropdown";
import CategoryNews from "./Components/CategoryNews";

export default function App() {
  const dispatch = useDispatch();

  const [id, setId] = useState(null);
  const { sources, categoryNews, loading, error } = useSelector(
    (state) => state.news
  );

  const categories = filterCategories(sources);

  useEffect(() => {
    dispatch(getSources());
  }, [categoryNews]);

  return (
    <>
      {loading ? (
        <View style={styles.loadingView}>
          <Text style={{ fontSize: 30 }}>Loading...</Text>
        </View>
      ) : (
        <ScrollView style={styles.container}>
          <Text style={styles.heading}>Pocket News App </Text>
          <Dropdown categories={categories} />

          {categoryNews &&
            categoryNews?.map((element) => {
              return (
                <View key={element.id} styles={styles.newsView}>
                  <CategoryNews element={element} id={id} setId={setId} />
                </View>
              );
            })}
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    paddingTop: 50,
    paddingHorizontal: 16,
  },

  loadingView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
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

  heading: {
    fontSize: 20,
    alignSelf: "center",
  },
});
